import { commands } from "../commands.mts";
import $ from "../query.mts";
import RingBuffer from "../queue.mts";

if (!("content" in document.createElement("template"))) {
    // Error handling
}
const main = $.q(document, "main");
const promptTemplate = $.id(document, "prompt-template") as HTMLTemplateElement;

const clear = new Event("clear");
const enter = new Event("enter");
const caretchange = new Event("caret");

const history: string[] = [];

const mods = ["Alt", "Control", "Meta", "Shift"];
const modKeyBuffer = new RingBuffer(mods.length);

function isSymbol(charCode: number) {
    return charCode >= 32 && charCode <= 126;
}

function render() {
    main.appendChild(promptTemplate.content.cloneNode(true));

    const prompt = $.id(document, "prompt");
    const caret = $.id(document, "caret");
    const stdin = $.id(document, "stdin") as HTMLInputElement;
    const stdout = $.id(document, "stdout");
    
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
    modKeyBuffer.flush();

    function onKeyDown(e: KeyboardEvent) {
        if (!e.target) {
            throw new Error(`${e.type} event fired with a null target`);
        }

        if (mods.includes(e.key)) return modKeyBuffer.push(e.key);

        const t = e.target as HTMLInputElement;

        if (!modKeyBuffer.isEmpty()) {
            const prefix = modKeyBuffer.flush();
            const shortcut = [...prefix, e.key].join("-");
            switch (shortcut) {
                case "Control-l": {
                    e.preventDefault();
                    main.dispatchEvent(clear);
                    return;
                }
                default: {
                    if (shortcut.startsWith("Shift") && 
                        e.key.length === 1 && 
                        isSymbol(e.key.charCodeAt(0))) break;
                    e.preventDefault();
                    return;
                }
            }
        }
        switch (e.key) {
            case "ArrowLeft": {
                if (caretPos.caret > 0) {
                    caretPos.caret -= 1;
                }
                break;
            }
            case "ArrowRight": {
                if (caretPos.caret < cmd.length) {
                    caretPos.caret += 1;
                }
                break;
            }
            case "ArrowUp": {
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex -= 1;
                    cmd = history[historyIndex].split("");
                    caretPos.caret = cmd.length;
                    t.value = cmd.join("");
                    t.selectionEnd = caretPos.caret;
                }
                break;
            }
            case "ArrowDown": {
                e.preventDefault();
                if (historyIndex < history.length - 1) {
                    historyIndex += 1;
                    cmd = history[historyIndex].split("");
                    caretPos.caret = cmd.length;
                    t.value = cmd.join("");
                    t.selectionEnd = caretPos.caret;
                }
                break;
            }
            case "Enter": {
                main.dispatchEvent(enter);
                break;
            }
            case "Tab": {
                e.preventDefault();
                const search = cmd.join("");
                const results = commands
                    .filter((command) => command.startsWith(search));
                if (results.length === 0) break;

                if (results.length === 1) {
                    cmd = results[0].split("");
                    caretPos.caret = cmd.length;
                    t.value = cmd.join("");
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
        console.log("Fire");
        const t = e.target as HTMLInputElement;
        cmd = t.value.split("");
        caretPos.caret = t.selectionEnd!;
    }
    stdin.addEventListener("keydown", onKeyDown);
    stdin.addEventListener("input", onInput);


    /** stdin Buffer */
    let cmd = new Array<string>();
    let historyIndex = history.length;
    const caretPos = new Proxy({ caret: 0 }, {
        set: (target, prop, newValue, _) => {
            if (prop !== "caret" || typeof newValue !== "number") return false;
            target.caret = newValue;
            stdout.dispatchEvent(caretchange);
            return true;
        }
    });


    /** stdout Element */
    function onCaret(e: Event) {
        if (!e.target) {
            throw new Error(`${e.type} event fired with a null target`);
        }
        const t = e.target as HTMLSpanElement;
        t.innerHTML = "";
        caret.innerText = cmd[caretPos.caret] || " ";
        t.appendChild(caret);
        t.insertAdjacentText("afterbegin", cmd.slice(0, caretPos.caret).join(""));
        t.insertAdjacentText("beforeend", cmd.slice(caretPos.caret + 1).join(""));
    }
    stdout.addEventListener(caretchange.type, onCaret);


    /** Clean up */
    main.addEventListener(enter.type, (e: Event) => {
        if (!e.target) {
            throw new Error(`${e.type} event fired with a null target`);
        }

        history.push(stdout.innerText.trim());
        historyIndex = history.length;

        e.target.removeEventListener(clear.type, onClear);
        e.target.removeEventListener("mouseup", focus);
        e.target.removeEventListener("touchend", focus);

        (prompt as HTMLDivElement).id = "";
        
        stdin.id = "";
        stdin.value = "";
        stdin.disabled = true;
        stdin.blur();
        stdin.removeEventListener("keydown", onKeyDown);
        stdin.removeEventListener("input", onInput);

        stdout.id = "";
        stdout.innerHTML = stdout.innerText;
        stdout.removeEventListener(caretchange.type, onCaret);
        render();
    }, { once: true });

    stdin.focus();
}

render();
