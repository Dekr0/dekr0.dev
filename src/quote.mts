const _quotes = [
    "I Am That I Am. Timeless, spaceless, indescribable, pure being, being oneself, I Am.",
    "Thy will, not mine.",
    "To Make Whole, Be Whole.",
    "What we can't change, We must endure.",
    "Keep clam and carry on.",
    "Be present. The present moment is in stillness and timelessness."
]

export default function quotes() {
    return _quotes[Math.floor(Math.random() * _quotes.length)];
}

