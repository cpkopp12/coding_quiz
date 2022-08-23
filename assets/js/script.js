// I TOOK THE QUESTIONS FROM THE FOLLOWING LINK: https://www.sanfoundry.com/1000-javascript-questions-answers/
// THE INTERVIEW PREPERATION SECTION OF SANFOUNDRY.COM
//********************************************************************************************************** */

// 
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
//high score el
var scoreBtnEl = document.querySelector("#highscores-btn");
// main elements
var mainEls = document.querySelector("#main-els");
var mainTitle = document.querySelector("#question");
// timer element
var timerEl = document.querySelector("#timer");
// correct incorrect display element
var rightWrong = document.createElement("p");
//index for questions array
var qcount = 0;
//score counters
var qsCorrect = 0;
var qsIncorrect = 0;
var tScore;
// timer counter
var timerCount = 60;
// timer set interval 
var timerInt;
//high score form
var scoreForm = document.createElement("form");
scoreForm.setAttribute("id","score-form");
// submit score button
var scoreSubmit = document.createElement("button");
scoreSubmit.className = "answer-choice";
scoreSubmit.setAttribute("id","score-submit-btn");
scoreSubmit.setAttribute("type","submit");
scoreSubmit.textContent = "Submit";
// high score input
var scoreInput = document.createElement("input");
scoreInput.setAttribute("type","text");
scoreInput.setAttribute("name","score-input");
scoreInput.setAttribute("placeholder","Enter your initials.");
//Append to form element
scoreForm.appendChild(scoreInput);
scoreForm.appendChild(scoreSubmit);
// Allscores array
var allScores=[];


var qsArray = [q1,q2,q3,q4];


//LOAD HIGH SCORES, going to use same function for both ways of accessing 
//(from submitting score form and clicking highscore button)
//scoreSubmitted already loaded current score to local storage, so it doesn't matter which
var loadHighScores = function(){
    //re-setup event listener on main-els incase coming from score submit form
    mainEls.addEventListener("click", choiceHandler);

    //Create highscore pages GO BACK and CLEAR HIGH SCORE buttons
    var goBackBtn = document.createElement("button");
    goBackBtn.setAttribute("class","answer-choice");
    goBackBtn.setAttribute("id","go-back-btn");
    goBackBtn.textContent = "Go Back";
    var clearScoresBtn = document.createElement("button");
    clearScoresBtn.setAttribute("class","answer-choice");
    clearScoresBtn.setAttribute("id","clear-scores-btn");
    clearScoresBtn.textContent = "Clear High Scores";

    allScores = localStorage.getItem("scores");
    if (allScores === null) {
        mainTitle.textContent = "No highscores yet!";
        mainEls.replaceChildren(goBackBtn,clearScoresBtn); 
        return false;
    } 
    allScores = JSON.parse(allScores);
    //Create list of previous scores, ul = scoreList, li = listLoopEl then scoreListEl[i], same index as allScores
    var scoreList = document.createElement("ul");
    scoreList.setAttribute("class","scores-ul");
    var scoreListEls = [];
    
    //Theres no way that I had to split this up like this, couldn't find another way that worked
    for (let i = 0; i < allScores.length;i++) {
        scoreListEls[i] = document.createElement("li");
        scoreListEls[i].setAttribute("class","highscore-list-el");
        scoreListEls[i].innerHTML = allScores[i].initial + ": " + allScores[i].quizScore; 
        scoreList.appendChild(scoreListEls[i]);
    }

    mainTitle.textContent = "High Scores";
    mainEls.replaceChildren(scoreList,goBackBtn,clearScoresBtn);
};

//push current score to all scores array
//mock up shows highscores pops up after submit, so call loadHighScores
var scoreSubmitted = function(event) {
    
    event.preventDefault();
    //need to do this so that local storage isn't over written with only one score
    allScores = localStorage.getItem("scores");
    if (allScores === null) {
        allScores = [];
    } else {
        allScores = JSON.parse(allScores);
    }

    var storeScore = {
        initial : scoreInput.value,
        quizScore : tScore
    }
    allScores.push(storeScore);
    localStorage.setItem("scores",JSON.stringify(allScores));
    loadHighScores();
};

//Set up form, when submitted call submit highscore 
var loadScoreForm = function() {
    mainTitle.textContent = "All Done!";
    var textEl = document.createElement("p");
    tScore = (qsCorrect/(qsCorrect+qsIncorrect))*100;
    textEl.innerHTML = "your score is " + tScore.toString()+" %";
    mainEls.replaceChildren(textEl,scoreForm);
    scoreForm.addEventListener("submit",scoreSubmitted);
};

//SET TIMER, count-- every second, 
//IF <= clear interval, remove click listener, and load the score form
var setTimer = function() {
    timerEl.innerHTML = "time: " + timerCount.toString();
    timerCount--;
    if (timerCount <= 0) {
        timerEl.innerHTML = "time: 0";
        clearInterval(timerInt);
        mainEls.removeEventListener("click",choiceHandler);
        loadScoreForm();  
    }
};

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

// CHOICE HANDLER function, calls loadNewQuestion() and setTimer() functions
var choiceHandler = function(event) {
    //Three specific targets have to be treated totally differently, one is a form and not in this function
    //Other two = goBackButton and clearScoresBtn, use if(goBack){} else if (clearScores){} else {EVERYTHING ELSE}
    if (event.target.getAttribute("id")==="go-back-btn") {
        mainTitle.textContent = "Start Quiz";
        var quizInstructions = document.createElement("p");
        quizInstructions.textContent = "Instructions for starting quiz";
        var startButton = document.createElement("button");
        startButton.setAttribute("class","answer-choice");
        startButton.setAttribute("id","start-btn");
        startButton.textContent = "Start Quiz";
        mainEls.replaceChildren(quizInstructions,startButton);
    } else if (event.target.getAttribute("id")==="clear-scores-btn") {
        localStorage.removeItem("scores");
        loadHighScores();
    } else {
        //RESET ALL QUIZ VARS IF START BUTTON
        if (event.target.getAttribute("id")==="start-btn") {
            qsCorrect = 0;
            qsIncorrect = 0;
            qcount = 0;
            timerCount=75;
            rightWrong.textContent = "";
        }
        //IF OUT OF QUESTIONS, END QUIZ by setting time to 0
        if(!qsArray[qcount]){
            timerCount = 0;
            return false;
        }
        var qAndChoices = loadNewQuestion(qsArray[qcount]);
        var qchoice = event.target.getAttribute("id");
        //because of the way I set the function up, answers check index [qcount-1]
        if (qcount !== 0) {
            if (qchoice == qsArray[qcount-1].answer) {
                qsCorrect++;
                rightWrong.textContent = "Correct!";
            } else {
                qsIncorrect++;
                rightWrong.textContent = "Incorrect!";
                timerCount -= 15;
            }
        } else {
            timerInt = setInterval(setTimer,1000);

        }
        mainTitle.textContent = qAndChoices[0];
        mainEls.replaceChildren(qAndChoices[1],qAndChoices[2],qAndChoices[3],qAndChoices[4],rightWrong);
    
        qcount ++;
    }
};




mainEls.addEventListener("click", choiceHandler);

scoreBtnEl.addEventListener("click",loadHighScores);