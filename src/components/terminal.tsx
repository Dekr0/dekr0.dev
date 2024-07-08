import { batch, createMemo, createSignal, type JSXElement } from "solid-js";
import ModRingBuffer from "../queue.mts";
import quotes from "../scripts/quote.mts";
import { createStore } from "solid-js/store";


function Echo(buffer: string) {
    return <p class="text-solar-base-1 lg:text-lg font-mono">{buffer}</p>
}

function HistoryPrompt(buffer: string, runtime: string, error: string) {
    return (
        <div class="flex flex-wrap gap-2 items-center lg:text-lg">
            <div class="basis-full gap-2 items-center">
                <i class="text-[#0f8493] nf-fa-bolt pt-0.5"></i>
                <span class="text-[#4d8206] pl-[18px] pr-[22px] font-mono pt-1">{runtime} s</span>
                {error && <i class="text-[#d11141] nf-fa-warning"></i>}
                {error && <span class="text-[#d11141] px-3 font-mono pt-1">{error}</span>}
            </div>
            <i class="text-solar-yellow-500 nf-fae-pulse"></i>
            <span class="whitespace-pre text-solar-base-1 font-mono">{buffer}</span>
        </div>
    );
}

function NotFound(cmd: string) {
    return <p class="text-solar-base-1 text-sm sm:text-base lg:text-lg font-mono">
                command not found: 
                <span class="text-solar-yellow-500 font-mono">{cmd}</span>
            </p>
}

function Quote() {
    return <p class="italic text-solar-base-1 text-sm sm:text-base lg:text-lg">"{quotes()}"</p>
}

function Welcome() {
    return <p class="text-solar-base-1 lg:text-lg font-mono">type 'help' for a list of commands</p>
}

export default function Terminal() {
    console.log("Render Terminal");

    let stdin: HTMLInputElement;

    const modRingBuffer = new ModRingBuffer(); // Escape Hatch
    const [buffer, setBuffer] = createSignal("");
    const [error, setError] = createSignal("");
    const [caret, setCaret] = createSignal(0);
    const [caretBuffer, setCaretBuffer] = createSignal(" ");
    const [historyOut, setHistoryOut] = createSignal<JSXElement[]>([Welcome(), Quote()]); // Escape Hatch?
    const [history, setHistory] = createStore({
        i: 0,
        history: new Array<string>()
    });
    const [shortcut, setShortCut] = createSignal("", { equals: false });
    const [runtime, setRuntime] = createSignal(0);

    /** Create effect are primary for read */
    /** Use createMemo instead */

    createMemo(() => {
        console.log("Update caret buffer");
        setCaretBuffer(buffer().at(caret()) || " ");
    });

    // Escape Hatch / Breaking Solid Rule?
    createMemo(() => {
        console.log("Update shortcut");
        switch (shortcut()) {
            case "Control,l":
                setHistoryOut([]);
                break;
            default:
                break;
        }
    });

    createMemo(() => {
        console.log("Update buffer due to history lookup");
        if (history.history.length === 0) return;

        if (history.i < 0 || history.i >= history.history.length) return;

        const lookup = history.history.at(history.i);
        if (!lookup) return;

        // Escape hatch
        stdin.value = lookup; 
        stdin.selectionEnd = stdin.value.length;

        setBuffer(lookup);
        setCaret(lookup.length);
    })

    // Escape Hatch / Breaking Solid Rule?
    function onEnter(start: number) {
        const [cmd, ...args] = buffer().split(" ");
        let result: JSXElement;
        let nextError = error();
        if (cmd) {
            switch (cmd) {
                case "echo": {
                    result = Echo(args.join(" "));
                    nextError = "";
                    break;
                }
                default: {
                    result = NotFound(cmd);
                    nextError = "NOTFOUND";
                    break;
                }
            }
        }
        // Hold on, what am I doing here?
        batch(() => {
            setHistoryOut([
                ...historyOut(),
                HistoryPrompt(buffer(), (runtime()).toPrecision(), error()),
                result
            ]);
            setError(nextError);

            cmd && setHistory("history", (currentHistory) => {
                const index = currentHistory.indexOf(buffer());
                if (index > -1) {
                    return [
                        ...currentHistory.slice(0, index),
                        ...currentHistory.slice(index + 1),
                        buffer(),
                    ]
                } else {
                    return [
                        ...currentHistory,
                        buffer()
                    ];
                }
            });
            setHistory("i", (_) => history.history.length);

            setBuffer("");
            setCaret(0);
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
        if (ModRingBuffer.isMod(ev.key)) {
            ev.preventDefault();
            modRingBuffer.push(ev.key);
            return;
        }
        if (!modRingBuffer.isEmpty()) {
            const shortcut = [modRingBuffer.toArray(), ev.key].join();
            const upper = shortcut.startsWith("Shift") &&
                ev.key.length === 1 &&
                ev.key.charCodeAt(0) >= 32 && ev.key.charCodeAt(0) <= 126;
            if (upper || ModRingBuffer.isBrowser(shortcut)) return;

            ev.preventDefault();

            setShortCut(shortcut);
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
                    console.log("Lookup", ci);
                    return ci > 0 ? ci - 1 : 0;
                });
                break;
            }
            case "ArrowDown": {
                ev.preventDefault();
                setHistory("i", (ci) => {
                    console.log("Look forward", ci);
                    return ci < history.history.length ? ci + 1 : ci;
                })
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
        const t = ev.target as HTMLInputElement;
        if (modRingBuffer.isEmpty()) return;
        if (!ModRingBuffer.isMod(ev.key)) return;
        modRingBuffer.flush();
    }
    
    function onMouseUp(ev: MouseEvent) {
        if (!ev.target) {
            throw new Error(`${ev.type} event fired with a null target`);
        }
        const t = ev.target as HTMLElement;
        stdin.focus();
    }

    return (
        <main 
         onMouseUp={onMouseUp}
         class="flex flex-col gap-2 w-5/6 mx-auto py-4 h-screen selection:bg-solar-base-1 selection:text-solar-base-04">
            {historyOut()}
            <div class="flex flex-wrap gap-2 items-center lg:text-lg">
                <div class="flex gap-2 basis-full items-center">
                    <i class="text-[#0f8493] nf-fa-bolt pt-0.5"></i>
                    <span class="text-[#4d8206] px-3 font-mono pt-1">{runtime()} s</span>
                    {error() && <i class="text-[#d11141] nf-fa-warning"></i>}
                    {error() && <span class="text-[#d11141] font-mono pt-1 pl-1.5">{error()}</span>}
                </div>
                <i class="text-[#b89a17] nf-fae-pulse"></i>
                <input ref={(el) => { stdin = el }} autofocus autocomplete="off"
                 onKeyDown={onKeyDown}
                 onInput={onInput}
                 onKeyUp={onKeyUp}
                 class="absolute right-full bg-solar-base-04 text-solar-base-1 focus:outline-none pb-2" />
                 <span class="whitespace-pre text-solar-base-1 font-mono">
                    {buffer().slice(0, caret())}
                    <span 
                     class="whitespace-pre text-solar-base-04 bg-solar-base-3 animate-pulse font-mono">
                     {caretBuffer()}
                     </span>
                     {buffer().slice(caret() + 1)}
                </span>
            </div>
        </main>
    );
}
