import {
    batch,
    createMemo,
    createSignal,
    For,
    Show,
    type JSXElement,
} from "solid-js";
import { createStore } from "solid-js/store";

import ModRingBuffer from "../queue.mts";

import HistoryPrompt from "./HistoryPrompt";
import commands, {
    About,
    Echo,
    NotFound,
    Help,
    Quote,
    Welcome,
    Experience,
    Project,
    CoreDumpCtl,
    Article,
    Social,
} from "./Commands";
import { bolt, pulse, warning } from "../icon.mts";
import Man from "./Man";

const debug = (...msg: any[]) => import.meta.env.DEV && console.log(...msg);

export default function Terminal() {
    debug("Render Terminal");

    let stdin: HTMLInputElement;

    const modRingBuffer = new ModRingBuffer(); // Escape Hatch
    const [buffer, setBuffer] = createSignal("");
    const [error, setError] = createSignal("");
    const [caret, setCaret] = createSignal(0);
    const [suggest, setSuggest] = createSignal<string[]>([]);
    const [showSuggest, setShowSuggest] = createSignal(true);
    const [caretBuffer, setCaretBuffer] = createSignal(" ");
    const [historyOut, setHistoryOut] = createSignal<JSXElement[]>([
        Welcome(),
        Quote().c,
    ]); // Escape Hatch?
    const [history, setHistory] = createStore({
        i: 0,
        history: new Array<string>(),
    });
    const [shortcut, setShortCut] = createSignal("", { equals: false });
    const [runtime, setRuntime] = createSignal(0);

    /** Create effect are primary for read */
    /** Use createMemo instead */

    createMemo(() => {
        debug("Update caret buffer");
        setCaretBuffer(buffer().at(caret()) || " ");
    });

    // Escape Hatch / Breaking Solid Rule?
    createMemo(() => {
        debug(`Update shortcut ${shortcut()}`);
        switch (shortcut()) {
            case "Control,l":
                setHistoryOut([]);
                break;
            default:
                break;
        }
    });

    createMemo(() => {
        // debug("Update buffer due to history lookup");
        if (history.history.length === 0) return;

        if (history.i < 0 || history.i >= history.history.length) return;

        const lookup = history.history.at(history.i);
        if (!lookup) return;

        // Escape hatch
        stdin.value = lookup;
        stdin.selectionEnd = stdin.value.length;

        setBuffer(lookup);
        setCaret(lookup.length);
    });

    createMemo(() => {
        suggest().length <= 1 || setShowSuggest(false);
    });

    // Escape Hatch / Breaking Solid Rule?
    function onEnter(start: number) {
        const [cmd] = buffer().split(" ", 1);
        let result: JSXElement;
        let nextError = error();
        debug(cmd);
        if (cmd) {
            switch (cmd) {
                case "about": {
                    const { c, e } = About();
                    result = c;
                    nextError = e;
                    break;
                }
                case "article": {
                    const { c, e } = Article();
                    result = c;
                    nextError = e;
                    break;
                }
                case "coredumpctl": {
                    const { c, e } = CoreDumpCtl();
                    result = c;
                    nextError = e;
                    break;
                }
                case "clear": {
                    nextError = "";
                    break;
                }
                case "echo": {
                    const { c, e } = Echo(buffer().slice(cmd.length + 1));
                    result = c;
                    nextError = e;
                    break;
                }
                case "experience": {
                    const { c, e } = Experience();
                    result = c;
                    nextError = e;
                    break;
                }
                case "help": {
                    const { c, e } = Help();
                    result = c;
                    nextError = e;
                    break;
                }
                case "project": {
                    const { c, e } = Project();
                    result = c;
                    nextError = e;
                    break;
                }
                case "static": {
                    window.location.href = "/";
                    break;
                }
                case "social": {
                    const { c, e } = Social();
                    result = c;
                    nextError = e;
                    break;
                }
                case "man": {
                    const { c, e } = Man(buffer().slice(cmd.length + 1));
                    result = c;
                    nextError = e;
                    break;
                }
                default: {
                    const { c, e } = NotFound(cmd);
                    result = c;
                    nextError = e;
                    break;
                }
            }
        }
        // Hold on, what am I doing here?
        batch(() => {
            if (cmd === "clear") {
                setHistoryOut([]);
            } else if (cmd) {
                setHistoryOut([
                    ...historyOut(),
                    HistoryPrompt(buffer(), runtime().toPrecision(), error()),
                    result,
                ]);
            } else {
                setHistoryOut([
                    ...historyOut(),
                    HistoryPrompt(buffer(), runtime().toPrecision(), error()),
                ]);
            }
            setError(nextError);

            cmd &&
                setHistory("history", (currentHistory) => {
                    const index = currentHistory.indexOf(buffer());
                    if (index > -1) {
                        return [
                            ...currentHistory.slice(0, index),
                            ...currentHistory.slice(index + 1),
                            buffer(),
                        ];
                    } else {
                        return [...currentHistory, buffer()];
                    }
                });
            setHistory("i", (_) => history.history.length);

            setBuffer("");
            setCaret(0);
            setSuggest([]);
            setRuntime((Date.now() - start) / 1000);
        });
    }

    // Breaking Solid Rule
    function onKeyDown(ev: KeyboardEvent) {
        const start = Date.now();
        if (!ev.target) {
            throw new Error(`${ev.type} event fired with a null target`);
        }
        const t = ev.target as HTMLInputElement;

        debug(`Key down: ${ev.key}`);

        if (ModRingBuffer.isMod(ev.key)) {
            ev.preventDefault();
            modRingBuffer.push(ev.key);
            return;
        }

        if (suggest().length > 1 && !showSuggest()) {
            if (ev.key === "Tab" || ev.key === "y") {
                ev.preventDefault();
                return setShowSuggest(true);
            }
            setSuggest([]);
        }

        if (!modRingBuffer.isEmpty()) {
            const shortcut = [modRingBuffer.toArray(), ev.key].join();
            const upper =
                shortcut.startsWith("Shift") &&
                ev.key.length === 1 &&
                ev.key.charCodeAt(0) >= 32 &&
                ev.key.charCodeAt(0) <= 126;
            if (upper || ModRingBuffer.isBrowser(shortcut)) return;

            ev.preventDefault();

            return setShortCut(shortcut);
        }

        switch (ev.key) {
            case "ArrowLeft": {
                caret() > 0 && setCaret(caret() - 1);
                break;
            }
            case "ArrowRight": {
                caret() < buffer().length && setCaret(caret() + 1);
                break;
            }
            case "ArrowUp": {
                ev.preventDefault();
                setHistory("i", (ci) => {
                    return ci > 0 ? ci - 1 : 0;
                });
                break;
            }
            case "ArrowDown": {
                ev.preventDefault();
                setHistory("i", (ci) => {
                    debug("Look forward", ci);
                    return ci < history.history.length ? ci + 1 : ci;
                });
                break;
            }
            case "Tab": {
                ev.preventDefault();
                const matches = commands.filter((command) => {
                    return command.startsWith(buffer());
                });
                if (matches.length === 1) {
                    // Escape hatch, sync back to input element
                    t.value = matches[0];
                    t.selectionEnd = t.value.length;
                    setBuffer(t.value);
                    setCaret(t.value.length);
                } else {
                    setSuggest(matches);
                }
                break;
            }
            case "Enter": {
                ev.preventDefault();
                t.value = ""; // Escape Hatch, Sync back to DOM
                t.selectionEnd = 0;
                onEnter(start);
                break;
            }
            default:
                break;
        }
    }

    function onInput(ev: Event) {
        if (!ev.target) {
            throw new Error(`${ev.type} event fired with a null target`);
        }
        const t = ev.target as HTMLInputElement;
        setBuffer(t.value);
        setCaret(t.selectionEnd || 0);
    }

    function onKeyUp(ev: KeyboardEvent) {
        if (!ev.target) {
            throw new Error(`${ev.type} event fired with a null target`);
        }
        if (modRingBuffer.isEmpty()) return;
        if (!ModRingBuffer.isMod(ev.key)) return;

        debug(`Key up ${ev.key}`);

        modRingBuffer.flush();
    }

    function onMouseUp(ev: MouseEvent) {
        if (!ev.target) {
            throw new Error(`${ev.type} event fired with a null target`);
        }
        stdin.focus();
    }

    function onTouchEnd(ev: Event) {
        if (!ev.target) {
            throw new Error(`${ev.type} event fired with a null target`);
        }
        stdin.focus();
    }

    return (
        <main
            onMouseUp={onMouseUp}
            onTouchEnd={onTouchEnd}
            class="flex flex-col gap-2 w-5/6 sm:w-9/12 md:w-8/12 lg:w-7/12 xl:w-6/12 2xl:w-5/12 mx-auto mb-4 py-4 h-screen text-solar-base-1 text-sm xs:text-base font-mono selection:bg-solar-base-1 selection:text-solar-base-04"
        >
            <section
                id="history-prompt"
                class="flex flex-col gap-2 overflow-hidden"
            >
                {historyOut().map((e, i) => {
                    return (
                        <div
                            tabindex="0"
                            class="flex gap-4 md:gap-8 lg:gap-10 pl-2 items-center hover:border-solar-orange-500 hover:border-l-2"
                        >
                            <span class="text-solar-yellow-700 text-center self-start">
                                {i}
                            </span>
                            {e}
                        </div>
                    );
                })}
            </section>
            <section id="prompt">
                <form
                    onSubmit={(ev) => ev.preventDefault()}
                    class="flex flex-wrap gap-2 items-center"
                >
                    <label
                        for="stdin"
                        id="prompt-status"
                        class="flex gap-2 basis-full items-center"
                    >
                        <span class="text-solar-yellow-300">{bolt}</span>
                        <span class="text-solar-green-700 px-3">
                            {runtime()} s
                        </span>
                        <Show when={error()}>
                            <span class="text-solar-red-300 text-2xl">
                                {warning}
                            </span>
                            <span class="text-solar-red-300 pl-1.5">
                                {error()}
                            </span>
                        </Show>
                    </label>
                    <label for="stdin" id="prompt-cursor">
                        <span class="text-solar-yellow-500 text-2xl">
                            {pulse}
                        </span>
                    </label>
                    <input
                        id="stdin"
                        ref={(el) => {
                            stdin = el;
                        }}
                        autofocus
                        autocomplete="off"
                        onKeyDown={onKeyDown}
                        onInput={onInput}
                        onKeyUp={onKeyUp}
                        class="absolute right-full bg-solar-base-04 focus:outline-none pb-2"
                    />
                    <label for="stdin" id="prompt-caret">
                        <span class="whitespace-pre">
                            {buffer().slice(0, caret())}
                            <span class="text-solar-base-04 bg-solar-base-3 animate-pulse">
                                {caretBuffer()}
                            </span>
                            {buffer().slice(caret() + 1)}
                        </span>
                    </label>
                </form>
            </section>
            <section id="command-suggestion">
                <Show when={suggest().length > 1 && !showSuggest()}>
                    <div>
                        Show all {suggest().length} possibilities? (Hit Tab or
                        "y" to continue)
                    </div>
                </Show>
                <Show when={suggest().length > 1 && showSuggest()}>
                    <div class="grid grid-cols-2 lg:grid-cols-3">
                        <For each={suggest()}>
                            {(command) => <span>{command}</span>}
                        </For>
                    </div>
                </Show>
            </section>
        </main>
    );
}
