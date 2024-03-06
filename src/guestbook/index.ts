import { app } from "./Guestbook";

async function handleOnSubmit(event: SubmitEvent) {
    event.preventDefault();
    event.stopPropagation();

    const commentForm = event.target as HTMLInputElement
    const commentField = commentForm.querySelector("#comment-field");
    if (!commentField) return;

    const comment = (commentField as HTMLInputElement).value;
    if (comment.length >= 2) {
        const params = new URLSearchParams();
        params.set("comment", comment);

        const headers: HeadersInit = {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
        };
        const init: RequestInit = {
            body: params,
            method: "POST",
            headers: headers,
        };

        await fetch("/api/guestbook", init);
    }
}

function render() {
    const viewCountSpan = document.getElementById("view-count");
    if (viewCountSpan) {
        const viewCount = window.app?.getViewCount();
        viewCountSpan.textContent = `Number of Viewers: ${viewCount ? viewCount : 1}`;
    }

    const signCommentForm = document.getElementById("sign-comment-form");
    if (signCommentForm) {
        signCommentForm.addEventListener("submit", handleOnSubmit);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    window.app = app;
});

document.addEventListener("astro:page-load", () => {
    render();
});
