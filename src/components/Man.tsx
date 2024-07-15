import { bolt, landslide, rocket, safety } from "../icon.mts";
import type { Result } from "./Commands";

function About() {
    return (
        <section id="about" class="pt-2 flex flex-col gap-2 text-justify">
            <h1 class="text-solar-blue-300 font-bold w-fit"># Hello</h1>
            <h2 class="text-solar-blue-300 font-bold w-fit">## My Name is Chason Li.</h2>
            <p>I'm a computer engineer at [unemployed] comfortable with both front-end & back-end development as well as embedded development to some degree.</p>
            <p>I'm passionate about building CLI based applications and developer tooling, and optimizing program performance in different levels. Making QOL extensions and plugins for applications and games I used and played in a daily biased is also my primary interest. This goes the same with tinkering embedded hardware & ICs.</p>
            <p>My works have a strong emphasis on <i>simplicity</i> and <i>performance</i>. I’m deeply care about implementation detail of my work to ensure they are <a href="https://www.computerenhance.com/p/table-of-contents" target="_blank" class="text-solar-yellow-500 hover:text-solar-yellow-300 font-bold animate-ease-in-out">blazingly fast {bolt}</a> and <a href="https://suckless.org/philosophy/" target="_blank" class="text-solar-blue-500 hover:text-solar-blue-300 font-bold animate-ease-in-out"><span class="text-2xl">{rocket}</span> suckless</a>.</p>
            <p>I’m currently based in Canada. If you happen to speak Chinese, my Chinese name is 李承轩 (lǐ chéng xuān).</p>
            <p>You can message me via my <a id="social-anchor" class="bg-solar-base-3 text-solar-base-03 px-2 hover:bg-solar-green-700 font-bold animate-ease-in-out">Social</a>.</p>
        </section>
    )
}

function Aritlce() {
    return (
        <section id="article" class="flex flex-col gap-2 text-justify hide">
            <p class="sm:text-xl">I haven't written any article yet {`\udb83\udd12`}... </p>
        </section>
    )
}

function Experience() {
    return (
        <section id="experience" class="flex flex-col gap-2">
            <h2 class="text-solar-blue-300 font-bold w-fit">## Experience</h2>
            <ul class="flex gap-4">
                <li>University of Alberta - Bachelor of Science In Computer Engineering</li>
            </ul>
        </section>
    )
}

function Project() {
    return (
        <section id="project" class="flex flex-col gap-2">
            <h2 class="text-solar-blue-300 font-bold w-fit">## Project</h2>
            <p>This section is still under construction <span class="text-solar-yellow-300 text-xl">{safety} {landslide}</span> ...</p>
        </section>
    )
}

function Social() {
    return (
        <section id="social" class="flex flex-col gap-2">
            <h2 class="text-solar-blue-300 font-bold w-fit">## Social</h2>
            <ul class="flex flex-col gap-4 content-center sm:text-xl text-solar-cyna-500">
                <li class="underline underline-offset-2 hover:text-solar-cyna-300 animate-ease-in-out"><a class="text-center" href="https://discord.com/invite/un4hz3uZ" target="_blank"><span>{`\uf1ff`}</span> <span>Discord</span></a></li>
                <li class="underline underline-offset-2 hover:text-solar-cyna-300 animate-ease-in-out"><span>{`\udb80\uddee`}</span> <span>Email - dekr0.dk@protonmail.com</span></li>
                <li class="underline underline-offset-2 hover:text-solar-cyna-300 animate-ease-in-out"><a class="text-center" href="https://github.com/Dekr0" target="_blank"><span>{`\ue708`}</span> <span>GitHub</span></a></li>
                <li class="underline underline-offset-2 hover:text-solar-cyna-300 animate-ease-in-out"><a class="text-center" href="linkedin.com/in/chengxuan-li" target="_blank"><span>{`\udb80\udf3b`}</span> <span>LinkedIn</span></a></li>
                <li class="underline underline-offset-2 hover:text-solar-cyna-300 animate-ease-in-out"><a class="text-center" href="https://twitter.com/notDeKr0" target="_blank"><span>{`\uf35e`}</span> <span>X</span></a></li>
            </ul>
        </section>
    );
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
        case "article": {
            return {
                c: Aritlce(),
                e: ""
            }
        }
        case "experience": {
            return {
                c: Experience(),
                e: ""
            }
        }
        case "project": {
            return {
                c: Project(),
                e: ""
            }
        }
        case "social": {
            return {
                c: Social(),
                e: ""
            }
        }
        default:
            return NoMan(cmd);
    }
}
