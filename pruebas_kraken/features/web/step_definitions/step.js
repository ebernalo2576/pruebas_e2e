const { Given, When, Then } = require("@cucumber/cucumber");
const fs = require("fs");
const csv = require("csv-parser");
const LoginPage = require("../features/login/page-object/login-page");
const PostPage = require("../features/post/page-object/post-page");
const TagPage = require('../features/tags/tag-page');

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
  const titles = [title];

  await PostPage.checkPostsPresence(this.driver, titles);
});

// When: The user selects a post to unpublish
When("I select the post with title {string} to unpublish", async function (title) {
  await PostPage.selectPostToUnpublish(this.driver, title);
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

// Paso para editar el título y contenido del post
When("I edit the post title to {string} and content to {string}", async function (newTitle, newContent) {
  await PostPage.editPostDetails(this.driver, newTitle, newContent); // Edita el título y contenido del post
});

// Paso para guardar los cambios en el post actualizado
When("I update the post", async function () {
  await PostPage.updatePost(this.driver); // Guarda los cambios
});

// Paso para despublicar el post
When("I unpublish the post", async function () {
  await PostPage.unpublishPost(this.driver); // Despublica el post
});

// Paso para verificar que el post esté marcado como borrador en la lista
Then("I should see the post with title {string} marked as Draft in the posts list", async function (title) {
  await PostPage.verifyPostIsDraft(this.driver, title); // Verifica que el post esté marcado como borrador
});

Then("I should see the post with title {string} marked as draft", async function (title) {
  const isDraft = await PostPage.verifyPostIsDraft(this.driver, title);
  assert.strictEqual(isDraft, true, `El post con título "${title}" no está marcado como borrador.`);
});

Then('I should not see the post with title {string} in the posts list', async function (title) {
  await this.driver.pause(1000);  // Espera para asegurarse de que la lista se actualice

  const postContainers = await PostPage.postContainers(this.driver); // Obtén los contenedores de posts en la lista
  const postTitlesText = await Promise.all(postContainers.map(async (container) => {
  const titleElement = await PostPage.postTitleInContainer(container);
    return await titleElement.getText();
  }));

  // Verifica que el título del post no esté en la lista
  assert(!postTitlesText.includes(title), `El post con el título "${title}" aún se encuentra en la lista.`);
});

When('I delete the post', async function () {
  await PostPage.deletePost(this.driver); // Llama a la función para eliminar el post
});

When('I delete the tag', async function () {
  await TagPage.deleteTag(this.driver); // Llama a la función para eliminar el post
});

Then('I should see the tag {string} in the tags list', async function(tagName) {
  await TagPage.verifyTagIsVisible(this.driver, tagName);
});


// Tags
Given('I navigate to the tags page', async function() {
  await TagPage.navigateToTagsPage(this.driver);
});

Given('I navigate to the tags page and select the tag {string} to edit', async function(name) {
  await TagPage.navigateToTagsPage(this.driver);
  await TagPage.selectTagByName(this.driver,name);
});

Given('I navigate to the tags page and select the tag {string} to delete', async function(name) {
  await TagPage.navigateToTagsPage(this.driver);
  await TagPage.selectTagByName(this.driver, name);
});


When('I enter tag details {string} {string}', async function(tagName, tagDescription) {
  await TagPage.enterTagDetails(this.driver, tagName, tagDescription);
});

When('I save the tag', async function() {
  await TagPage.saveTag(this.driver);
});


When('I enter to create a new tag', async function() {
  await TagPage.openOpenNewTagClick(this.driver);
});



// Editar los detalles del tag (nombre y descripción)
When('I edit tag details to {string} {string}', async function(newTagName, newTagDescription) {
  await TagPage.editTagDetails(this.driver, newTagName, newTagDescription);
});

// Seleccionar un tag existente para editar
Given('I select the tag to edit {string}', async function(name) {
  await TagPage.selectTagByName(this.driver, name);
});

// Verifica que un tag con un nombre específico no esté en la lista
Then('I should not see the tag {string} in the tags list', async function(tagName) {
  await TagPage.verifyTagNotInList(this.driver, tagName);
});