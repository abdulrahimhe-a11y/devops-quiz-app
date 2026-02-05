# DevOps Quiz Web Application

A static web application for testing DevOps knowledge through interactive quizzes. Built with HTML, CSS, and JavaScript.

## Features

- Loads quiz questions from a JSON file
- Select from multiple DevOps topics
- One question displayed at a time
- Immediate feedback with explanations
- No backend required - fully static
- Interactive quiz interface
- Multiple choice questions


## Project Structure
devops-quiz-app/
├── index.html # Main application page
├── style.css # Styling for the quiz interface
├── script.js # Quiz logic and interactivity
├── questions.json # Question bank (JSON format)
└── README.md # This file

text

## Question Format

The quiz questions are stored in `questions.json` as an array of question objects. Each question must follow this exact structure:

### **JSON Schema:**
```json
{
  "id": "Q1",
  "topic": "Continuous Integration",
  "question": "What is the primary goal of Continuous Integration?",
  "options": [
    "Automatically deploy to production",
    "Frequently integrate code changes into a shared repository",
    "Eliminate the need for testing",
    "Remove the need for branches"
  ],
  "answerIndex": 1,
  "explanation": "Continuous Integration aims to detect integration issues early by merging changes frequently into a shared branch."
}