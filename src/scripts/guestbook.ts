import getLogger from "src/utils/logger";

type CommentProp = {
    author: string;
    comment: string;
};

const enableLogging: boolean =
    import.meta.env.PUBLIC_WEB_LOG === "true" ? true : false;

class ViewCount extends HTMLElement {
    private viewCountSpan: HTMLSpanElement | null;
    private viewCount: number;
    private ws;

    constructor() {
        super();
        this.viewCount = 0;
        this.viewCountSpan = null;

        const addr = import.meta.env.PUBLIC_WS_BACKEND_ADDR;
        const port = import.meta.env.PUBLIC_WS_BACKEND_PORT;

        this.ws = new WebSocket(`${addr}:${port}/ws`);
        this.ws.addEventListener("open", (_) => {
            if (enableLogging) {
                getLogger().info("Connection established");
            }
        });
        this.ws.addEventListener("message", (event) => {
            if (enableLogging) {
                getLogger().info(event);
            }

            // zod validation?
            switch (event.data) {
                case "on-new-sub": {
                    this.viewCount++;
                    if (this.viewCountSpan) {
                        this.viewCountSpan.textContent = `Views: ${this.viewCount}`;
                    }
                    break;
                }
                case "on-sub-disconnect": {
                    this.viewCount--;
                    if (this.viewCountSpan) {
                        this.viewCountSpan.textContent = `Views: ${this.viewCount}`;
                    }
                    break;
                }
                default:
                    break;
            }
        });
        this.ws.addEventListener("close", (_) => {
            if (enableLogging) {
                getLogger().info("Closing connection");
            }
        });
    }

    connectedCallback() {
        const div = document.createElement("div");
        this.viewCountSpan = document.createElement("span");
        this.viewCountSpan.className = "pl-2";
        this.viewCountSpan.textContent = `Viewers: ${this.viewCount}`;
        div.append(this.viewCountSpan);
        this.append(div);
    }
}

class CommentSlug extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        if (this.dataset.props) {
            const props: CommentProp = JSON.parse(this.dataset.props);
            const div = document.createElement("div");
            div.className = "w-full pt-4 text-sm break-words";
            const span = document.createElement("span");
            span.className = "text-rp-text mr-1";
            span.textContent = `${props.author}: ${props.comment}`;
            div.append(span);
            this.append(div);
        }
    }
}

class CommentSection extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const btn = this.querySelector("button");
        const title = this.querySelector(".title") as HTMLInputElement;
        const message = this.querySelector(".message") as HTMLInputElement;
    }
}

customElements.define("comment-section", CommentSection);
customElements.define("comment-slug", CommentSlug);
customElements.define("view-count", ViewCount);
