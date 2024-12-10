const startBtn = document.querySelector('.btn-start');
const popUpSegment = document.querySelector('.pop-up-segment');
const exitBtn = document.querySelector('.exit-btn');
const mainPage = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-section-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goToHome = document.querySelector('.goHome-btn');




// button section 

startBtn.onclick = () => {
    popUpSegment.classList.add('active');
    mainPage.classList.add('active');
};

exitBtn.onclick = () => {
    popUpSegment.classList.remove('active');
    mainPage.classList.remove('active')
};

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popUpSegment.classList.remove('active');
    mainPage.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
};

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');

    questionMove = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionMove);
    questionCounter(questionNumb);

    headerScore();
    
};


goToHome.onclick = () => {
    quizSection.classList.remove('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');

    questionMove = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionMove);
    questionCounter(questionNumb);

   
};



let questionMove = 0;
let questionNumb = 1;
let userScore = 0;



// Next button calls questions when clicked 

const nextBtn = document.querySelector('.footer-next-btn');

nextBtn.onclick = () => {
    if (questionMove < questions.length - 1){
        questionMove++;
        showQuestions(questionMove);

        questionNumb++;
        questionCounter(questionNumb);
    }
    else {
        showResultBox();
    }
}

const optionList = document.querySelector('.option-list');





// Targeting the questions and options from the arrays 

function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    // targeting the options 
    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
                     <div class="option"><span>${questions[index].options[1]}</span></div>
                     <div class="option"><span>${questions[index].options[2]}</span></div>
                     <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll ('.option');
    for(let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick','optionSelected(this)');
    }
}

function optionSelected (answer){
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionMove].answer;
    let allOptions = optionList.children.length;
    
    if (userAnswer == correctAnswer){
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    }
    else{
        answer.classList.add('incorrect');

        // select answer automatically when an option is clicked 
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute('class', 'option correct');
            }
        }
    }


    // disable when an optin is selected
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled')
    } 

}

function questionCounter (index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore (){
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;

}

function showResultBox () {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;
        

        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#ffffff9b ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1)0deg)`;

        if (progressStartValue == progressEndValue){
            clearInterval(progress);
        }
    }, speed);
    
}
