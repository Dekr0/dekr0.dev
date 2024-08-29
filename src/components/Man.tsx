import { bolt, landslide, rocket, safety } from "../icon.mts";
import type { Result } from "./Commands";

function About() {
    return (
        <section id="about" class="pt-2 flex flex-col gap-2 text-justify">
            <h1 class="text-solar-blue-300 font-bold w-fit"># Hello</h1>
            <h2 class="text-solar-blue-300 font-bold w-fit">
                ## My Name is Chason Li.
            </h2>
            <p>
            I'm a computer engineer at [unemployed] comfortable with back-end 
            development as well as embedded development to some degree.
            </p>
            <p>
            Currently I'm primarily focus on low level and system programming, 
            program performance and optimization, computer architectures, 
            and low level game development. These are the areas I'm currently 
            heavily invested in my spare time.
            </p>
            <p>
            I'm passionate about building CLI / TUI applications and tooling 
            that improves workflow and automation, or provides an alternative 
            UI for those who prefer using their terminal over existing GUI 
            applications. I'm enjoy spending time and effort on optimizing 
            program performance in different levels. This goes the same with 
            tinkering embedded hardware & ICs.
            </p>
            <p>
                My works have a strong emphasis on <i>simplicity</i> and{" "}
                <i>performance</i>. I’m deeply care about implementation detail
                of my work to ensure they are{" "}
                <a
                    href="https://www.computerenhance.com/p/table-of-contents"
                    target="_blank"
                    class="text-solar-yellow-500 hover:text-solar-yellow-300 font-bold animate-ease-in-out"
                >
                    blazingly fast {bolt}
                </a>{" "}
                and{" "}
                <a
                    href="https://suckless.org/philosophy/"
                    target="_blank"
                    class="text-solar-blue-500 hover:text-solar-blue-300 font-bold animate-ease-in-out"
                >
                    <span class="text-2xl">{rocket}</span> suckless
                </a>
                .
            </p>
            <p>
                I’m currently based in Canada. If you happen to speak Chinese,
                my Chinese name is 李承轩 (lǐ chéng xuān).
            </p>
            <p>
                You can message me via my{" "}
                <a
                    id="social-anchor"
                    class="bg-solar-base-3 text-solar-base-03 px-2 hover:bg-solar-green-700 font-bold animate-ease-in-out"
                >
                    Social
                </a>
                .
            </p>
        </section>
    );
}

function Aritlce() {
    return (
        <section id="article" class="flex flex-col gap-2 text-justify hide">
            <p>
                I haven't written any article yet... :(
            </p>
        </section>
    );
}

function Experience() {
    return (
        <section id="experience" class="flex flex-col gap-2">
            <h1 class="text-solar-blue-300 font-bold w-fit"># Experience</h1>
            <h2 class="text-solar-blue-300 font-bold w-fit">## Education</h2>
            <ul class="flex gap-4">
                <li>
                     University of Alberta - Bachelor of Science In Computer 
                    Engineering
                </li>
            </ul>
            <h2 class="text-solar-blue-300 font-bold w-fit">## Employment</h2>
            <ul class="flex flex-col gap-4 text-justify">
                <li>
                    <p class="mb-4">
                         Aurora Technology Development - Technical Intern
                    </p>
                    <ul class="flex flex-col gap-4">
                        <li>
                            <p class="ml-8">
                                 Developed and released quality of life
                                enhancements and hot fixes on both frontend and 
                                backend systems, resulting in a more user 
                                friendly website UI, and an improvement on 
                                backend systems’ error handling capabilities 
                                for two active projects.
                            </p>
                        </li>
                        <li>
                            <p class="ml-8">
                                 Developed and implemented an image upload and 
                                conversion service that allowed customers to 
                                upload various design files for clothing printing, 
                                enhancing user experience and workflow efficiency.
                            </p>
                        </li>
                        <li>
                            <p class="ml-8">
                                 Refactored and standardized UI components 
                                within frontend codebase, resulting in improved 
                                code maintainability and enhanced user interface 
                                consistency.
                            </p>
                        </li>
                    </ul>
                </li>
            </ul>
        </section>
    );
}

