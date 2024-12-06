import type { JSXElement } from "solid-js";
import Man from "./Man";
import quotes from "../quote.mts";
import { factory } from "../icon.mts";

export type Result = {
    c: JSXElement;
    e: string;
};

export function About(): Result {
    return Man("about");
}

export function Article(): Result {
    return Man("article");
}

export function CoreDumpCtl(): Result {
    return {
        c: (
            <section id="bugs">
                <p>Here are some known bugs in the system.</p>
                <p class="text-justify">
                    Avoid using "Control" and "Tab" at the same time when
                    trigger command suggestions. If input is not responding,
                    press "Control", "Alt", or other similar keys to resolve it
                </p>
            </section>
        ),
        e: "",
    };
}

export function Echo(buffer: string): Result {
    return {
        c: <p>{buffer}</p>,
        e: "",
    };
}

export function Experience(): Result {
    return Man("experience");
}

export function Help(): Result {
    return {
        c: (
            <section id="help">
                <p>
                    Commonly used shell's shortcut are emulated and available to
                    use.
                </p>
                <p>Here are a list of commands commonly used in the system.</p>
                <p>(alias to `man about`) about - About me</p>
                <p>(alias to `man article`) article - My article</p>
                <p>(alias to `man experience`) experience - My experience</p>
                <p>(alias to `man project`) project - My project</p>
                <p>(alias to `man social`) social - My social</p>
                <p>clear - Clear the terminal screen</p>
                <p>static - Switch static version of this portfolio site</p>
                <p>coredumptctl - Show a lists of bugs in the system</p>
                <p>echo - Display a line of text</p>
                {/* <p>perf - Show performance metric in the system</p> */}
                <p>man - An interface to system reference manual</p>
                {/* <p>quote - Quote generator</p> */}
                <p>
                    Press Tab with an empty prompt to see all possible commands
                </p>
            </section>
        ),
        e: "",
    };
}

export function NotFound(cmd: string): Result {
    return {
        c: (
            <p class="text-solar-base-1 text-sm sm:text-base lg:text-lg font-mono">
                command not found:
                <span class="text-solar-yellow-500 font-mono">{cmd}</span>
            </p>
        ),
        e: "NOTFOUND",
    };
}

export function Project(): Result {
    return Man("project");
}

export function Perf(args?: string): Result {
    return UnderConstruction("");
}

export function Quote(): Result {
    return {
        c: <p class="italic text-solar-green-500">"{quotes()}"</p>,
        e: "",
    };
}

export function Social(): Result {
    return Man("social");
}

export function Welcome() {
    return (
        <section id="welcome">
            <p>
                type <span class="text-solar-blue-500">'help'</span> for a list
                of commands.
            </p>
        </section>
    );
}

function UnderConstruction(cmd: string): Result {
    return {
        c: (
            <p class="text-solar-base-1 lg:text-lg font-mono">
                <span class="text-solar-yellow-500">'{cmd}'</span> is still
                under construction{" "}
                <span class="text-solar-yellow-500 text-3xl">{factory}</span>.
            </p>
        ),
        e: "",
    };
}

const commands: string[] = [
    "about",
    "article",
    "clear",
    "coredumpctl",
    "echo",
    "experience",
    //    "free"       ,
    "help",
    "man",
    //    "perf"       ,
    "project",
    //    "quote"      ,
    "social",
];

export default commands;
