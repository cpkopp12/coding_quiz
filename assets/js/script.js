// I TOOK THE QUESTIONS FROM THE FOLLOWING LINK: https://www.sanfoundry.com/1000-javascript-questions-answers/
// THE INTERVIEW PREPERATION SECTION OF SANFOUNDRY.COM
//********************************************************************************************************** */

// 1
var q1 = {
    question : "What is JavaScript?",
    choiceA : "a) JavaScript is a scripting language used to make the website interactive",
    choiceB : "b) JavaScript is an assembly language used to make the website interactive",
    choiceC : "c) JavaScript is a compiled language used to make the website interactive",
    choiceD : "d) None of the mentioned",
    answer : "choice_a"
}
// 2
var q2 = {
    question : "Which of the following is correct about JavaScript?",
    choiceA : "a) JavaScript is an Object-Based language",
    choiceB : "b) JavaScript is Assembly-language",
    choiceC : "c) JavaScript is an Object-Oriented language",
    choiceD : "d) JavaScript is a High-level language",
    answer : "choice_a"
}
//3
var q3 = {
    question : "Among the given statements, which statement defines closures in JavaScript?",
    choiceA : "a) JavaScript is a function that is enclosed with references to its inner function scope",
    choiceB : "b) JavaScript is a function that is enclosed with references to its lexical environment",
    choiceC : "c) JavaScript is a function that is enclosed with the object to its inner function scope",
    choiceD : "d) None of the mentioned",
    answer : "choice_b"
}
//6
var q4 = {
    question : "Arrays in JavaScript are defined by which of the following statements?",
    choiceA : "a) It is an ordered list of values",
    choiceB : "b) It is an ordered list of objects",
    choiceC : "c) It is an ordered list of string",
    choiceD : "d) It is an ordered list of functions",
    answer : "choice_a"
}
//10
var q5 = {
    question : "Which of the following is not javascript data types?",
    choiceA : "a) Null type",
    choiceB : "b) Undefined type",
    choiceC : "c) Number type",
    choiceD : "d) All of the mentioned",
    answer : "choice_d"
}
//11
var q6 = {
    question : "Where is Client-side JavaScript code is embedded within HTML documents?",
    choiceA : "a) A URL that uses the special javascript:code",
    choiceB : "b) A URL that uses the special javascript:protocol",
    choiceC : "c) A URL that uses the special javascript:encoding",
    choiceD : "d) A URL that uses the special javascript:stack",
    answer : "choice_b"
}
//13
var q7 = {
    question : "Which of the following object is the main entry point to all client-side JavaScript features and APIs?",
    choiceA : "a) Position",
    choiceB : "b) Window",
    choiceC : "c) Standard",
    choiceD : "d) Location",
    answer : "choice_b"
}
//16
var q8 = {
    question : "Which of the following can be used to call a JavaScript Code Snippet?",
    choiceA : "a) Function/Method",
    choiceB : "b) Preprocessor",
    choiceC : "c) Triggering Event",
    choiceD : "d) RMI",
    answer : "choice_a"
}
//19
var q9 = {
    question : "Which of the following explains correctly what happens when a JavaScript program is developed on a Unix Machine?",
    choiceA : "a) will work perfectly well on a Windows Machine",
    choiceB : "b) will be displayed as JavaScript text on the browser",
    choiceC : "c) will throw errors and exceptions",
    choiceD : "d) must be restricted to a Unix Machine only",
    answer : "choice_a"
}
//24
var q10 = {
    question : "Which of the following scoping type does JavaScript use?",
    choiceA : "a) Sequential",
    choiceB : "b) Segmental",
    choiceC : "c) Lexical",
    choiceD : "d) Literal",
    answer : "choice_c"
}
//25
var q11 = {
    question : "What is the basic difference between JavaScript and Java?",
    choiceA : "a) Functions are considered as fields",
    choiceB : "b) Functions are values, and there is no hard distinction between methods and fields",
    choiceC : "c) Variables are specific",
    choiceD : "d) There is no difference",
    answer : "choice_b"
}








//******************************************************
//Rest of the code is mine
//****************************************************** 


//high score el
var scoreBtnEl = document.querySelector("#highscores-btn");
// main elements
var mainEls = document.querySelector("#main-els");
var mainTitle = document.querySelector("#question");
// timer element
var timerEl = document.querySelector("#timer");
// correct incorrect display element
var rightWrong = document.createElement("p");
rightWrong.setAttribute("class","right-wrong");
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
scoreForm.setAttribute("class","score-form-div");
// submit score button
var scoreSubmit = document.createElement("button");
scoreSubmit.className = "answer-choice";
scoreSubmit.setAttribute("id","score-submit-btn");
scoreSubmit.setAttribute("type","submit");
scoreSubmit.textContent = "Submit";
scoreSubmit.setAttribute("class", "score-form-btn");
// high score input
var scoreInput = document.createElement("input");
scoreInput.setAttribute("type","text");
scoreInput.setAttribute("name","score-input");
scoreInput.setAttribute("placeholder", "Enter your initials.");
scoreInput.setAttribute("class", "score-text-input");
//Append to form element
scoreForm.appendChild(scoreInput);
scoreForm.appendChild(scoreSubmit);
// Allscores array
var allScores=[];

