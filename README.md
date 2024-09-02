# React Trivia Question App Lab

## Trivia Questions App

In this lab you're given starter code for a trivia question app. The app currently displays a question and multiple choice answers. When the user clicks on an answer they will be informed if the answer was correct or wrong.

At the moment the app only shows one question and there is no way to get more questions

We would like it to work as it does in this solution: https://cunytechprep.github.io/lab-react-trivia-solution/

### Tasks

- [ ] Add an event handler for the `Next Question` button
- [ ] Fetch a new question for the app when the user clicks the `Next Question` button
  - use this API URL: `https://opentdb.com/api.php?amount=1&category=9&type=multiple`
  - the API will return a random question with each call

> [!CAUTION]
> The Open Trivia Database API now enforces a **rate limit** of 5 seconds per request. If you make more than 1 request per 5 seconds you will receive a `429 Too Many Requests` response status code from the API.

### To submit

- Make a fork of this repository
- Clone your own fork
- Solve the lab
  - to get started run `npm install` once to install the packages
  - to start the react app install `npm run dev`
- Commit and push your code to your forked repository
- Make a pull request back to this repository
  - Mention your Instructor and TA's names in your pull request message

---

## Credit

[The Open Trivia Database](https://opentdb.com/)
