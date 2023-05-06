#!/usr/bin/env node
import * as readline from "readline";
class Quiz {
    questions;
    currentQuestionIndex;
    numCorrect;
    constructor(questions) {
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.numCorrect = 0;
    }
    async run() {
        console.log("Welcome to the quiz!");
        console.log("=====================");
        while (this.currentQuestionIndex < this.questions.length) {
            const currentQuestion = this.questions[this.currentQuestionIndex];
            this.displayQuestion(currentQuestion);
            const answerIndex = await this.getAnswer(currentQuestion);
            if (answerIndex === currentQuestion.answerIndex) {
                console.log("Correct!");
                this.numCorrect++;
            }
            else {
                console.log("Incorrect!");
            }
            this.currentQuestionIndex++;
        }
        this.displayScore();
    }
    displayQuestion(question) {
        console.log(question.prompt);
        for (let i = 0; i < question.options.length; i++) {
            console.log(`${i + 1}) ${question.options[i]}`);
        }
    }
    async getAnswer(question) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        while (true) {
            const input = await new Promise((resolve) => {
                rl.question("Enter your answer: ", resolve);
            });
            const answer = parseInt(input, 10);
            if (!isNaN(answer) && answer >= 1 && answer <= question.options.length) {
                rl.close();
                return answer - 1;
            }
            console.log("Invalid input. Please enter a number between 1 and " + question.options.length);
        }
    }
    displayScore() {
        console.log("=====================");
        console.log(`You answered ${this.numCorrect} out of ${this.questions.length} questions correctly.`);
    }
}
// Example usage
const questions = [
    {
        prompt: "What is the capital of France?",
        options: ["New York", "London", "Paris", "Sydney"],
        answerIndex: 2,
    },
    {
        prompt: "What is the tallest mammal?",
        options: ["Giraffe", "Elephant", "Whale", "Kangaroo"],
        answerIndex: 0,
    },
    {
        prompt: "What is the largest continent?",
        options: ["Asia", "Europe", "Africa", "South America"],
        answerIndex: 0,
    },
];
const quiz = new Quiz(questions);
quiz.run();
