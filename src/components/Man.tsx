import type { Result } from "./Commands";

function About() {
    return (
        <section id="about" class="flex flex-col gap-4 lg:text-lg font-mono">
            <h1 class="bg-markdown-h-1 text-solar-base-3 pt-1 font-bold font-mono w-fit">Hello</h1>
            <h2 class="text-markdown-h-2 font-bold font-mono w-fit">## My Name is Chason Li.</h2>
            <p class="text-solar-base-1">I'm a computer engineer comfortable with both front-end & back-end development as well as embedded development to some degree.</p>
            <p class="text-solar-base-1">I'm passionate about building CLI based applications and developer tooling. Making QOL extensions and plugins for applications and games I used and played in a daily biased is also my primary interest. This goes the same with tinkering embedded hardware & ICs.</p>
            <p class="text-solar-base-1">My works have a strong emphasis on <i>simplicity</i> and <i>performance</i>. I’m deeply care about implementation detail of my work to ensure they are <a href="https://www.computerenhance.com/p/table-of-contents" target="_blank" class="text-[#F7CD43] font-bold font-mono">blazingly fast</a> and <a href="https://suckless.org/philosophy/" target="_blank" class="text-[#1177AA] font-bold font-mono"> suckless</a>.</p>
            <p></p>
        </section>
    )
}

function NoMan(cmd: string) {
    return {
        c: <p class="text-solar-base-1">No manual entry {cmd}</p>,
        e: "16"
    }
}

export default function Man(cmd: string, args?: string[]): Result {
    switch (cmd) {
        case "about": {
            return {
                c: About(),
                e: ""
            }
        }
        default:
            return NoMan(cmd);
    }
}
