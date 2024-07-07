import commands from "../commands.mts";
import $ from "../query.mts";
import ModRingBuffer from "../queue.mts";

if (!("content" in document.createElement("template"))) {
    // Error handling
}
const main = $.q(document, "main");
const promptTemplate = $.id(document, "prompt-template") as HTMLTemplateElement;

const clear = new Event("clear");
const enter = new Event("enter");
const caretchange = new Event("caret");

const history: string[] = [];
const commandsK = Array.from(commands.keys());

const modRingBuffer = new ModRingBuffer();

function isSymbol(charCode: number) {
    return charCode >= 32 && charCode <= 126;
}

function render(runtime: number = 0) {
    main.appendChild(promptTemplate.content.cloneNode(true));

    const prompt = $.id(document, "prompt");
    const runtimeLabel = $.id(document, "runtime");
    runtimeLabel.innerHTML = `${runtime} ms`;
    const caret = $.id(document, "caret");
    const stdin = $.id(document, "stdin") as HTMLInputElement;
    const stdout = $.id(document, "stdout");

    let start: number;
    let stdinBuffer = "";
    let historyIndex = history.length;
    const caretPos = new Proxy({ caret: 0 }, {
        set: (target, prop, newValue, _) => {
            if (prop !== "caret" || typeof newValue !== "number") return false;
            target.caret = newValue;
            stdout.dispatchEvent(caretchange);
            return true;
        }
    });


    /** Main */
    function onClear(e: Event) {
        if (!e.target) {
            throw new Error(`${e.type} event fired with a null target`);
        }
        main.innerHTML = "";
        main.appendChild(prompt);
        stdin.focus();
    }
    function focus(e: Event) {
        if (!e.target) {
            throw new Error(`${e.type} event fired with a null target`);
        }
        stdin.focus();
    }
    main.addEventListener(clear.type, onClear);
    main.addEventListener("mouseup", focus);
    main.addEventListener("touchend", focus);


    /** stdin Element */
    modRingBuffer.flush();

    function onKeyDown(e: KeyboardEvent) {
        if (!e.target) {
            throw new Error(`${e.type} event fired with a null target`);
        }

        if (ModRingBuffer.isMod(e.key)) return modRingBuffer.push(e.key);

        const t = e.target as HTMLInputElement;

        if (!modRingBuffer.isEmpty()) {
            const prefix = modRingBuffer.toArray();
            const shortcut = [...prefix, e.key].join("-");
            switch (shortcut) {
                case "Control-l": {
                    e.preventDefault();
                    main.dispatchEvent(clear);
                    return;
                }
                case "Meta-p": {
                    e.preventDefault();
                    if (historyIndex <= 0) break;

                    historyIndex -= 1;
                    stdinBuffer = history[historyIndex];
                    caretPos.caret = stdinBuffer.length;

                    t.value = stdinBuffer;
                    t.selectionEnd = caretPos.caret;
                    break;
                }
                case "Meta-n": {
                    e.preventDefault();
                    if (historyIndex >= history.length - 1) break;

                    historyIndex += 1;
                    stdinBuffer = history[historyIndex];

                    caretPos.caret = stdinBuffer.length;
                    t.value = stdinBuffer;
                    t.selectionEnd = caretPos.caret;
                    break;
                }
                default: {
                    const shiftUpper = shortcut.startsWith("Shift") &&
                        e.key.length === 1 &&
                        isSymbol(e.key.charCodeAt(0));

                    if (shiftUpper) break;

                    e.preventDefault();
                    break;
                }
            }
        }
        switch (e.key) {
            case "ArrowLeft": {
                if (caretPos.caret <= 0) break;
                caretPos.caret -= 1;
                break;
            }
            case "ArrowRight": {
                if (caretPos.caret >= stdinBuffer.length) break;
                caretPos.caret += 1;
                break;
            }
            case "ArrowUp": {
                e.preventDefault();
                if (historyIndex <= 0) break;

                historyIndex -= 1;
                stdinBuffer = history[historyIndex];
                caretPos.caret = stdinBuffer.length;

                t.value = stdinBuffer;
                t.selectionEnd = caretPos.caret;
                break;
            }
            case "ArrowDown": {
                e.preventDefault();
                if (historyIndex >= history.length - 1) break;

                historyIndex += 1;
                stdinBuffer = history[historyIndex];

                caretPos.caret = stdinBuffer.length;
                t.value = stdinBuffer;
                t.selectionEnd = caretPos.caret;
                break;
            }
            case "Enter": {
                e.preventDefault();
                start = Date.now();
                return main.dispatchEvent(enter);
            }
            case "Tab": {
                e.preventDefault();
                const search = stdinBuffer;
                const results = commandsK
                    .filter((command) => command.startsWith(search));
                if (results.length === 0) break;

                if (results.length === 1) {
                    stdinBuffer = results[0];
                    caretPos.caret = stdinBuffer.length;
                    t.value = stdinBuffer;
                    t.selectionEnd = caretPos.caret;
                } else {

                }
                break;
            }
            default: {
                break;
            }
        }
    }
    function onInput(e: Event) {
        if (!e.target) {
            throw new Error(`${e.type} event fired with a null target`);
        }
        const t = e.target as HTMLInputElement;
        stdinBuffer = t.value;
        caretPos.caret = t.selectionEnd || 0;
    }
    function onKeyUp(e: KeyboardEvent) {
        if (modRingBuffer.isEmpty()) return;
        if (!ModRingBuffer.isMod(e.key)) return;
        modRingBuffer.flush();
    }
    stdin.addEventListener("keydown", onKeyDown);
    stdin.addEventListener("input", onInput);
    stdin.addEventListener("keyup", onKeyUp);


    /** stdout Element */
    function onCaret(e: Event) {
        if (!e.target) {
            throw new Error(`${e.type} event fired with a null target`);
        }
        const t = e.target as HTMLSpanElement;
        t.innerHTML = "";
        caret.innerText = stdinBuffer[caretPos.caret] || " ";
        t.appendChild(caret);
        t.insertAdjacentText("afterbegin", stdinBuffer.slice(0, caretPos.caret));
        t.insertAdjacentText("beforeend", stdinBuffer.slice(caretPos.caret + 1));
    }
    stdout.addEventListener(caretchange.type, onCaret);


    /** Clean up */
    main.addEventListener(enter.type, (e: Event) => {
        if (!e.target) {
            throw new Error(`${e.type} event fired with a null target`);
        }

        if (commands.has(stdinBuffer)) {

        }

        const [cmd, ...args] = stdinBuffer.split(" ");

        if (!commands.has(cmd)) {
            console.error(`command not found: ${cmd}`);
        } else {
            console.log(commands.get(cmd)?.call(args));
        }
        
        stdinBuffer.length > 0 && history.push(stdinBuffer);
        historyIndex = history.length;

        e.target.removeEventListener(clear.type, onClear);
        e.target.removeEventListener("mouseup", focus);
        e.target.removeEventListener("touchend", focus);

        (prompt as HTMLDivElement).id = "";

        runtimeLabel.id = "";
        
        stdin.id = "";
        stdin.value = "";
        stdin.disabled = true;
        stdin.blur();
        stdin.removeEventListener("keydown", onKeyDown);
        stdin.removeEventListener("input", onInput);
        stdin.removeEventListener("keydown", onKeyDown);

        stdout.id = "";
        stdout.innerHTML = stdout.innerText;
        stdout.removeEventListener(caretchange.type, onCaret);
        render(Date.now() - start);
    }, { once: true });

    stdin.focus();
}

render();
