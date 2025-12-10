// Quiz Questions - Organized by Difficulty
const quizQuestions = [
    // EASY QUESTIONS (1-5)
    {
        question: "What does 'WWW' stand for in a website address?",
        options: ["World Wide Web", "World Web Wide", "Web World Wide", "Wide World Web"],
        correct: 0,
        difficulty: "easy",
        explanation: "WWW stands for World Wide Web, the system of interlinked hypertext documents accessed via the Internet."
    },
    {
        question: "Which company developed the Windows operating system?",
        options: ["Apple", "Microsoft", "Google", "IBM"],
        correct: 1,
        difficulty: "easy",
        explanation: "Microsoft developed Windows, which first launched in 1985 and became the most popular operating system."
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Saturn", "Earth", "Jupiter", "Neptune"],
        correct: 2,
        difficulty: "easy",
        explanation: "Jupiter is the largest planet in our solar system, with a mass more than twice that of all other planets combined!"
    },
    {
        question: "What does 'USB' stand for?",
        options: ["Universal Serial Bus", "United System Base", "Universal System Board", "Unified Serial Board"],
        correct: 0,
        difficulty: "easy",
        explanation: "USB stands for Universal Serial Bus, a standard connection interface for computers and electronic devices."
    },
    {
        question: "How many continents are there on Earth?",
        options: ["5", "6", "7", "8"],
        correct: 2,
        difficulty: "easy",
        explanation: "There are 7 continents: Africa, Antarctica, Asia, Europe, North America, Australia, and South America."
    },
    
    // MEDIUM QUESTIONS (6-10)
    {
        question: "What programming language is known as the 'language of the web'?",
        options: ["Python", "Java", "JavaScript", "C++"],
        correct: 2,
        difficulty: "medium",
        explanation: "JavaScript is the primary programming language for web development, running in browsers to create interactive websites."
    },
    {
        question: "What does 'CPU' stand for in a computer?",
        options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Computer Processing Unit"],
        correct: 0,
        difficulty: "medium",
        explanation: "CPU stands for Central Processing Unit, often called the 'brain' of the computer that executes instructions."
    },
    {
        question: "In what year did the first iPhone release?",
        options: ["2005", "2006", "2007", "2008"],
        correct: 2,
        difficulty: "medium",
        explanation: "The first iPhone was released on June 29, 2007, revolutionizing the smartphone industry."
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correct: 2,
        difficulty: "medium",
        explanation: "Au is the chemical symbol for gold, derived from the Latin word 'aurum' meaning gold."
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Mercury"],
        correct: 1,
        difficulty: "medium",
        explanation: "Mars is called the Red Planet due to iron oxide (rust) on its surface giving it a reddish appearance."
    },
    
    // HARD QUESTIONS (11-15)
    {
        question: "What does 'HTTP' stand for?",
        options: ["HyperText Transfer Protocol", "High Transfer Text Protocol", "HyperText Transmission Protocol", "High Text Transfer Protocol"],
        correct: 0,
        difficulty: "hard",
        explanation: "HTTP stands for HyperText Transfer Protocol, the foundation of data communication on the World Wide Web."
    },
    {
        question: "Who is considered the father of modern computing?",
        options: ["Bill Gates", "Steve Jobs", "Alan Turing", "Tim Berners-Lee"],
        correct: 2,
        difficulty: "hard",
        explanation: "Alan Turing is considered the father of modern computing for his work on the Turing machine and code-breaking."
    },
    {
        question: "What is the speed of light in a vacuum?",
        options: ["299,792,458 m/s", "300,000,000 m/s", "299,000,000 m/s", "298,792,458 m/s"],
        correct: 0,
        difficulty: "hard",
        explanation: "The speed of light in a vacuum is exactly 299,792,458 meters per second, a fundamental constant of nature."
    },
    {
        question: "In binary, what is the decimal number 15?",
        options: ["1111", "1011", "1101", "1001"],
        correct: 0,
        difficulty: "hard",
        explanation: "15 in binary is 1111 (8+4+2+1=15). Binary uses only 0s and 1s to represent numbers."
    },
    {
        question: "What does 'AI' stand for in technology?",
        options: ["Automated Intelligence", "Artificial Intelligence", "Advanced Intelligence", "Algorithmic Intelligence"],
        correct: 1,
        difficulty: "hard",
        explanation: "AI stands for Artificial Intelligence, the simulation of human intelligence by machines and computer systems."
    }
];

