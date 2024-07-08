import { helpTemplate } from "../scripts/template.mts";

const commands = new Map<string, Function>();

function about() {
    return man("about");
}

function contacts() {
    return man("contacts");
}

function offline(cmd: string) {
    return `Command ${cmd} is still in work in progress`;
}

function experience() {
    return man("experience");
}

function help() {
    const root = helpTemplate.content.cloneNode(true) as DocumentFragment;
    return root;
}

function man(args: string) {

}

function projects() {
    return man("projects");
}

function sleep(t: number, callback: Function) {
    setTimeout(() => callback(), t);
}

commands.set(about.name, about);

commands.set(experience.name, experience);

commands.set(help.name, help);

commands.set(man.name, man);

commands.set(projects.name, projects);

export default commands;
