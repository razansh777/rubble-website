const cities = [
    'القدس', 'غزة', 'رام الله', 'الخليل', 'نابلس',
    'بيت لحم', 'جنين', 'طولكرم', 'قلقيلية', 'سلفيت',
    'أريحا', 'خانيونس', 'رفح', 'دير البلح', 'جباليا',
    'بيت حانون', 'النصيرات', 'الزوايدة', 'حيفا', 'يافا',
    'عكا', 'اللد', 'الرملة', 'بيسان', 'صفد',
    'الناصرة', 'طبرية', 'المجدل', 'أم الفحم', 'شفا عمرو'
];

let selectedCities = [];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let gameStarted = false;
let timer = null;
let seconds = 0;
let minutes = 0;

const gameBoard = document.querySelector('.game-board');
const movesCount = document.getElementById('moves-count');
const timeValue = document.getElementById('time');
const startButton = document.getElementById('start');
const restartButton = document.getElementById('restart');

// Initialize game
function initializeGame() {
    // Select 15 random cities
    selectedCities = [...cities]
        .sort(() => Math.random() - 0.5)
        .slice(0, 15);
    
    // Create pairs
    cards = [...selectedCities, ...selectedCities]
        .sort(() => Math.random() - 0.5);
    
    // Create cards
    gameBoard.innerHTML = '';
    cards.forEach((city, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.cardIndex = index;
        card.innerHTML = `
            <div class="card-front">${city}</div>
            <div class="card-back"></div>
        `;
        gameBoard.appendChild(card);
    });
}

// Start timer
function startTimer() {
    timer = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        timeValue.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// Reset timer
function resetTimer() {
    clearInterval(timer);
    seconds = 0;
    minutes = 0;
    timeValue.textContent = '00:00';
}

// Flip card
function flipCard(card) {
    if (!gameStarted || card.classList.contains('flipped') || flippedCards.length >= 2) return;
    
    card.classList.add('flipped');
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        moves++;
        movesCount.textContent = moves;
        checkMatch();
    }
}

// Check for match
function checkMatch() {
    const [card1, card2] = flippedCards;
    const card1City = card1.querySelector('.card-front').textContent;
    const card2City = card2.querySelector('.card-front').textContent;
    
    if (card1City === card2City) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        
        if (matchedPairs === selectedCities.length) {
            clearInterval(timer);
            setTimeout(() => {
                alert('مبروك! لقد فزت باللعبة!');
                restartButton.classList.remove('hide');
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 1000);
    }
    
    setTimeout(() => {
        flippedCards = [];
    }, 1000);
}

// Start game
function startGame() {
    gameStarted = true;
    startButton.classList.add('hide');
    restartButton.classList.remove('hide');
    startTimer();
}

// Restart game
function restartGame() {
    gameStarted = false;
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    movesCount.textContent = '0';
    resetTimer();
    initializeGame();
    startGame();
}

// Event listeners
startButton.addEventListener('click', () => {
    initializeGame();
    startGame();
});

restartButton.addEventListener('click', restartGame);

gameBoard.addEventListener('click', (e) => {
    const clickedCard = e.target.closest('.card');
    if (clickedCard) {
        flipCard(clickedCard);
    }
});

// Initialize game on load
initializeGame(); 