const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const author = document.getElementById('author');
const tweetBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('quote-btn');
const loader = document.getElementById('loader');
// show new Quote



function showLoader() {
    loader.style.display = 'block';
    quoteContainer.style.display = 'none';
  }
  
  function hideLoader() {
    loader.style.display = 'none';
    quoteContainer.style.display = 'block';
  }


let apiQuotes = [];
function newQuote(){
    showLoader();
    const  quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)]
    // console.log(quote)
    
    if (quote.author == null){
        author.textContent = 'Unknown';
    }else{
        author.textContent = quote.author;
    }
    
    
    
    if(quoteText.length>120){
        
        quoteText.classList.add('long-quote');
        
    }
    quoteText.textContent = quote.text;
    hideLoader();
//     complete();
}

// get quotes from API

async function getQuotes(){
    showLoader();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();   
        newQuote();
        // console.log(apiQuotes[12]);
    }
    catch(error){
        console.log(error,' 404');
        
    }
    hideLoader()
}

// tweet quote
function tweetQuote() {
    
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
    window.open(tweetUrl, '_blank');
}

// add event listeners
newQuoteBtn.addEventListener('click', newQuote);
tweetBtn.addEventListener('click', tweetQuote);



// on load

getQuotes();




