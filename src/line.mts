export default function initLine() {
    let counter = 0;
    return () => {
        counter++;
        return counter;
    };
}