//ARRAY OF QUESTION, initialized it by hand like this so I could have all the questions 
// at the very top of the file
//IF USER ANSWERS ALL QUESTIONS BEFORE TIME: an alert window will pop up to inform user
// that they answered all of the questions and prompt them to enter their initials in the form
var qsArray = [q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,q11];


//LOAD HIGH SCORES, going to use same function for both ways of accessing 
//(from submitting score form and clicking highscore button)
//scoreSubmitted already loaded current score to local storage, so it doesn't matter which
// just need to check if scores is empty
var loadHighScores = function(){

    //re-setup event listener on main-els incase user coming from score submit form
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
    //check if empty
    if (allScores === null) {
        mainTitle.textContent = "No highscores yet!";
        mainEls.replaceChildren(goBackBtn,clearScoresBtn); 
        return false;
    } 
    allScores = JSON.parse(allScores);

    //Create list of previous scores, ul = scoreList, li = scoreListEl[i], same index as allScores
    var scoreList = document.createElement("ul");
    scoreList.setAttribute("class","scores-ul");
    var scoreListEls = [];
    for (let i = 0; i < allScores.length;i++) {
        scoreListEls[i] = document.createElement("li");
        scoreListEls[i].setAttribute("class","highscore-list-el");
        scoreListEls[i].innerHTML = allScores[i].initial + ": " + allScores[i].quizScore + "%"; 
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
        quizScore : tScore.toFixed(2)
    }
    allScores.push(storeScore);
    localStorage.setItem("scores",JSON.stringify(allScores));
    loadHighScores();
};

//Set up form, when submitted call submit highscore 
var loadScoreForm = function() {
    mainTitle.textContent = "All Done!";
    var textEl = document.createElement("p");
    textEl.setAttribute("class","score-form-text");
    tScore = (qsCorrect/(qsCorrect+qsIncorrect))*100;
    textEl.innerHTML = "your score is " + tScore.toFixed(2)+" %";
    mainEls.replaceChildren(textEl,scoreForm);
    scoreForm.addEventListener("submit",scoreSubmitted);
};

//SET TIMER, count-- every second, 
//IF count <= 0: clear interval, remove click listener, and load the score form
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
    //Three specific targets have to be treated totally differently from the rest of the quiz, 
    //one is a form and not in this function (in loadScoreForm()). Other two = goBackButton and clearScoresBtn,
    //use if(goBack){} else if (clearScores){} else {EVERYTHING ELSE}
    if (event.target.getAttribute("id")==="go-back-btn") {
        //Just recreate the starting page, same ids and classes
        mainTitle.textContent = "Start Quiz";

        var quizInstructions = document.createElement("p");
        quizInstructions.textContent = "You will have 75 seconds to start. For every incorrect answer, 15 seconds will be subtracted from your time remaining.";
        quizInstructions.setAttribute("class", "quiz-instructions");

        var startButton = document.createElement("button");
        startButton.setAttribute("class","answer-choice");
        startButton.setAttribute("id","start-btn");
        startButton.textContent = "Start Quiz";

        mainEls.replaceChildren(quizInstructions,startButton);

    } else if (event.target.getAttribute("id")==="clear-scores-btn") {
        //Remove high scores then call function loadHighScores() to refresh and erase in local storage
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
            window.alert("You answered all of the questions! Enter your initials to submit your score!");
            return false;
        }

        //LOAD NEXT QUESTION
        var qAndChoices = loadNewQuestion(qsArray[qcount]);
        //GET TARGET OF LAST CHOICE
        var qchoice = event.target.getAttribute("id");
        //because of the way I set the function up, answers check index [qcount-1]
        if (qcount !== 0) {
            //IF CHOICE WAS CORRECT
            if (qchoice == qsArray[qcount-1].answer) {
                qsCorrect++;
                rightWrong.textContent = "Correct!";
            } else {
                qsIncorrect++;
                rightWrong.textContent = "Incorrect!";
                timerCount -= 15;
            }
        } else {
            //QUIZ ENDS WHEN SET TIMER HITS 0
            timerInt = setInterval(setTimer,1000);

        }
        mainTitle.textContent = qAndChoices[0];
        mainEls.replaceChildren(qAndChoices[1],qAndChoices[2],qAndChoices[3],qAndChoices[4],rightWrong);
    
        qcount ++;
    }
};




mainEls.addEventListener("click", choiceHandler);

scoreBtnEl.addEventListener("click",loadHighScores);