function Project() {
    return (
        <section id="project" class="flex flex-col gap-2">
            <h1 class="text-solar-blue-300 font-bold w-fit"># Project</h1>
            <h2 class="text-solar-blue-300 font-bold w-fit">## Open Source</h2>
            <h3 class="font-bold w-fit">
                <a 
                    class="underline underline-offset-2 text-solar-cyna-500 hover:text-solar-cyna-300 animate-ease-in-out"
                    href="https://github.com/Dekr0/RPC.nvim"
                    target="_blank"
                >
                    ### RPC.nvim
                </a>                
            </h3>
            <p class="text-justify">
                RPC.nvim is a Neovim plugin that integrates Discord Rich
                Presence, displaying live status (keystroke per minute, 
                editor mode, current workspace, etc) update from Neovim 
                and directly to users' Discord profiles.
            </p>
            <h3 class="font-bold w-fit">
                <a
                    class="underline underline-offset-2 text-solar-cyna-500 hover:text-solar-cyna-300 animate-ease-in-out"
                    href="https://github.com/Dekr0/8086-sim"
                    target="_blank"
                >
                    ### 8086 Emulator
                </a>
            </h3>
            <p class="text-justify">
                8086 simulator is a set of tools for 8086 instructions 
                set that capable of dissembling binary assembly code, 
                simulating instructions execution, and outputting 
                dissemble result and simulation result. An TUI 
                visualizer similar to GDB is provided to display the 
                internal state of the virtual 8086 CPU and the 1 MB 
                virtual memory.
            </p>
            <h2 class="text-solar-blue-300 font-bold w-fit">
                ## "Reinvent The Wheel"
            </h2>
            <h3 class="font-bold w-fit">
                <a
                    class="underline underline-offset-2 text-solar-cyna-500 hover:text-solar-cyna-300 animate-ease-in-out"
                    href="https://github.com/Dekr0/c-http"
                    target="_blank"
                >
                    ### HTTP Server
                </a>
            </h3>
            <p class="text-justify">
                a HTTP server written in C, capable of parsing HTTP message 
                efficiently, perform simple dynamic endpoint routing, and 
                handling multiple concurrent client connections.
            </p>
            <h3 class="font-bold w-fit">
                <a
                    class="underline underline-offset-2 text-solar-cyna-500 hover:text-solar-cyna-300 animate-ease-in-out"
                    href="https://github.com/Dekr0/redis-clone"
                    target="_blank"
                >
                    ### Redis Clone
                </a>
            </h3>
             <p class="text-justify">
                 a working in progress Redis Clone written in C, mirroring 
                 essential Redis functionalities.
             </p>
        </section>
    );
}

function Social() {
    return (
        <section id="social" class="flex flex-col gap-2">
            <h2 class="text-solar-blue-300 font-bold w-fit">## Social</h2>
            <ul class="flex flex-col gap-4 content-center sm:text-xl text-solar-cyna-500">
                <li class="underline underline-offset-2 hover:text-solar-cyna-300 animate-ease-in-out">
                    <a
                        class="text-center"
                        href="https://discord.com/invite/un4hz3uZ"
                        target="_blank"
                    >
                        <span>{`\uf1ff`}</span> <span>Discord</span>
                    </a>
                </li>
                <li class="underline underline-offset-2 hover:text-solar-cyna-300 animate-ease-in-out">
                    <span>{`\udb80\uddee`}</span>{" "}
                    <span>Email - dekr0.dk@protonmail.com</span>
                </li>
                <li class="underline underline-offset-2 hover:text-solar-cyna-300 animate-ease-in-out">
                    <a
                        class="text-center"
                        href="https://github.com/Dekr0"
                        target="_blank"
                    >
                        <span>{`\ue708`}</span> <span>GitHub</span>
                    </a>
                </li>
                <li class="underline underline-offset-2 hover:text-solar-cyna-300 animate-ease-in-out">
                    <a
                        class="text-center"
                        href="linkedin.com/in/chengxuan-li"
                        target="_blank"
                    >
                        <span>{`\udb80\udf3b`}</span> <span>LinkedIn</span>
                    </a>
                </li>
                <li class="underline underline-offset-2 hover:text-solar-cyna-300 animate-ease-in-out">
                    <a
                        class="text-center"
                        href="https://twitter.com/notDeKr0"
                        target="_blank"
                    >
                        <span>{`\uf35e`}</span> <span>X</span>
                    </a>
                </li>
            </ul>
        </section>
    );
}

function NoMan(cmd: string) {
    return {
        c: <p>No manual entry {cmd}</p>,
        e: "16",
    };
}

export default function Man(cmd: string, args?: string[]): Result {
    switch (cmd) {
        case "about": {
            return {
                c: About(),
                e: "",
            };
        }
        case "article": {
            return {
                c: Aritlce(),
                e: "",
            };
        }
        case "experience": {
            return {
                c: Experience(),
                e: "",
            };
        }
        case "project": {
            return {
                c: Project(),
                e: "",
            };
        }
        case "social": {
            return {
                c: Social(),
                e: "",
            };
        }
        default:
            return NoMan(cmd);
    }
}
