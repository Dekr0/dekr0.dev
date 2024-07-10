import type { JSXElement } from "solid-js";
import Man from "./Man";
import quotes from "../quote.mts";
import { factory } from "../icon.mts";


export type Result = {
    c: JSXElement
    e: string
}

export function About(): Result {
    return Man("about");
}

export function Cd(args?: string): Result {
    return UnderConstruction("cd");
}

export function Echo(buffer: string): Result {
    return {
        c: <p>{buffer}</p>,
        e: ""
    }
}

export function CoreDumpCtl(): Result {
    return {
        c: (
        <section id="bugs" class="flex flex-col">
            <p>Avoid using "Control" and "Tab" at the same time when trigger command suggestions. If input is not responding, press "Control", "Alt", or other similar keys to resolve it</p> 
        </section>
        ),
        e: ""
    };
}

export function Free(args?: string): Result {
    return UnderConstruction("free");
}

export function Ls(args?: string): Result {
    return UnderConstruction("ls");
}

export function NeoFetch(args?: string) {
    return UnderConstruction("neofetch");
}

export function NotFound(cmd: string): Result {
    return {
        c: <p class="text-solar-base-1 text-sm sm:text-base lg:text-lg font-mono">
                command not found: 
                <span class="text-solar-yellow-500 font-mono">{cmd}</span>
            </p>,
        e: "NOTFOUND"
    };
}

export function Quote(): Result {
    return {
        c: <p class="italic text-solar-base-1 text-sm sm:text-base lg:text-lg">
               "{quotes()}"
           </p>,
        e: ""
    };
}

export function Welcome() {
    return (
        <section id="welcome">
            <p>type 'help' for a list of commands.</p>
            <p>type 'coredumpctl' for a list of keyboard conflicts caused by Browser default shortcut.</p>
        </section>
    )
}

function UnderConstruction(cmd: string): Result {
    return {
        c: <p class="text-solar-base-1 lg:text-lg font-mono">
               <span class="text-solar-yellow-500">'{cmd}'</span> is still under construction <span class="text-solar-yellow-500 text-3xl">{factory}</span>.
           </p>,
        e: ""
    };
}

const commands: string[] = [
    "about"      ,
    "cd"         ,
    "coredumpctl",
    "echo"       ,
    "free"       ,
    "ls"         ,
    "neofetch"   ,
    "man"        ,
    "quote"   
];

export default commands;
