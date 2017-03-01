'use strict';

/***********************
 * NPM PACKAGES
 **********************/
var inquirer = require('inquirer');
var fs = require('fs');
var Basic = require("./basicflashcard");
var Cloze = require("./clozeflashcard");



/***********************
 * App Variables in use
 **********************/
var p1 = process.argv[2];
var questions = [];
var clozeQuestions = [];



/***********************
 * Beginning of App
 **********************/
function createFlash() {

    console.log('Please input command either "Basic" or "Cloze" to select the type of flash card you would like to save.');

     if (p1.toLowerCase() === "basic") {
   
        console.log('You chose to make a Basic flashcard!');

        // Creating user prompts to create flash cards
        inquirer.prompt([
         {   
        type: "input",
        name: "front",
        message: "What is the front of the card?"
         }, {
        type: "input",
        name: "back",
        message: "What is the back of the card?"
         }]).then((user) => {
            cardList.newBasic.front = user.front;
            cardList.newBasic.back = user.back;
            cardList.newBasic.front = user.front;
            cardList.newBasic.newCard();
            createBasic2();
        });
    }
    
    // // handle the first response input from the user
    // var handleQuestionResponse = function(answers) {
    //     var newQuestion = new Basic(answers.question, answers.answer);
    //     newQuestion.printInfo();
    //     var newQuestionJSON = JSON.stringify(newQuestion);
    //     questions.push(newQuestionJSON);
    //     fs.appendFile('basicflashcard.txt', newQuestionJSON + "\n");

    //     // Checks to see if user wanted to input more than one flash card at a time
    //     return inquirer.prompt([{
    //         name: "another",
    //         message: "add another?",
    //         type: "confirm",
    //         default: true
    //     }]);
    // };

    // handler for multiple repsonses from user
    // var handleAnotherResponse = function(cont) {
    //     if (cont.another) {
    //         promptForQuestion();
    //     } else {
    //         console.log("Number of Flashcards added to database: " + questions.length + ".");
    //     }
    // };

    // error checker and response given

 else if (p1.toLowerCase() === "cloze") {

    // Creating user prompts to creat flash cards
    inquirer.prompt([
    {    
        type: "input",
        name: "part1",
        message: "What text do you want before the Cloze?"
    }, {
        type: "input",
        name: "cloze",
        message: "What text do you want hidden? (cloze)"
    }, {    
        type: "input",
        name: "part2",
        message: "What is the text of the card to finish the question?"
    }]).then((user) => {
            cardList.newCloze.part1 = user.part1;
            cardList.newCloze.cloze = user.cloze;
            cardList.newCloze.part2 = user.part2;
            cardList.newCloze.newCard();
            createCloze2();
        });

        function createCloze2() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "again",
            message: "Do you want to create another card?"
        }
        ]).then((user) => {
            if (user.again === true) {
                createCloze2();
            } else {
                initialPrompt();
            }
        });  
    }    


} else {
    console.log('Please input command either "Basic" or "Cloze" to select the type of flash card you would like to save.');
  };  
}

//Cloze flaschard save function
ClozeFlashcard.prototype.save = function() {
    cardList.savedCloze.push(this);
};
//basic flaschard save function
BasicFlashcard.prototype.save = function() {
    cardList.savedBasic.push(this);
};

//The object that holds new cards and the methods to save new cards.
var cardArray = {
    savedBasic: [],
    savedCloze: [],

    newBasic: {
        front: "",
        back: "",
        newCard: function() {
            var front = this.front;
            var back = this.back;
            var card = new BasicFlashcard(front, back);
            card.save();
            console.log(JSON.stringify(cardArray.savedBasic));
            fs.appendFile("basicCard.txt", JSON.stringify(cardArray.savedBasic[cardArray.savedBasic.length-1])+'\n', "utf8", function(err) {
                if (err) throw err;
                console.log("Saved to our library!");
            });
        }
    },

newCloze: {
        front: "",
        back: "",
        cloze: "",
        newCard2: function() {
            var front = this.front;
            var back = this.back;
            var cloze = this.cloze;
            var card = new ClozeFlashcard(front, cloze, back);
            card.save();
            console.log(JSON.stringify(cardArray.savedCloze));
            fs.appendFile("clozeCard.txt", JSON.stringify(cardArray.savedCloze[cardArray.savedCloze.length-1])+'\n', "utf8", function(err) {
                if (err) throw err;
                console.log("Saved to our library!");
            });
        }
    },

    // handle the first repsonse input from the user
    // var handleClozeResponse = function(clozeAnswers) {
    //     var newClozeQuestion = new Cloze(clozeAnswers.cloze, clozeAnswers.phrase);
    //     newClozeQuestion.printClozeInfo();
    //     var newClozeQuestionJSON = JSON.stringify(newClozeQuestion);
    //     clozeQuestions.push(newClozeQuestionJSON);
    //     fs.appendFile('clozeflashcard.txt', newClozeQuestionJSON + "\n");

    //     // Checks to see if user wanted to input more than one flash card at a time
    //     return inquirer.prompt([{
    //         name: "anotherCloze",
    //         message: "Add another Cloze Card?",
    //         type: "confirm",
    //         default: true
    //     }]);
    // };

    // handler for multiple repsonses from user
    // var handleAnotherClozeResponse = function(cont2) {
    //     if (cont2.anotherCloze) {
    //         promptForClozeQuestion();
    //     } else {
    //         console.log("Number of Flashcards added to database: " + questions.length + ".");
    //     }
    // };

    // // error checker and response given
    // var handleClozeError = function() {
    //     console.log("There has been an error.");
    // };

    // // compiles all user input
    // var promptForClozeQuestion = function() {
    //     inquirer.prompt(clozeQuestionPrompts)
    //         .then(handleClozeResponse, handleClozeError)
    //         .then(handleAnotherClozeResponse, handleClozeError);
    // };

    // promptForClozeQuestion();