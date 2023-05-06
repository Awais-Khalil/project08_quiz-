#!/usr/bin/env node
import * as readline from "readline";

type Question = {
  prompt: string;
  options: string[];
  answerIndex: number;
};

class Quiz {
  private questions: Question[];
  private currentQuestionIndex: number;
  private numCorrect: number;

  constructor(questions: Question[]) {
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.numCorrect = 0;
  }

  
  public async run() {
    console.log("Welcome to the quiz!");
    console.log("=====================");
    while (this.currentQuestionIndex < this.questions.length) {
      const currentQuestion = this.questions[this.currentQuestionIndex];
      this.displayQuestion(currentQuestion);
      const answerIndex = await this.getAnswer(currentQuestion);
      if (answerIndex === currentQuestion.answerIndex) {
        console.log("Correct!");
        this.numCorrect++;
      } else {
        console.log("Incorrect!");
      }
      this.currentQuestionIndex++;
    }
    this.displayScore();
  }
  





  private displayQuestion(question: Question) {
    console.log(question.prompt);
    for (let i = 0; i < question.options.length; i++) {
      console.log(`${i + 1}) ${question.options[i]}`);
    }
  }

  private async getAnswer(question: Question): Promise<number> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    while (true) {
      const input = await new Promise<string>((resolve) => {
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

  private displayScore() {
    console.log("=====================");
    console.log(`You answered ${this.numCorrect} out of ${this.questions.length} questions correctly.`);
  }
}

// Example usage
const questions: Question[] = [
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
