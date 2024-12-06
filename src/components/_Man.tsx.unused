import { bolt, landslide, rocket, safety } from "../icon.mts";
import { socials } from "src/social.mts";
import { open_source, reinvent_wheel } from "src/projects.mts";
import { learning, working } from "src/status.mts";

import Anchor from "./Anchor";
import Social from "./Social";
import Project from "./Project";

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

            <p>I'm currently learning:</p>
            {learning.map((e, i, a) =>
                <p class="ml-8">
                     {i == a.length - 1 ? "and" : ""} {e.url ? <Anchor name={e.name} url={e.url}/> : e.name}
                    {i == a.length - 1 ? "." : ","}
                </p>
            )}

            <p>I'm currently working on:</p>
            {working.map((e, i, a) =>
                <p class="ml-8">
                     {i == a.length - 1 ? "and" : ""} {e.url ? <Anchor name={e.name} url={e.url}/> : e.name}
                    {i == a.length - 1 ? "." : ","}
                </p>
            )}

            <p>I’m currently based in Canada</p>
            <p>
                You can message me via my {" "}
                <a id="social-anchor" class="bg-solar-base-3 text-solar-base-03 px-2 hover:bg-solar-green-700 font-bold animate-ease-in-out">
                    Social
                </a>.
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

function Projects() {
    return (
        <section id="project" class="flex flex-col gap-2">
            <h1 class="text-solar-blue-300 font-bold w-fit"># Project</h1>
            <h2 class="text-solar-blue-300 font-bold w-fit">## Open Source</h2>
            {open_source.map((o) => <Project name={o.name} p={o.p} url={o.url}/>)}
            <h2 class="text-solar-blue-300 font-bold w-fit">## "Reinvent The Wheel"</h2>
            {reinvent_wheel.map((o) => <Project name={o.name} p={o.p} url={o.url}/>)}
        </section>
    );
}

function Socials() {
    return (
        <section id="social" class="flex flex-col gap-2">
            <h2 class="text-solar-blue-300 font-bold w-fit">## Social</h2>
            <ul class="flex flex-col gap-4 content-center sm:text-xl text-solar-cyna-500">
                {socials.map((s) => <Social icon={s.icon} text={s.text} url={s.url}/>)}
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
                c: Projects(),
                e: "",
            };
        }
        case "social": {
            return {
                c: Socials(),
                e: "",
            };
        }
        default:
            return NoMan(cmd);
    }
}
