// Quiz Questions Data
const questions = [
    {
        question: "What has cities, but no houses; forests, but no trees; and water, but no fish?",
        options: ["A map", "A desert", "A painting", "A dream"],
        correct: 0,
        explanation: "A map shows cities, forests, and water, but doesn't contain the actual things!"
    },
    {
        question: "A man rides into town on Friday. He stays for three full days and leaves on Friday. How is this possible?",
        options: ["Time travel", "His horse's name was Friday", "It's a different Friday", "He came back"],
        correct: 1,
        explanation: "His horse's name was Friday!"
    },
    {
        question: "What has a face and two hands, but no arms or legs?",
        options: ["A clock", "A person", "A robot", "A painting"],
        correct: 0,
        explanation: "A clock has a face and two hands (hour and minute)!"
    },
    {
        question: "What is full of holes but still holds water?",
        options: ["A bucket", "A sponge", "A bottle", "A net"],
        correct: 1,
        explanation: "A sponge is full of tiny holes but can absorb and hold water!"
    },
    {
        question: "If an electric train is traveling south, and the wind is blowing west, which way does the smoke blow?",
        options: ["West", "South", "East", "There is no smoke"],
        correct: 3,
        explanation: "There is no smoke - it's an electric train!"
    },
    {
        question: "What word in the English language is always spelled incorrectly?",
        options: ["Misspelled", "Wrong", "Incorrectly", "Mistake"],
        correct: 2,
        explanation: "The word 'incorrectly' is literally the only word that is always spelled incorrectly!"
    },
    {
        question: "What is next in this sequence: O, T, T, F, F, S, S, E, ___?",
        options: ["T", "N", "I", "A"],
        correct: 1,
        explanation: "N! The letters stand for One, Two, Three, Four, Five, Six, Seven, Eight, Nine."
    },
    {
        question: "What belongs to you, but other people use it more than you do?",
        options: ["Your phone", "Your name", "Your house", "Your car"],
        correct: 1,
        explanation: "Your name! Other people say it and use it more often than you do."
    },
    {
        question: "Which two planets in our solar system have no moons?",
        options: ["Mars and Venus", "Mercury and Venus", "Earth and Mars", "Venus and Neptune"],
        correct: 1,
        explanation: "Mercury and Venus are the only planets without any moons!"
    },
    {
        question: "What is the largest desert in the world?",
        options: ["Sahara", "Antarctica", "Arabian", "Gobi"],
        correct: 1,
        explanation: "Antarctica! Deserts are defined by low rainfall, not just sand and heat."
    },
    {
        question: "If you had a match, a kerosene lamp, a candle, and a fireplace, which one would you light first?",
        options: ["The kerosene lamp", "The match", "The candle", "The fireplace"],
        correct: 1,
        explanation: "You would light the match first! You need it to light everything else."
    },
    {
        question: "How can you add eight 8's to get the number 1,000?",
        options: ["8+8+8+8+8+8+8+8", "888+88+8+8+8", "Impossible", "88+88+88+88+88"],
        correct: 1,
        explanation: "888 + 88 + 8 + 8 + 8 = 1,000!"
    }
];

// Game State
let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timerInterval = null;
let selectedAnswer = null;

// DOM Elements
const startScreen = document.getElementById('startScreen');
const quizScreen = document.getElementById('quizScreen');
const resultsScreen = document.getElementById('resultsScreen');
const playBtn = document.getElementById('playBtn');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const explanation = document.getElementById('explanation');
const explanationText = document.getElementById('explanationText');
const nextBtn = document.getElementById('nextBtn');
const timesUp = document.getElementById('timesUp');
const continueBtn = document.getElementById('continueBtn');
const timer = document.getElementById('timer');
const timeLeftSpan = document.getElementById('timeLeft');
const currentScore = document.getElementById('currentScore');
const totalQuestions = document.getElementById('totalQuestions');
const currentQuestionNum = document.getElementById('currentQuestionNum');
const totalQuestionsProgress = document.getElementById('totalQuestionsProgress');
const progressPercent = document.getElementById('progressPercent');
const progressFill = document.getElementById('progressFill');
const restartBtn = document.getElementById('restartBtn');

