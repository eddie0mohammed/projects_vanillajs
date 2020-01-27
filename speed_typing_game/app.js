
const RANDOM_QUOTE = 'http://api.quotable.io/random';

const quoteDisplay = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timer = document.getElementById('timer');



quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplay.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');
    let correct = true;

    arrayQuote.forEach((charecterSpan, index) => {
        const character = arrayValue[index];
        if (character == null){
            charecterSpan.classList.remove('correct');
            charecterSpan.classList.remove('incorrect');
            correct = false;
        }else if (character == charecterSpan.innerText){
            charecterSpan.classList.add('correct');
            charecterSpan.classList.remove('incorrect');
        }else {
            charecterSpan.classList.remove('correct');
            charecterSpan.classList.add('incorrect');
            correct = false;
        }

    })
    
    if (correct){
        renderNewQuote();
        count = 0;
    }
})



function getRandomQuote(){

    return fetch(RANDOM_QUOTE)
        .then((res) => res.json())
        .then((data) => data.content);
}

async function renderNewQuote(){
    const quote = await getRandomQuote();
    // startTimer();

    
    quoteDisplay.innerHTML = '';
    
    quote.split('').forEach(character => {
        const charecterSpan = document.createElement('span');
        charecterSpan.innerText = character;
        
        quoteDisplay.appendChild(charecterSpan);
    })
    quoteInputElement.value = '';
}

let count = 0;
function startTimer(){
    timer.textContent = count;

    setInterval(() => {
        count++;
        timer.textContent = count;
    }, 1000);
}


renderNewQuote();
startTimer();