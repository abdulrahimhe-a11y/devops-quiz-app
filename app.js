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