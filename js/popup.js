// Helper function to get random number
Array.prototype.rand = function () {
    return this[Math.floor((Math.random()*this.length))];
}

var wordList = wordList; //Word database from words.js.
var wordWrapper = document.getElementById('wrapper');
var letterList = []; // This will be used to store the span tags from the wordWrapper.

var startButton = document.getElementById('startButton');

var score = document.getElementById('score');
var scoreCount = 0;

var timer = document.getElementById('timer');
var timeleft = 60;

function getWord() {
    while (true) {
        var word = wordList.rand()
        if (word.length <= 8) {
            return word
        }
    }
}

function clearWord() {
    while (wordWrapper.firstChild) {
        wordWrapper.removeChild(wordWrapper.firstChild);
    }
}

function addLetters(word) {
    clearWord();

    let letters = word.toUpperCase().split('');
    // Create a span for each letter in word.
    letters.forEach(letter => {
        span = document.createElement('span');
        span.innerText = letter;

        wordWrapper.appendChild(span);
    });

    return wordWrapper.childNodes
}

function addScore() {
    scoreCount += 1
    score.innerText = "Score: " + scoreCount
}

function stopGame() {
    clearWord();
    startButton.disabled = false;
}

function startGame() {
    startButton.disabled = true;
    scoreCount = 0;
    timeleft = 60;

    let word = getWord();
    letterList = addLetters(word);
    var current = 0; // Current span index.

    window.addEventListener('keydown', (e) => {
        let typedLetter = e.key.toUpperCase();

        if (typedLetter === letterList[current].innerText) {
            letterList[current].classList.add("typed");

            current += 1
            
            // When last letter from current word is typed, wait 0.2 seconds to get new word and add to the score.
            if (current >= letterList.length) {
                var wordInterval = setInterval(function(){
                    current = 0;
                    word = getWord();
                    letterList = addLetters(word);

                    addScore();
                    clearInterval(wordInterval);
                }, 200);
            }
        }
    }, false);

    // Simple timer to stop the game.
    var timerInterval = setInterval(function(){
        if(timeleft <= 0){
            stopGame();
            clearInterval(timerInterval)
        }
        timer.innerText = "Timer: " + timeleft;
        timeleft -= 1;
    }, 1000);
}

startButton.addEventListener('click', startGame, false);