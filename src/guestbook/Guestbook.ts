import type { _Comment } from "@T/Comment";

type Event = {
    Type: string;
};

export type ViewCountEvent = Event & {
    ViewCountEventType: string;
    ViewCount: number;
};

export type DBChangeEvent = Event & {
    DBEventType: string;
    Comment: _Comment;
};

const prod = import.meta.env.PUBLIC_PROD;
const addr = prod ? import.meta.env.PUBLIC_BACKEND_ADDR : "localhost";
const port = prod ? import.meta.env.PUBLIC_BACKEND_PORT : 8000;

export class GuestbookApp {
    private ws: WebSocket;
    private viewCount: number;

    constructor() {
        console.log("called");
        this.viewCount = 1;
        this.ws = new WebSocket(`ws://${addr}:${port}/ws`);

        this.ws.addEventListener("message", (event) => {
            const data = JSON.parse(event.data);
            if (!data.Type) return;

            const generic = data as Event;
            switch (generic.Type) {
                case "ViewCountEvent": {
                    const e = generic as ViewCountEvent;
                    this.setViewCount(e.ViewCount as number);
                    break;
                }
                case "DBChangeEvent": {
                    const e = generic as DBChangeEvent;
                    console.log(e);
                    // this.updateComments(e.Comment);
                    break;
                }
            }
        });

        window.addEventListener("beforeunload", (_) => {
            this.ws.close();
        });
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

    updateComments(comment: _Comment) {
        const commentSection = document.getElementById("comment-section");
        if (!commentSection) return;
        const commentLists = commentSection.children;

        const newCommentList = document.createElement("li");
        const commentSpan = document.createElement("span");
        newCommentList.id = comment.Id.toString(10);
        newCommentList.dataset.time = comment.Timestamp.toString(10);
        newCommentList.className = "w-full text-sm text-rp-text break-word";
        commentSpan.textContent = `${comment.Author}: ${comment.Content}`;
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
            if (time == comment.Timestamp) {
                e.insertAdjacentElement("beforebegin", newCommentList);
                return;
            } else if (comment.Timestamp > time) {
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
}

export const app = new GuestbookApp();