// Initialize Game
function initGame() {
    totalQuestions.textContent = questions.length;
    totalQuestionsProgress.textContent = questions.length;
}

// Start Quiz
function startQuiz() {
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    loadQuestion();
}

// Load Question
function loadQuestion() {
    const q = questions[currentQuestion];
    
    // Update question text
    questionText.textContent = q.question;
    
    // Update progress
    currentQuestionNum.textContent = currentQuestion + 1;
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressPercent.textContent = Math.round(progress) + '%';
    progressFill.style.width = progress + '%';
    
    // Reset state
    selectedAnswer = null;
    explanation.classList.add('hidden');
    nextBtn.classList.add('hidden');
    timesUp.classList.add('hidden');
    
    // Load options
    optionsContainer.innerHTML = '';
    q.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(optionDiv);
    });
    
    // Start timer
    timeLeft = 10;
    updateTimerDisplay();
    startTimer();
}

// Timer Functions
function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            handleTimeout();
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function updateTimerDisplay() {
    timeLeftSpan.textContent = timeLeft;
    
    // Update timer color
    timer.classList.remove('green', 'yellow', 'red');
    if (timeLeft > 6) {
        timer.classList.add('green');
    } else if (timeLeft > 3) {
        timer.classList.add('yellow');
    } else {
        timer.classList.add('red');
    }
}

// Handle Answer Selection
function selectAnswer(index) {
    if (selectedAnswer !== null || timeLeft === 0) return;
    
    selectedAnswer = index;
    stopTimer();
    
    const q = questions[currentQuestion];
    const options = optionsContainer.querySelectorAll('.option');
    
    // Disable all options
    options.forEach(opt => opt.classList.add('disabled'));
    
    // Show correct and wrong answers
    options.forEach((opt, i) => {
        if (i === q.correct) {
            opt.classList.add('correct');
            opt.innerHTML += '<svg class="option-icon icon-correct" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>';
        } else if (i === selectedAnswer) {
            opt.classList.add('wrong');
            opt.innerHTML += '<svg class="option-icon icon-wrong" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
        }
    });
    
    // Update score
    if (index === q.correct) {
        score++;
        currentScore.textContent = score;
    }
    
    // Show explanation
    explanationText.textContent = q.explanation;
    explanation.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
}

// Handle Timeout
function handleTimeout() {
    stopTimer();
    
    const options = optionsContainer.querySelectorAll('.option');
    options.forEach(opt => opt.classList.add('disabled'));
    
    // Show correct answer
    const q = questions[currentQuestion];
    options[q.correct].classList.add('correct');
    options[q.correct].innerHTML += '<svg class="option-icon icon-correct" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>';
    
    // Show explanation and time's up message
    explanationText.textContent = q.explanation;
    explanation.classList.remove('hidden');
    timesUp.classList.remove('hidden');
}

// Next Question
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResults();
    }
}

// Show Results
function showResults() {
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    
    const percentage = (score / questions.length) * 100;
    let emoji, title;
    
    if (percentage === 100) {
        emoji = '🏆';
        title = 'ABSOLUTE GENIUS!';
    } else if (percentage >= 80) {
        emoji = '🧠';
        title = 'BRILLIANT MIND!';
    } else if (percentage >= 60) {
        emoji = '⭐';
        title = 'SMART THINKER!';
    } else if (percentage >= 40) {
        emoji = '💪';
        title = 'GOOD EFFORT!';
    } else {
        emoji = '🤔';
        title = 'KEEP PRACTICING!';
    }
    
    document.getElementById('resultEmoji').textContent = emoji;
    document.getElementById('resultTitle').textContent = title;
    document.getElementById('finalScore').textContent = score + '/' + questions.length;
    document.getElementById('percentage').textContent = 'You scored ' + percentage.toFixed(0) + '%';
}

// Restart Game
function restartGame() {
    currentQuestion = 0;
    score = 0;
    currentScore.textContent = '0';
    
    resultsScreen.classList.remove('active');
    startScreen.classList.add('active');
}

// Event Listeners
playBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
continueBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartGame);

// Start the game
initGame();