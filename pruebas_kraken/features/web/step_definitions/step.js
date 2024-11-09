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
// Given: The user is on the posts list page
Given("I am on the posts list page", async function () {
  await PostPage.openPostsList(this.driver);
});
// verify that errors is shown on login screen when user and pasword is incorrect
Then("I should have a error message present", async function(){
  await LoginPage.isErrorShowForInvalidLogin(this.driver);
});// Given: The user is on the posts list page

// When: The user enters post details
When("I enter post title {string} and content {string}", async function (title, content) {
  await PostPage.enterPostDetails(this.driver, title, content);
});

// When: The user publishes the post
When("I publish the post", async function () {
  await PostPage.publishPost(this.driver);
});

// Then: The post should be visible in the posts list
Then("I should see the post with title {string} in the posts list", async function (title) {
  await PostPage.verifyPostInList(this.driver, title);
});

// When: The user selects a post to unpublish
When("I select the post with title {string} to unpublish", async function (title) {
  await PostPage.selectPostToUnpublish(this.driver, title);
});

// When: The user unpublishes the post
When("I unpublish the post", async function () {
  await PostPage.unpublishPost(this.driver);
});
When("I create a new post with title {string} and content {string}", async function (title, content) {
  await PostPage.enterPostDetails(this.driver, title, content);
});
// Then: The post should be marked as "Draft" in the posts list
Then("the post with title {string} should be marked as Draft", async function (title) {
  await PostPage.verifyPostIsDraft(this.driver, title);
});
Then("I should see all posts in the posts list with titles:", async function (dataTable) {
  const titles = dataTable.raw().flat();
  await PostPage.verifyPostsInList(this.driver, titles);
});

When("I open the post with title {string}", async function (title) {
  await PostPage.selectPostByTitle(this.driver, title);
});

Then("I should see the post title {string} and content {string}", async function (expectedTitle, expectedContent) {
  const actualTitle = await PostPage.getPostTitle(this.driver);
  const actualContent = await PostPage.getPostContent(this.driver);
  assert.strictEqual(actualTitle, expectedTitle, `El título del post no coincide. Esperado: "${expectedTitle}", Actual: "${actualTitle}"`);
  assert.strictEqual(actualContent, expectedContent, `El contenido del post no coincide. Esperado: "${expectedContent}", Actual: "${actualContent}"`);
});

When("I go back to the posts list page", async function () {
  await PostPage.goBackToPostsList(this.driver);
});