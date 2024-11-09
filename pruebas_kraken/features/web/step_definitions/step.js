const { Given, When, Then } = require("@cucumber/cucumber");
const fs = require("fs");
const csv = require("csv-parser");
const LoginPage = require("../features/login/page-object/login-page");
const PostPage = require("../features/post/page-object/post-page");
const properties = require("../../../properties.json");  // Adjust the path as needed
const assert = require("assert");

const data = [];
let currentData = {};
// Feature 1 - Escenario de pruebas 1 - login con usuario y password valido
// Step to open the Ghost login page using the URL from properties.json
Given("I open the Ghost login page", async function () {
  await LoginPage.open(this.driver);  // Pass driver as a parameter
});

// Load data from CSV and store it in currentData
Given("I have data from {string}", async function (csvFilePath) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (row) => {
        data.push(row);
      })
      .on("end", () => {
        currentData = data[0];  // Use the first row for now
        resolve();
      })
      .on("error", (error) => {
        reject(error);
      });
  });
});

// Enter the login email from the CSV data
When("I enter login email CSV {string}", async function (emailField) {
  await LoginPage.emailInput(this.driver).setValue(properties[emailField]);  // Pass driver as a parameter
});

// Enter the login password from the CSV data
When("I enter login password CSV {string}", async function (passwordField) {
  await LoginPage.passwordInput(this.driver).setValue(properties[passwordField]);  // Pass driver as a parameter
});

// Submit the login form
When("I submit login", async function () {
  await LoginPage.submitButton(this.driver).click();  // Pass driver as a parameter
});

// Verify that the nav-bar with functions is displayed after login
Then("I should have a nav-bar with functions", async function () {
  await LoginPage.isNavBarDisplayed(this.driver);  // Pass driver as a parameter
});

// verify that errors is shown on login screen when user and pasword is incorrect
Then("I should have a error message present", async function(){
  await LoginPage.isErrorShowForInvalidLogin(this.driver);
});

// Post creation steps (in postSteps.js)
Given("I navigate to the posts page", async function () {
  await PostPage.open(this.driver);
});

When("I create a new post with random title {string} and description {string}", async function (title, description) {
  await PostPage.createNewPost(this.driver, title, description);
  this.latestPostTitle = title;  // Store title for later verification
});

Then("I should see the new post in the post list with the name {string}", async function (name_post) {
  await PostPage.verifyPostInList(this.driver, name_post);
});