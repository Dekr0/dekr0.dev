import DOMPurify from "dompurify";

type CommentProp = {
    author: string;
    comment: string;
};

export default class CommentSlug extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        if (this.dataset.props) {
            const props: CommentProp = JSON.parse(this.dataset.props);
            const cleanAuthor = DOMPurify.sanitize(props.author);
            const cleanComment = DOMPurify.sanitize(props.comment);

            const div = document.createElement("div");
            div.className = DOMPurify.sanitize(
                "w-full pt-4 text-sm break-words",
            );

            const span = document.createElement("span");
            span.className = DOMPurify.sanitize("text-rp-text mr-1");
            span.textContent = `${cleanAuthor}: ${cleanComment}`;

            div.append(span);
            this.append(div);
        }
    }
}
