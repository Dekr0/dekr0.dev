let commandList = new Array<[string, string, string[] | undefined]>();

commandList.push([
    "about",
    "(alias) man me - About me",
    undefined
]);
commandList.push([
    "experience",
    "(alias) man experience - My experience",
    undefined
]);
commandList.push([
    "help",
    "Show available commands",
    undefined
]);
commandList.push([
    "man",
    "An interface to reference manual",
    undefined
]);
commandList.push([
    "project",
    "(alias) man projects - My projects",
    undefined
]);

export default commandList;
