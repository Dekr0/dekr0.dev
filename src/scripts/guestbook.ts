type CommentProp = {
    author: string;
    comment: string;
};

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
