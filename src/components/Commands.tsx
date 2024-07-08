import quotes from "../quote.mts";

export function Echo(buffer: string) {
    return <p class="text-solar-base-1 lg:text-lg font-mono">{buffer}</p>
}

export function NotFound(cmd: string) {
    return <p class="text-solar-base-1 text-sm sm:text-base lg:text-lg font-mono">
                command not found: 
                <span class="text-solar-yellow-500 font-mono">{cmd}</span>
            </p>
}

export function Quote() {
    return <p class="italic text-solar-base-1 text-sm sm:text-base lg:text-lg">"{quotes()}"</p>
}

export function Welcome() {
    return <p class="text-solar-base-1 lg:text-lg font-mono">type 'help' for a list of commands</p>
}
