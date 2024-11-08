const { Given, When, Then } = require("@cucumber/cucumber");
const fs = require("fs");
const csv = require("csv-parser");
const properties = require("../../../properties.json");  // Adjust the path as needed
const data = [];
let currentData = {};
const assert = require("assert");

// Load data from CSV
Given("I have data from {string}", async function (csvFilePath) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (row) => {
        data.push(row);
      })
      .on("end", () => {
        currentData = data[0];  // Set to the first row of data for now
        resolve();
      })
      .on("error", (error) => {
        reject(error);
      });
  });
});

Given("I open the Ghost login page", async function () {
  await this.driver.url(properties.URL);  // Use URL from properties.json
});

// Enter email and password from properties.json
When("I enter login email CSV {string}", async function (emailField) {
  const email = properties[emailField];  // Get the email directly from properties.json
  const emailInput = await this.driver.$("#identification");
  await emailInput.waitForDisplayed();
  await emailInput.setValue(email);
});

When("I enter login password CSV {string}", async function (passwordField) {
  const password = properties[passwordField];  // Get the password directly from properties.json
  const passwordInput = await this.driver.$("#password");
  await passwordInput.waitForDisplayed();
  await passwordInput.setValue(password);
});

// Click submit button
When("I submit login", async function () {
  const submitButton = await this.driver.$("#ember5");
  await submitButton.click();
});

Then("I should have a nav-bar with functions", async function () {
  // Check if the main navigation bar is displayed
  const navbar = await this.driver.$(".gh-nav-top");
  const isNavbarDisplayed = await navbar.isDisplayed();
  assert.strictEqual(isNavbarDisplayed, true, "Navbar is not displayed");

  // Check if the 'gh-nav-main' list is present inside the navigation bar
  const mainNav = await navbar.$(".gh-nav-list.gh-nav-main");
  const isMainNavDisplayed = await mainNav.isDisplayed();
  assert.strictEqual(isMainNavDisplayed, true, "'gh-nav-main' list is not displayed");

  // Check if the 'gh-nav-manage' list is present inside the navigation bar
  const manageNav = await navbar.$(".gh-nav-list.gh-nav-manage");
  const isManageNavDisplayed = await manageNav.isDisplayed();
  assert.strictEqual(isManageNavDisplayed, true, "'gh-nav-manage' list is not displayed");
});