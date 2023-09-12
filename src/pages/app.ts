document.addEventListener("DOMContentLoaded", () => {
    const body = document.querySelector("body");

    const menu = document.querySelector(".menu") as HTMLLabelElement;
    const checkbox = menu.querySelector("input") as HTMLInputElement;
    const nav = document.querySelector("nav");

    const btn = document.querySelector(".popup");
    const msg = document.getElementById("readme");

    body?.addEventListener("click", () => {
        if (msg?.classList.contains("show")) {
            msg.classList.toggle("show");
        }
    });

    btn?.addEventListener("click", event => {
        event.stopPropagation();
        msg?.classList.toggle("show");
    });

    if (nav !== null) {
        const anchors = nav.querySelectorAll("a") as NodeListOf<HTMLAnchorElement>;
        for (const anchor of anchors) {
            anchor.addEventListener("click", () => {
                if (checkbox !== null) {
                    checkbox.checked = false;
                }
            });
        }
    }

});
