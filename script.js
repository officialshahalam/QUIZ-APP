const questions=[
    {
        question:"Which is largest animal in the world?",
        answers:[
            {text:"shark",correct:false},
            {text:"Blue Whale",correct:true},
            {text:"Elephent",correct:false},
            {text:"Giraffe",correct:false},
        ]
    },
    {
        question:"Which is the smallest country in the world?",
        answers:[
            {text:"vatican city",correct:true},
            {text:"bhutan",correct:false},
            {text:"nepal",correct:false},
            {text:"shri lanka",correct:false},
        ]
    },
    {
        question:"Which is largest desert in the world?",
        answers:[
            {text:"kalahari",correct:false},
            {text:"Gobi",correct:false},
            {text:"sahara",correct:false},
            {text:"Antarctica",correct:true},
        ]
    },
    {
        question:"Which is smallest continent in the world?",
        answers:[
            {text:"asia",correct:false},
            {text:"arctic",correct:false},
            {text:"australia",correct:true},
            {text:"africa",correct:false},
        ]
    },
];

const questionElememt=document.getElementById("question");
const answerbtns=document.getElementById("answer-button");
const nextbtn=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextbtn.innerHTML="next button";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNumber=currentQuestionIndex+1;
    questionElememt.innerHTML=questionNumber+"."+currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const btn=document.createElement("button");
        btn.innerHTML=answer.text;
        btn.classList.add("btn");
        answerbtns.appendChild(btn);
        if(answer.correct){
            btn.dataset.correct=answer.correct;       //correct option me true dalrahe hai....
        }
        btn.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextbtn.style.display="none";
    while(answerbtns.firstChild){
        answerbtns.removeChild(answerbtns.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=e.target.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerbtns.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled="true";
    })
    nextbtn.style.display="block";
}

function showScore(){
    resetState();
    questionElememt.innerHTML=`you score ${score} out of ${questions.length}`;
    nextbtn.innerHTML="Play Again";
    nextbtn.style.display="block";
}

function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextbtn.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextBtn();
    }
    else{
        startQuiz();
    }
})

startQuiz();
