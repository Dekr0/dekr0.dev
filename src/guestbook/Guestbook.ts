import { Event, Comment, DBEventType } from "@P/messager";

const prod = import.meta.env.PUBLIC_PROD;
const addr = prod ? import.meta.env.PUBLIC_BACKEND_ADDR : "localhost";
// const port = prod ? import.meta.env.PUBLIC_BACKEND_PORT : 8000;

export class GuestbookApp {
    private ws: WebSocket | null;
    private viewCount: number;

    constructor() {
        this.viewCount = 1;
        this.ws = null;
        window.addEventListener("beforeunload", (_) => {
            this.disconnect();
        });
    }

    connect() {
        if (this.ws) {
            switch (this.ws.readyState) {
                case WebSocket.CONNECTING:
                case WebSocket.OPEN:
                    return;
                default:
                    this.ws = null;
                    break;
            }
        }

        this.ws = new WebSocket(`wss://${addr}/ws`);
        this.ws.binaryType = "arraybuffer";

        this.ws.addEventListener("open", (_) => {
            console.log("Realtime started");
        });

        this.ws.addEventListener("message", (event) => {
            const data = event.data;

            if (data === null || !data || !(data instanceof ArrayBuffer)) {
                console.error("Invalid Valid Data");
            }

            const ev = Event.decode(new Uint8Array(data));

            if (ev.dbChangeEvent && ev.dbChangeEvent.comment) {
                console.log(ev.dbChangeEvent);
                switch (ev.dbChangeEvent.dbEventType) {
                    case DBEventType.DBEVENTTYPE_INSERT:
                        this.newComment(ev.dbChangeEvent.comment);
                        break;
                    case DBEventType.DBEVENTTYPE_DELETE:
                        this.deleteComment(ev.dbChangeEvent.comment);
                    case DBEventType.DBEVENTTYPE_UPDATE:
                        this.updateComment(ev.dbChangeEvent.comment);
                    default:
                        break;
                }
            } else if (ev.viewCountEvent) {
                this.setViewCount(ev.viewCountEvent.viewCount);
            }
        });

        this.ws.addEventListener("close", (_) => {
            console.log("Realtime stopped");
        });

        this.ws.addEventListener("error", (_) => {
            console.log("Occur in realtime");
        })
    }

    disconnect() {
        if (this.ws !== null) {
            console.log("Realtime stopping");
            this.ws.close();
            this.ws = null;
        }
    }

    disconnected() {
        return !this.ws;
    }

    setViewCount(viewCount: number) {
        this.viewCount = viewCount;
        const viewCountSpan = document.getElementById("view-count");
        if (!viewCountSpan) return;
        viewCountSpan.textContent = `Number of Viewers: ${this.viewCount}`;
    }

    getViewCount() {
        return this.viewCount;
    }

    newComment(comment: Comment) {
        const commentSection = document.getElementById("comment-section");
        if (!commentSection) return;
        const commentLists = commentSection.children;

        const newCommentList = document.createElement("li");
        const commentSpan = document.createElement("span");

        newCommentList.id = comment.id.toString(10);
        newCommentList.dataset.time = comment.time.toString(10);
        commentSpan.textContent = `${comment.author}: ${comment.content}`;

        newCommentList.className = "w-full text-sm text-rp-text break-word";

        newCommentList.append(commentSpan);

        if (commentLists.length === 0) {
            commentSection.append(newCommentList);
        }

        let l = 0,
            h = commentLists.length;
        do {
            const m = Math.floor((l + h) / 2);
            const e = commentLists[m] as HTMLElement;
            if (!e.dataset.time) {
                commentSection.insertAdjacentElement(
                    "afterbegin",
                    newCommentList,
                );
                return;
            }
            const time = Number.parseInt(e.dataset.time as string);
            if (time == comment.time) {
                e.insertAdjacentElement("beforebegin", newCommentList);
                return;
            } else if (comment.time > time) {
                h = m;
            } else {
                l = m + 1;
            }
        } while (l < h);

        if (commentLists.length === l) {
            l--;
        }
        commentLists[l].insertAdjacentElement("beforebegin", newCommentList);
    }

    deleteComment(comment: Comment) {
        const commentSection = document.getElementById("comment-section");
        if (!commentSection) return;
        const commentLists = commentSection.children;
        for (const list of commentLists) {
            if (list.id === comment.id.toString(10)) {
                commentSection.removeChild(list);
            }
        } 
    }

    updateComment(comment: Comment) {
        const commentSection = document.getElementById("comment-section");
        if (!commentSection) return;
        const commentLists = commentSection.children;
        for (const list of commentLists) {
            if (list.id === comment.id.toString(10)) {
                (list as HTMLElement).dataset.time = comment.time.toString(10);
                list.textContent = `${comment.author}: ${comment.content}`;
            }
        } 
    }
}

const app = new GuestbookApp();

export default app;
