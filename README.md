# aframe-e2e-prototype
This project's goal is to investigate if it's possible to create a library that contains several helper functions that will make it easy to automate tasks in AFrame with Puppeteer, with the goal of being able to create E2E tests.

Please note that I'm completely new to Puppeteer and that this project will likely contain terribly bad practices. Any feedback I can get on how to improve will be extremely appreciated.

For more background information, see: https://twitter.com/rvdleun/status/1202368895073628160

## Instructions
1. Clone this repository
1. Run `npm install`
1. Run `npm run dev` to start a development server, running on `http://localhost:7000`
1. Run `npm run test` to run the tests. (or `./node_modules/.bin/jest --watchAll` if want to trigger the tests on changes)
