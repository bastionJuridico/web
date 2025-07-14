// Importación estática de los datos de los quizzes
import { privado, minero } from './quizData.js';

const quizForm = document.getElementById('quizForm');
const themeSelect = document.getElementById('themeSelect');

let allQuestions = [];
let quizGroups = [];

// Mapeo de temas a los datos importados
const quizDataMap = {
  privado,
  minero
};

function loadQuizData(theme) {
  if (!quizDataMap[theme]) {
    quizForm.innerHTML = `<p>Tema no encontrado</p>`;
    return;
  }

  quizGroups = quizDataMap[theme];
  allQuestions = quizGroups.flatMap(group => group.questions);

  buildQuiz();
}

function buildQuiz() {
  const output = [];
  let questionCount = 0;

  quizGroups.forEach((group) => {
    output.push(
      `<details>
        <summary>${group.title}</summary>`
    );

    group.questions.forEach((currentQuestion) => {
      const answers = [];
      for (const letter in currentQuestion.answers) {
        answers.push(
          `<label>
            <input type="radio" name="question${questionCount}" value="${letter}" />
            ${letter}) ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      output.push(
        `<div class="question" data-question-index="${questionCount}">
          <h4>${currentQuestion.question}</h4>
          <div class="options">${answers.join('')}</div>
          <div class="feedback" id="feedback-question${questionCount}"></div>
        </div>`
      );

      questionCount++;
    });

    output.push(`</details>`);
  });

  quizForm.innerHTML = output.join('');
}

function handleAnswerSelection(event) {
  if (event.target.matches('input[type="radio"]')) {
    const input = event.target;
    const questionIndex = parseInt(input.name.replace('question', ''));
    const selectedValue = input.value;
    const feedbackDiv = document.getElementById(`feedback-question${questionIndex}`);
    const currentQuestion = allQuestions[questionIndex];
    const correctAnswer = currentQuestion.correctAnswer;
    const explanation = currentQuestion.explanation;

    if (selectedValue === correctAnswer) {
      feedbackDiv.innerHTML = `<div class="correct"><p>Respuesta correcta.</p></div>`;
    } else {
      feedbackDiv.innerHTML = `<div class="incorrect">
       <p>Respuesta incorrecta.</p>
       <p>Respuesta correcta: <strong>${correctAnswer}) ${currentQuestion.answers[correctAnswer]}</strong>.</p>
        <p class="explanation">${explanation}</p>
      </div>`;
    }
  }
}

// Evento para detectar cambio de temática
themeSelect.addEventListener('change', () => {
  loadQuizData(themeSelect.value);
});

// Evento para detectar selección de respuestas
quizForm.addEventListener('change', handleAnswerSelection);

// Cargar la temática por defecto al inicio
loadQuizData(themeSelect.value);
