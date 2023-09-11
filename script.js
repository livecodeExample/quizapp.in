// defining all the variables
const startWapper = document.querySelector(".start");
const rulesWapper = document.querySelector(".rules");
const quesWapper = document.querySelector(".quiz-app");
const startBtn = startWapper.querySelector(".button");
const rulesBtn = rulesWapper.querySelector(".button");

const quesNoEle = document.querySelector(".quiz-app .queNo span");
const timerEle = document.querySelector(".quiz-app .timer span");
const quesEle = document.querySelector(".quiz-app section .que");
const allOption = document.querySelectorAll(".quiz-app section .option");
const option1 = document.querySelector(".quiz-app section .option1");
const option2 = document.querySelector(".quiz-app section .option2");
const option3 = document.querySelector(".quiz-app section .option3");
const option4 = document.querySelector(".quiz-app section .option4");
const nextBtnEle = document.querySelector(".quiz-app .button");

// questions and option, also answer for that question for quiz
const questions = [
    {
        "question": "What is the smallest prime number greater than 100?",
        "option1": "101",
        "option2": "103",
        "option3": "107",
        "option4": "109",
        "answer": "option1",
    },
    {
        "question": "What is the capital of Australia?",
        "option1": "Sydney",
        "option2": "Melbourne",
        "option3": "Canberra",
        "option4": "Brisbane",
        "answer": "option3",
    },
    {
        "question": "What is the chemical formula for water?",
        "option1": "H2O",
        "option2": "H2SO4",
        "option3": "NH3",
        "option4": "CO2",
        "answer": "option1",
    },
    {
        "question": "What is the square root of 16?",
        "option1": "4",
        "option2": "8",
        "option3": "12",
        "option4": "16",
        "answer": "option1",
    },
    {
        "question": "What is the name of the largest ocean in the world?",
        "option1": "Pacific Ocean",
        "option2": "Atlantic Ocean",
        "option3": "Indian Ocean",
        "option4": "Arctic Ocean",
        "answer": "option1",
    },
    {
        "question": "What is the name of the longest river in the world?",
        "option1": "Nile River",
        "option2": "Amazon River",
        "option3": "Yangtze River",
        "option4": "Yellow River",
        "answer": "option2",
    },
    {
        "question": "What is the capital of France?",
        "option1": "Paris",
        "option2": "London",
        "option3": "Rome",
        "option4": "Berlin",
        "answer": "option1",
    },
    {
        "question": "What is the name of the largest continent in the world?",
        "option1": "Asia",
        "option2": "Africa",
        "option3": "North America",
        "option4": "South America",
        "answer": "option1",
    },
    {
        "question": "What is the name of the smallest continent in the world?",
        "option1": "Australia",
        "option2": "Europe",
        "option3": "North America",
        "option4": "South America",
        "answer": "option1",
    },
    {
        "question": "What is the name of the highest mountain in the world?",
        "option1": "Mount Everest",
        "option2": "K2",
        "option3": "Kangchenjunga",
        "option4": "Lhotse",
        "answer": "option1",
    },
]

// making next button function
// for start game button 
startBtn.addEventListener("click", () => {
    startWapper.classList.add("hide");
    rulesWapper.classList.add("show");
})

// for next button in rules box 
rulesBtn.addEventListener("click", () => {
    rulesWapper.classList.remove("show");
    quesWapper.classList.add("show");
    loadData();
})

// defining all variable 
let timer = 15, quesNo = 0, correctAns = 0, wrongAns = 0;
let correctIcon = `<i class="fa-regular fa-circle-check"></i>`; // icon html code for font awesome
let wrongIcon = `<i class="fa-regular fa-circle-xmark"></i>`;   // icon html code for font awesome
let interval; // this is a time interval for each question

// start time function for each question
function startTimer() {
    timer = 15;
    timerEle.innerHTML = timer;
    interval = setInterval(function () {
        if (timer == 0) {
            timerEle.innerHTML = "00";
            clearInterval(interval);
            allOption.forEach (i => {
                i.style.pointerEvents = "none";
            })
            alert("Time for this question get over...click on next que")
        }
        if (timer < 10) timerEle.innerHTML = "0" + timer;
        else timerEle.innerHTML = timer;
        timer--;
    }, 1000)
}


// if user click to any option than this function will run and mark that option 
function checkOption(element) {
    if (element.classList.contains(questions[quesNo - 1].answer)) {
        allOption.forEach(i => {i.style.pointerEvents = "none";})
        clearInterval(interval);
        element.classList.add("correct");
        element.innerHTML = element.innerHTML + correctIcon;
        correctAns++;
    }else {
        allOption.forEach(i => {i.style.pointerEvents = "none";})
        clearInterval(interval);
        element.classList.add("wrong");
        element.innerHTML = element.innerHTML + wrongIcon;
        document.querySelector(`.${questions[quesNo - 1].answer}`).classList.add("correct");
        document.querySelector(`.${questions[quesNo - 1].answer}`).innerHTML = document.querySelector(`.${questions[quesNo - 1].answer}`).innerHTML + correctIcon;
        wrongAns++;
        allOption.forEach (i => {
            i.style.pointerEvents = "none";
        })
    }
}

// this function if for loading question and option
function loadData() {
    if (quesNo+1 == questions.length) {
        nextBtnEle.innerHTML = "Show Result";
        nextBtnEle.addEventListener("click", () => {
            showResult();
        })
    }
    if (quesNo == questions.length) return;
    quesNo++;

    quesNoEle.innerHTML = quesNo;
    startTimer();

    let array = questions[quesNo - 1]
    quesEle.innerHTML = array.question;
    option1.innerHTML = array.option1;
    option2.innerHTML = array.option2;
    option3.innerHTML = array.option3;
    option4.innerHTML = array.option4;

    allOption.forEach(i => {
        i.style.pointerEvents = "auto";
        if (i.classList.contains("correct")) i.classList.remove("correct");
        if (i.classList.contains("wrong")) i.classList.remove("wrong");
    })

}

// this is a next button function for loading next question
nextBtnEle.addEventListener("click", () => {
    let optionClick = false;
    console.log(timer);
    allOption.forEach(i => {if (i.classList.contains("correct")) {optionClick = true;}})
    if (optionClick || timer <= 0) {clearInterval(interval); loadData();}
    else {alert("Please click atleast one option to move further"); return;}
})

// this is a to all 4 option so that is any one click to option than it will call checkOption function for that option only
// this you can do also by for each loop on all option
option1.addEventListener("click", () => {
    checkOption(option1)
})
option2.addEventListener("click", () => {
    checkOption(option2)
})
option3.addEventListener("click", () => {
    checkOption(option3)
})
option4.addEventListener("click", () => {
    checkOption(option4)
})

// this is a function which show result for the whole quiz...
function showResult() {
    if (quesNo != questions.length) return;
    quesWapper.classList.remove("show")
    document.querySelector(".result").classList.add("show")
    document.querySelector(".result .correct").innerHTML = correctAns;
    document.querySelector(".result .total").innerHTML = questions.length;
}

// now let us see result