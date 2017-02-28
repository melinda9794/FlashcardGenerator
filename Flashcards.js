var fs = require("fs");
var inquirer = require("inquirer");
var right = 0;
var wrong = 0;

//Basic flashcard constructor
function BasicFlashcard(front, back) {
        this.front = front;
        this.back = back;
