let allQuestions = [];
let currentQuestions = [];
let currentQuestionIndex = 0;

// Load questions from JSON
fetch('data/questions.json')
    .then(response => response.json())
    .then(questions => {
        allQuestions = questions;
        populateTopics();
    })
    .catch(error => console.error('Error loading questions:', error));

// Populate topic dropdown
function populateTopics() {
    const topicSelect = document.getElementById('topic-select');
    const topics = [...new Set(allQuestions.map(q => q.topic))];
    
    topics.forEach(topic => {
        const option = document.createElement('option');
        option.value = topic;
        option.textContent = topic;
        topicSelect.appendChild(option);
    });
}

// Start quiz when button clicked
document.getElementById('start-btn').addEventListener('click', startQuiz);

function startQuiz() {
    const selectedTopic = document.getElementById('topic-select').value;
    if (!selectedTopic) {
        alert('Please select a topic first!');
        return;
    }
    
    currentQuestions = allQuestions.filter(q => q.topic === selectedTopic);
    currentQuestionIndex = 0;
    
    document.getElementById('topic-selection').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';
    
    displayQuestion();
}

function displayQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    
    document.getElementById('question-text').textContent = question.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('feedback-section').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';
}

function checkAnswer(selectedIndex) {
    const question = currentQuestions[currentQuestionIndex];
    const feedbackSection = document.getElementById('feedback-section');
    const feedbackMessage = document.getElementById('feedback-message');
    const explanation = document.getElementById('explanation');
    
    // Disable all option buttons
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach(btn => btn.disabled = true);
    
    if (selectedIndex === question.answerIndex) {
        feedbackMessage.textContent = '✓ Correct!';
        feedbackMessage.style.color = 'green';
        optionButtons[selectedIndex].style.backgroundColor = '#d4edda';
    } else {
        feedbackMessage.textContent = '✗ Incorrect';
        feedbackMessage.style.color = 'red';
        optionButtons[selectedIndex].style.backgroundColor = '#f8d7da';
        optionButtons[question.answerIndex].style.backgroundColor = '#d4edda';
    }
    
    explanation.textContent = question.explanation;
    feedbackSection.style.display = 'block';
    
    // Show next button if more questions available
    if (currentQuestionIndex < currentQuestions.length - 1) {
        document.getElementById('next-btn').style.display = 'block';
    }
}

// Next question button
document.getElementById('next-btn').addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        displayQuestion();
    }
});