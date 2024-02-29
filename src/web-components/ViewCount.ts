import DOMPurify from "dompurify";
import getLogger from "src/utils/logger";

const enableLogging: boolean =
    import.meta.env.PUBLIC_WEB_LOG === "true" ? true : false;

export default class ViewCount extends HTMLElement {
    private viewCountSpan: HTMLSpanElement | null;
    private ws;

    constructor() {
        super();
        this.viewCountSpan = null;

        const backendAddr = import.meta.env.PUBLIC_WS_BACKEND_ADDR;
        const backendPort = import.meta.env.PUBLIC_WS_BACKEND_PORT;

        this.ws = new WebSocket(`${backendAddr}:${backendPort}/ws`);
        this.ws.addEventListener("open", (_) => {
            if (enableLogging) {
                getLogger().info("Connection established");
            }
        });
        this.ws.addEventListener("message", (event) => {
            if (enableLogging) {
                getLogger().info(event);
            }
            const json = JSON.parse(event.data);
            if (json.ViewCount) {
                if (this.viewCountSpan) {
                    this.viewCountSpan.textContent = DOMPurify.sanitize(
                        `View: ${json.ViewCount}`,
                    );
                }
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
        this.viewCountSpan.className = DOMPurify.sanitize("pl-2");
        this.viewCountSpan.textContent = DOMPurify.sanitize(`Viewers: `);

        div.append(this.viewCountSpan);
        this.append(div);
    }
}
