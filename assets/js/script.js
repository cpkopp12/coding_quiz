// parent.empty() removes child elements from parent
var mainEls = document.querySelector("#main-els");
var mainTitle = document.querySelector("#question");
var timerEl = document.querySelector("#timer");
var qcount = 0;
var qsCorrect = 0;
var qsIncorrect = 0;
var rightWrong = document.createElement("p");
var timerCount = 60;
console.log(timerEl);

var q1 = {
    question : "Question 1",
    choiceA : "choice a",
    choiceB : "choice b",
    choiceC : "choice c",
    choiceD : "choice d",
    answer : "choice_b"
}
var q2 = {
    question : "Question 2",
    choiceA : "choice a2",
    choiceB : "choice b2",
    choiceC : "choice c2",
    choiceD : "choice d2",
    answer : "choice_a"
}

var q3 = {
    question : "Question 3",
    choiceA : "choice a3",
    choiceB : "choice b3",
    choiceC : "choice c3",
    choiceD : "choice d3",
    answer : "choice_b"
}

var q4 = {
    question : "Question 4",
    choiceA : "choice a4",
    choiceB : "choice b4",
    choiceC : "choice c4",
    choiceD : "choice d4",
    answer : "choice_a"
}

var qsArray = [q1,q2,q3,q4];

// LOAD NEW QUESTION function
var loadNewQuestion = function(qnum) {

    //Load question
    var q = qnum.question;
    //Load choice a
    var choice_a =  document.createElement("button");
    choice_a.className = "answer-choice";
    choice_a.setAttribute("id", "choice_a");
    choice_a.textContent = qnum.choiceA;
    //Load choice b
    var choice_b =  document.createElement("button");
    choice_b.className = "answer-choice";
    choice_b.setAttribute("id", "choice_b");
    choice_b.textContent = qnum.choiceB;
    //Load choice c
    var choice_c =  document.createElement("button");
    choice_c.className = "answer-choice";
    choice_c.setAttribute("id", "choice_c");
    choice_c.textContent = qnum.choiceC;
    //Load choice d
    var choice_d =  document.createElement("button");
    choice_d.className = "answer-choice";
    choice_d.setAttribute("id", "choice_d");
    choice_d.textContent = qnum.choiceD;

    return [q, choice_a, choice_b, choice_c, choice_d];
   
};

var setTimer = function() {
    timerEl.innerHTML = "time: " + timerCount.toString();
    timerCount--;
};

// START BUTTON HANDLER function
var choiceHandler = function(event) {
    var qAndChoices = loadNewQuestion(qsArray[qcount]);
    var qchoice = event.target.getAttribute("id");
    //because of the way I set the function up, answers check index [qcount-1]
    if (qcount !== 0) {
        if (qchoice == qsArray[qcount-1].answer) {
            qsCorrect++;
            console.log("correct ");
            console.log(qsCorrect);
            rightWrong.textContent = "Correct!";
        } else {
            qsIncorrect++;
            console.log("incorrect ");
            console.log(qsIncorrect);
            rightWrong.textContent = "Incorrect!";
            timerCount -= 10;
        }
    } else {
        setInterval(setTimer,1000);
    }
    mainTitle.textContent = qAndChoices[0];
    mainEls.replaceChildren(qAndChoices[1],qAndChoices[2],qAndChoices[3],qAndChoices[4],rightWrong);
    
    qcount ++;
};

mainEls.addEventListener("click", choiceHandler);