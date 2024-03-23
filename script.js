// CREATE THE QUESTIONS AND ANSWERS

const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "What is the world's most populated country?",
        answers: [
            { text: "Russia", correct: false },
            { text: "USA", correct: false },
            { text: "China", correct: true },
            { text: "India", correct: false },
        ]
    },
    {
        question: "What is the capital of the Philippines?",
        answers: [
            { text: "Dili", correct: false },
            { text: "Jakarta", correct: false },
            { text: "Marawi", correct: false },
            { text: "Manilla", correct: true },
        ]
    },
    {
        question: "What is the World's Smallest Country?",
        answers: [
            { text: "Vatican City", correct: true },
            { text: "Monaco", correct: false },
            { text: "Austria", correct: false },
            { text: "Italy", correct: false },
        ]
    },
    {
        question: "What is the capital of Australia?",
        answers: [
            { text: "Melbourne", correct: false },
            { text: "Sydney", correct: false },
            { text: "Adelaide", correct: false },
            { text: "Canberra", correct: true },
        ]
    },
    {
        question: "Where was the hottest temperature ever recorded?",
        answers: [
            { text: "Mexico", correct: false },
            { text: "Libya", correct: true },
            { text: "Peru", correct: false },
            { text: "India", correct: false },
        ]
    },
    {
        question: "In which ocean is the island of Madagascar?",
        answers: [
            { text: "Indian", correct: true },
            { text: "Atlantic", correct: false },
            { text: "Pacific", correct: false },
            { text: "Artic", correct: false },
        ]
    }
];

// GET THE ELEMENTS

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

// START THE QUIZ APP

function startQuiz(){
    
    currentQuestionIndex = 0;
    score = 0;
    
    nextButton.innerHTML = "Next";
    
    showQuestion();
}

// SHOW QUESTIONS

function showQuestion(){

    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        
        const button = document.createElement("button");
        
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        
        button.addEventListener("click", selectAnswer);
    });
}

// CLEAR THE ANSWER BUTTONS

function resetState(){
    
    nextButton.style.display = "none";
    
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// SELECT THE ANSWER

function selectAnswer(e){
    
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {

        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }

        button.disabled = true;

    });

    nextButton.style.display = "block";
}

// SHOW FINAL SCORE

function showScore(){
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

// NEXT BUTTON BEHAVIOUR

function handleNextButton(){
    
    currentQuestionIndex++;

    if(currentQuestionIndex < questions.length){
        showQuestion();
    }

    else{
        showScore();
    }
}

// NEXT BUTTON BEHAVIOUR WHEN CLICKING

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }

    else{
        startQuiz();
    }
})

startQuiz();