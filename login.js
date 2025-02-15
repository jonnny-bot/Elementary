// List of Randomized Quotes
const quotes = [
    { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
    { text: "Happiness depends upon ourselves.", author: "Aristotle" },
    { text: "The mind is everything. What you think, you become.", author: "Buddha" },
    { text: "With the new day comes new strength and new thoughts.", author: "Eleanor Roosevelt" },
    { text: "Your present circumstances don't determine where you go; they merely determine where you start.", author: "Nido Qubein" }
];

// Select Random Quote on Load
window.onload = function() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById('quote').textContent = `"${quotes[randomIndex].text}"`;
    document.getElementById('author').textContent = `- ${quotes[randomIndex].author}`;
};
