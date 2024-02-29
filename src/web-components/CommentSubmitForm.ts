import { Comment } from "src/types/Comment";
import DOMPurify from "dompurify";

export default class CommentSubmitForm extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const submitComment = async (e: MouseEvent) => {
            e.preventDefault();
            const commentInput = this.querySelector("input");
            if (commentInput !== null) {
                const comment = commentInput.value;
                const result = Comment.safeParse(comment);
                if (result.success) {
                    try {
                        const clean  = DOMPurify.sanitize(result.data);
                        const repsonse = await fetch("/api/guestbook", {
                            method: "POST",
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                comment: clean 
                            }),
                            credentials: "include"
                        });
                    } catch (err) {
                    }
                }
            }
        };

        const submitCommentBtn = this.querySelector("button");
        if (submitCommentBtn !== null) {
            submitCommentBtn.addEventListener("click", submitComment);
        }
    }
}
