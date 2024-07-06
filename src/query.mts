const $ = {
    id: (root: Document, id: string) => {
        const element = root.getElementById(id);
        if (!element) {
            throw new Error(`No element with id ${id}`);
        }
        return element;
    },
    q: (root: Document, query: string) => {
        const element = root.querySelector(query);
        if (!element) {
            throw new Error(`No element matches with query selector ${query}`);
        }
        return element;
    }
}

export default $;
