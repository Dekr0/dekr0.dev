import app from "./Guestbook";

async function handleOnSubmit(event: SubmitEvent) {
    event.preventDefault();
    event.stopPropagation();

    const commentForm = event.target as HTMLInputElement;
    const contentField = commentForm.querySelector("#content-field");
    if (!contentField) return;

    const content = (contentField as HTMLInputElement).value;
    if (content.length >= 2) {
        const params = new URLSearchParams();
        params.set("content", content);

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

        (contentField as HTMLInputElement).value = "";
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
    if (!window.app) {
        window.app = app;
    }
    if (window.app.disconnected()) {
        window.app.connect();
    }
});

window.addEventListener("unload", () => {
    window.app?.disconnect();
});

document.addEventListener("astro:page-load", () => {
    if (!window.app) {
        window.app = app;
        window.app.connect();
    } else if (window.app.disconnected()) {
        window.app.connect();
    }
    render();
});