// Game State
let currentQuestionIndex = 0;
let playerScore = 0;
let timeRemaining = 15;
let countdownTimer = null;
let answerSelected = null;
let hasSubscribed = false;

// Get DOM Elements
const startScreen = document.getElementById('startScreen');
const quizScreen = document.getElementById('quizScreen');
const resultsScreen = document.getElementById('resultsScreen');
const startBtn = document.getElementById('startBtn');
const subscribeLink = document.getElementById('subscribeLink');
const enableText = document.getElementById('enableText');
const visitorCount = document.getElementById('visitorCount');
const timeDisplay = document.getElementById('timeDisplay');
const timerBox = document.getElementById('timerBox');
const scoreDisplay = document.getElementById('scoreDisplay');
const totalDisplay = document.getElementById('totalDisplay');
const questionNumber = document.getElementById('questionNumber');
const difficultyTag = document.getElementById('difficultyTag');
const progressBar = document.getElementById('progressBar');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const feedbackBox = document.getElementById('feedbackBox');
const feedbackText = document.getElementById('feedbackText');
const nextBtn = document.getElementById('nextBtn');
const timeoutBox = document.getElementById('timeoutBox');
const timeoutBtn = document.getElementById('timeoutBtn');
const resultEmoji = document.getElementById('resultEmoji');
const resultTitle = document.getElementById('resultTitle');
const resultScore = document.getElementById('resultScore');
const resultPercentage = document.getElementById('resultPercentage');
const restartBtn = document.getElementById('restartBtn');

// Initialize Visitor Counter
function initializeVisitorCounter() {
    // Get current count from localStorage
    let count = localStorage.getItem('visitorCount');
    
    if (!count) {
        // First time visitor
        count = 1;
    } else {
        // Increment count
        count = parseInt(count) + 1;
    }
    
    // Save back to localStorage
    localStorage.setItem('visitorCount', count);
    
    // Display count
    visitorCount.textContent = count;
}

// Handle Subscribe Click
function handleSubscribeClick() {
    // Mark as subscribed (you can add more verification if needed)
    hasSubscribed = true;
    
    // Enable start button
    startBtn.disabled = false;
    enableText.classList.add('hidden');
    
    // Change button style to show it's enabled
    startBtn.style.opacity = '1';
    
    // Store subscription status
    localStorage.setItem('hasSubscribed', 'true');
}

// Check if user already subscribed
function checkSubscriptionStatus() {
    const subscribed = localStorage.getItem('hasSubscribed');
    
    if (subscribed === 'true') {
        hasSubscribed = true;
        startBtn.disabled = false;
        enableText.classList.add('hidden');
    }
}

// Initialize Quiz
function initializeQuiz() {
    totalDisplay.textContent = quizQuestions.length;
    initializeVisitorCounter();
    checkSubscriptionStatus();
}

// Start Quiz
function startQuiz() {
    if (!hasSubscribed) {
        alert('Please subscribe to our YouTube channel first!');
        return;
    }
    
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    displayQuestion();
}

// Display Current Question
function displayQuestion() {
    const currentQ = quizQuestions[currentQuestionIndex];
    
    // Update question text
    questionText.textContent = currentQ.question;
    
    // Update question number and progress
    questionNumber.textContent = currentQuestionIndex + 1;
    const progressPercentage = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressBar.style.width = progressPercentage + '%';
    
    // Update difficulty tag
    difficultyTag.textContent = currentQ.difficulty.toUpperCase();
    difficultyTag.className = 'difficulty-tag ' + currentQ.difficulty;
    
    // Reset UI elements
    answerSelected = null;
    feedbackBox.classList.add('hidden');
    nextBtn.classList.add('hidden');
    timeoutBox.classList.add('hidden');
    
    // Display options
    optionsContainer.innerHTML = '';
    currentQ.options.forEach((optionText, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = optionText;
        optionElement.onclick = () => handleAnswerSelection(index);
        optionsContainer.appendChild(optionElement);
    });
    
    // Start countdown
    timeRemaining = 15;
    updateTimerDisplay();
    startCountdown();
}

