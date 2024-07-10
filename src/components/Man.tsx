import type { Result } from "./Commands";

function About() {
    return (
        <div id="about" class="pt-2 flex flex-col gap-4 text-justify">
            <h1 class="text-solar-blue-300 font-bold w-fit"># Hello</h1>
            <h2 class="text-solar-blue-300 font-bold w-fit">## My Name is Chason Li.</h2>
            <p>I'm a computer engineer at [unemployed] comfortable with both front-end & back-end development as well as embedded development to some degree.</p>
            <p>I'm passionate about building CLI based applications and developer tooling, and optimizing program performance in different levels. Making QOL extensions and plugins for applications and games I used and played in a daily biased is also my primary interest. This goes the same with tinkering embedded hardware & ICs.</p>
            <p>My works have a strong emphasis on <i>simplicity</i> and <i>performance</i>. I’m deeply care about implementation detail of my work to ensure they are <a href="https://www.computerenhance.com/p/table-of-contents" target="_blank" class="text-solar-yellow-300 font-bold">blazingly fast</a> and <a href="https://suckless.org/philosophy/" target="_blank" class="text-solar-blue-500 font-bold">suckless</a>.</p>
            <p>I’m currently based in Canada. If you happen to speak Chinese, my Chinese name is 李承轩 (lǐ chéng xuān)..</p>
            <p>You can message me via my <a class="bg-solar-base-3 text-solar-base-03 px-2 hover:bg-solar-green-700" href="#social">Social</a>.</p>
        </div>
    )
}

function NoMan(cmd: string) {
    return {
        c: <p>No manual entry {cmd}</p>,
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
