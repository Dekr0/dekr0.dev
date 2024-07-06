export default class RingBuffer {
    private buffer: string[]
    private head  : number
    private tail  : number
    private full  : boolean
    private max   : number

    constructor(max: number) {
        this.buffer = new Array<string>(0);
        this.max    = 4;
        this.full   = false;
        this.head   = 0;
        this.tail   = 0;
    }

    flush(): string[] {
        const buffer: string[] = [];
        while (!this.isEmpty()) {
            const key = this.pop();
            if (!key) {
                throw new Error("An undefined item was popped after passing empty check");
            }
            buffer.push(key);
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

        const data = this.buffer[this.tail];

        this.buffer[this.tail] = "";

        this.retreat();

        return data;
    }

    push(key: string) {
        this.buffer[this.head] = key;
        this.advance();
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