// Start Countdown Timer
function startCountdown() {
    if (countdownTimer) clearInterval(countdownTimer);
    
    countdownTimer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            handleTimeExpired();
        }
    }, 1000);
}

// Stop Countdown Timer
function stopCountdown() {
    if (countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
    }
}

// Update Timer Display
function updateTimerDisplay() {
    timeDisplay.textContent = timeRemaining;
    
    timerBox.classList.remove('green', 'yellow', 'red');
    if (timeRemaining > 10) {
        timerBox.classList.add('green');
    } else if (timeRemaining > 5) {
        timerBox.classList.add('yellow');
    } else {
        timerBox.classList.add('red');
    }
}

// Handle Answer Selection
function handleAnswerSelection(selectedIndex) {
    if (answerSelected !== null || timeRemaining === 0) return;
    
    answerSelected = selectedIndex;
    stopCountdown();
    
    const currentQ = quizQuestions[currentQuestionIndex];
    const allOptions = optionsContainer.querySelectorAll('.option');
    
    // Disable all options
    allOptions.forEach(opt => opt.classList.add('disabled'));
    
    // Mark correct and wrong answers
    allOptions.forEach((opt, idx) => {
        if (idx === currentQ.correct) {
            opt.classList.add('correct');
            opt.innerHTML += '<svg class="option-icon icon-correct" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>';
        } else if (idx === selectedIndex) {
            opt.classList.add('wrong');
            opt.innerHTML += '<svg class="option-icon icon-wrong" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
        }
    });
    
    // Update score if correct
    if (selectedIndex === currentQ.correct) {
        playerScore++;
        scoreDisplay.textContent = playerScore;
    }
    
    // Show feedback
    feedbackText.textContent = currentQ.explanation;
    feedbackBox.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
}

// Handle Time Expired
function handleTimeExpired() {
    stopCountdown();
    
    const allOptions = optionsContainer.querySelectorAll('.option');
    allOptions.forEach(opt => opt.classList.add('disabled'));
    
    // Highlight correct answer
    const currentQ = quizQuestions[currentQuestionIndex];
    allOptions[currentQ.correct].classList.add('correct');
    allOptions[currentQ.correct].innerHTML += '<svg class="option-icon icon-correct" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>';
    
    // Show feedback
    feedbackText.textContent = currentQ.explanation;
    feedbackBox.classList.remove('hidden');
    timeoutBox.classList.remove('hidden');
}

// Move to Next Question
function moveToNextQuestion() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        displayResults();
    }
}

// Display Results
function displayResults() {
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    
    const percentageScore = (playerScore / quizQuestions.length) * 100;
    let emoji, title;
    
    if (percentageScore === 100) {
        emoji = '🏆';
        title = 'PERFECT SCORE!';
    } else if (percentageScore >= 80) {
        emoji = '🎉';
        title = 'EXCELLENT!';
    } else if (percentageScore >= 60) {
        emoji = '👍';
        title = 'GOOD JOB!';
    } else if (percentageScore >= 40) {
        emoji = '💪';
        title = 'KEEP TRYING!';
    } else {
        emoji = '📚';
        title = 'PRACTICE MORE!';
    }
    
    resultEmoji.textContent = emoji;
    resultTitle.textContent = title;
    resultScore.textContent = playerScore + '/' + quizQuestions.length;
    resultPercentage.textContent = 'You scored ' + Math.round(percentageScore) + '%';
}

// Restart Quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    playerScore = 0;
    scoreDisplay.textContent = '0';
    
    resultsScreen.classList.remove('active');
    startScreen.classList.add('active');
}

// Event Listeners
subscribeLink.addEventListener('click', handleSubscribeClick);
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', moveToNextQuestion);
timeoutBtn.addEventListener('click', moveToNextQuestion);
restartBtn.addEventListener('click', restartQuiz);

// Initialize on load
initializeQuiz();
