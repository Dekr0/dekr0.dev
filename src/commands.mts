const commands = new Map<string, Function>();

function about() {
    return offline("about");
}

function contacts() {
    return offline("contacts");
}

function offline(cmd: string) {
    return `Command ${cmd} is still in work in progress`;
}

function experience() {
    return offline("experience");
}

function man() {
    return offline("man");
}

function projects() {
    return offline("projects");
}

function sleep(t: number, callback: Function) {
    setTimeout(() => callback(), t);
}

commands.set(about.name, about);
commands.set(contacts.name, contacts);
commands.set(experience.name, experience);
commands.set(man.name, man);
commands.set(projects.name, projects);
commands.set(sleep.name, sleep);

export default commands;
