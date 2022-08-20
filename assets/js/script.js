// parent.empty() removes child elements from parent
var mainEls = document.querySelector("#main-els");
var mainTitle = document.querySelector("#question");
var qcount = 0;

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
var qsArray = [q1,q2];

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



// START BUTTON HANDLER function
var choiceHandler = function() {
    var qAndChoices = loadNewQuestion(qsArray[qcount]);
    mainTitle.textContent = qAndChoices[0];
    mainEls.replaceChildren(qAndChoices[1],qAndChoices[2],qAndChoices[3],qAndChoices[4]);
    
    qcount ++;
};

mainEls.addEventListener("click", choiceHandler);