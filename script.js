let apiQuotes = [];
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const tweetButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function completed() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function newQuote() {
    loading();

    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    quoteText.textContent = quote.text;

    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    authorText.textContent = quote.author;
    completed();
}

async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'

    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
    }

    completed();
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

getQuotes();
tweetButton.addEventListener("click", () => {
    tweetQuote();
});

newQuoteButton.addEventListener("click", () => {
    getQuotes();
});