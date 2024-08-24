export default class ModRingBuffer {
    private buffer: string[];
    private head: number;
    private tail: number;
    private full: boolean;
    private max: number;
    private empty_flag: string;

    private static mods = ["Alt", "Control", "Meta", "Shift"];

    private static browsers = ["Control,z"];

    constructor(
        max: number = ModRingBuffer.mods.length,
        empty_flag: string = "empty",
    ) {
        this.buffer = new Array<string>(0);
        this.max = max;
        this.full = false;
        this.head = 0;
        this.tail = 0;
        this.empty_flag = empty_flag;
    }

    static isMod(key: string) {
        return ModRingBuffer.mods.includes(key);
    }

    static isBrowser(shortcut: string) {
        return ModRingBuffer.browsers.includes(shortcut);
    }

    flush(): string[] {
        const buffer: string[] = [];
        while (!this.isEmpty()) {
            const mod = this.pop();
            if (!mod) {
                throw new Error(
                    "An undefined item was popped after passing empty check",
                );
            }
            buffer.push(mod);
        }
        return buffer;
    }

    isEmpty(): boolean {
        return !this.full && this.head === this.tail;
    }

    peek(): string | undefined {
        return this.isEmpty() ? undefined : this.buffer[this.tail];
    }

    pop(): string | undefined {
        if (this.isEmpty()) return undefined;

        const mod = this.buffer[this.tail];

        this.buffer[this.tail] = this.empty_flag;

        this.retreat();

        return mod;
    }

    push(key: string) {
        this.buffer[this.head] = key;
        this.advance();
    }

    toArray(): string[] {
        if (this.isEmpty()) return [];

        const buffer: string[] = [];
        let tail = this.tail;
        while (tail !== this.head) {
            buffer.push(this.buffer[tail]);
            tail = ++tail === this.max ? 0 : tail;
        }
        return buffer;
    }

    toString(): string {
        return `[${this.buffer}], head = ${this.head}, tail = ${this.tail}`;
    }

    private advance() {
        if (this.full) {
            this.tail = ++this.tail == this.max ? 0 : this.tail;
        }
        this.head = ++this.head === this.max ? 0 : this.head;
        this.full = this.head === this.tail;
    }

    private retreat() {
        this.full = false;
        this.tail = ++this.tail === this.max ? 0 : this.tail;
    }
}
