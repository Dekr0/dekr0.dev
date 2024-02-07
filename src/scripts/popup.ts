function popupSetup() {
    const body = document.querySelector("body");

    const menu = document.querySelector(".menu") as HTMLLabelElement;
    const checkbox = menu.querySelector("input") as HTMLInputElement;
    const nav = document.querySelector("nav");

    const btn = document.querySelector(".popup");
    const msg = document.getElementById("readme");

    function onBodyClick() {
        if (msg?.classList.contains("show")) {
            msg.classList.toggle("show");
        }
    }

    function onPopupBtnClick(event: Event) {
        event.stopPropagation();
        msg?.classList.toggle("show");
    }

    body?.addEventListener("click", onBodyClick);

    btn?.addEventListener("click", onPopupBtnClick);

    if (nav !== null) {
        const anchors = nav.querySelectorAll(
            "a",
        ) as NodeListOf<HTMLAnchorElement>;
        for (const anchor of anchors) {
            anchor.addEventListener("click", () => {
                if (checkbox !== null) {
                    checkbox.checked = false;
                }
            });
        }
    }
}

document.addEventListener("astro:page-load", popupSetup);
