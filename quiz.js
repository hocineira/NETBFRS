// ==================== QUIZ MANAGEMENT SYSTEM ====================

class QuizManager {
    constructor() {
        this.currentCategory = 'ccna';
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.answers = [];
        this.questions = [];
        
        this.initializeElements();
        this.initializeEventListeners();
        this.loadCategory(this.currentCategory);
    }
    
    initializeElements() {
        // Category buttons
        this.categoryButtons = document.querySelectorAll('.quiz-category-btn');
        
        // Screens
        this.welcomeScreen = document.getElementById('quizWelcome');
        this.questionsScreen = document.getElementById('quizQuestions');
        this.resultsScreen = document.getElementById('quizResults');
        
        // Quiz elements
        this.progressFill = document.getElementById('progressFill');
        this.progressText = document.getElementById('progressText');
        this.currentScoreEl = document.getElementById('currentScore');
        this.questionText = document.getElementById('questionText');
        this.answersList = document.getElementById('answersList');
        
        // Buttons
        this.startQuizBtn = document.getElementById('startQuizBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.retryQuizBtn = document.getElementById('retryQuizBtn');
        this.changeQuizBtn = document.getElementById('changeQuizBtn');
        
        // Results elements
        this.resultsIcon = document.getElementById('resultsIcon');
        this.finalScore = document.getElementById('finalScore');
        this.scorePercentage = document.getElementById('scorePercentage');
        this.scoreMessage = document.getElementById('scoreMessage');
        this.resultsDetails = document.getElementById('resultsDetails');
    }
    
    initializeEventListeners() {
        // Category selection
        this.categoryButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.selectCategory(category);
            });
        });
        
        // Start quiz
        this.startQuizBtn.addEventListener('click', () => this.startQuiz());
        
        // Navigation
        this.prevBtn.addEventListener('click', () => this.previousQuestion());
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        
        // Results actions
        this.retryQuizBtn.addEventListener('click', () => this.retryQuiz());
        this.changeQuizBtn.addEventListener('click', () => this.changeQuiz());
    }
    
    selectCategory(category) {
        this.currentCategory = category;
        this.loadCategory(category);
        
        // Update active button
        this.categoryButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            }
        });
        
        // Update start button text
        const categoryNames = {
            ccna: 'CCNA',
            ccnp: 'CCNP',
            security: 'Cybersécurité',
            linux: 'Linux'
        };
        this.startQuizBtn.textContent = `Commencer le Quiz ${categoryNames[category]}`;
    }
    
    loadCategory(category) {
        if (quizData[category]) {
            this.questions = [...quizData[category]];
            this.shuffleQuestions();
        }
    }
    
    shuffleQuestions() {
        // Mélanger les questions
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }
    
    startQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.answers = new Array(this.questions.length).fill(null);
        
        this.showScreen('questions');
        this.displayQuestion();
    }
    
    showScreen(screen) {
        this.welcomeScreen.classList.remove('active');
        this.questionsScreen.classList.remove('active');
        this.resultsScreen.classList.remove('active');
        
        switch(screen) {
            case 'welcome':
                this.welcomeScreen.classList.add('active');
                break;
            case 'questions':
                this.questionsScreen.classList.add('active');
                break;
            case 'results':
                this.resultsScreen.classList.add('active');
                break;
        }
    }
    
    displayQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        
        // Update progress
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        this.progressFill.style.width = `${progress}%`;
        this.progressText.textContent = `Question ${this.currentQuestionIndex + 1}/${this.questions.length}`;
        this.currentScoreEl.textContent = `Score: ${this.score}`;
        
        // Display question
        this.questionText.textContent = question.question;
        
        // Display answers
        this.answersList.innerHTML = '';
        question.answers.forEach((answer, index) => {
            const answerDiv = document.createElement('div');
            answerDiv.className = 'answer-option';
            
            if (this.answers[this.currentQuestionIndex] === index) {
                answerDiv.classList.add('selected');
            }
            
            answerDiv.innerHTML = `
                <div class="answer-letter">${String.fromCharCode(65 + index)}</div>
                <div class="answer-text">${answer}</div>
            `;
            
            answerDiv.addEventListener('click', () => this.selectAnswer(index));
            this.answersList.appendChild(answerDiv);
        });
        
        // Update navigation buttons
        this.prevBtn.disabled = this.currentQuestionIndex === 0;
        this.updateNextButton();
    }
    
    selectAnswer(answerIndex) {
        this.answers[this.currentQuestionIndex] = answerIndex;
        
        // Update visual selection
        const options = this.answersList.querySelectorAll('.answer-option');
        options.forEach((option, index) => {
            option.classList.remove('selected');
            if (index === answerIndex) {
                option.classList.add('selected');
            }
        });
        
        this.updateNextButton();
    }
    
    updateNextButton() {
        const hasAnswer = this.answers[this.currentQuestionIndex] !== null;
        this.nextBtn.disabled = !hasAnswer;
        
        // Change button text on last question
        if (this.currentQuestionIndex === this.questions.length - 1) {
            this.nextBtn.textContent = 'Terminer';
        } else {
            this.nextBtn.textContent = 'Suivant';
        }
    }
    
    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
        }
    }
    
    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
        } else {
            this.finishQuiz();
        }
    }
    
    calculateScore() {
        this.score = 0;
        this.answers.forEach((answer, index) => {
            if (answer === this.questions[index].correct) {
                this.score++;
            }
        });
    }
    
    finishQuiz() {
        this.calculateScore();
        this.showResults();
    }
    
    showResults() {
        this.showScreen('results');
        
        const percentage = Math.round((this.score / this.questions.length) * 100);
        
        // Update score display
        this.finalScore.textContent = `${this.score}/${this.questions.length}`;
        this.scorePercentage.textContent = `${percentage}%`;
        
        // Determine score level
        let level;
        if (percentage >= 90) {
            level = 'excellent';
            this.resultsIcon.className = 'results-icon excellent';
            this.resultsIcon.innerHTML = '<i class="fas fa-trophy"></i>';
        } else if (percentage >= 70) {
            level = 'good';
            this.resultsIcon.className = 'results-icon good';
            this.resultsIcon.innerHTML = '<i class="fas fa-medal"></i>';
        } else if (percentage >= 50) {
            level = 'average';
            this.resultsIcon.className = 'results-icon average';
            this.resultsIcon.innerHTML = '<i class="fas fa-star"></i>';
        } else {
            level = 'poor';
            this.resultsIcon.className = 'results-icon poor';
            this.resultsIcon.innerHTML = '<i class="fas fa-redo"></i>';
        }
        
        // Random message for the level
        const messages = scoreMessages[level];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        this.scoreMessage.textContent = randomMessage;
        
        // Display detailed results
        const correct = this.score;
        const incorrect = this.questions.length - this.score;
        
        this.resultsDetails.innerHTML = `
            <div class="result-detail">
                <i class="fas fa-check-circle correct"></i>
                <span class="number">${correct}</span>
                <span class="label">Correctes</span>
            </div>
            <div class="result-detail">
                <i class="fas fa-times-circle incorrect"></i>
                <span class="number">${incorrect}</span>
                <span class="label">Incorrectes</span>
            </div>
            <div class="result-detail">
                <i class="fas fa-percentage" style="color: var(--primary-color)"></i>
                <span class="number">${percentage}%</span>
                <span class="label">Réussite</span>
            </div>
        `;
        
        // Scroll to results
        this.resultsScreen.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    retryQuiz() {
        this.shuffleQuestions();
        this.startQuiz();
    }
    
    changeQuiz() {
        this.showScreen('welcome');
        // Scroll to quiz section
        document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize quiz when DOM is loaded
let quizManager;

document.addEventListener('DOMContentLoaded', () => {
    // Check if quiz section exists
    if (document.getElementById('quizContainer')) {
        quizManager = new QuizManager();
        console.log('Quiz system initialized');
    }
});

// Animation pour les catégories
document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.quiz-category-btn');
    
    categoryButtons.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            btn.style.transition = 'all 0.5s ease';
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
