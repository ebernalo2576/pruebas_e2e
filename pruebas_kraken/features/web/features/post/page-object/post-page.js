const assert = require("assert");

class PostPage {
  newPostButton(driver) { return driver.$(".gh-nav-new-post"); }
  titleInput(driver) { return driver.$('textarea[placeholder="Post title"]'); }
  contentInput(driver) { return driver.$('[data-koenig-dnd-droppable="true"]'); }
  publishMenu(driver) { return driver.$("button.gh-btn.gh-btn-editor.darkgrey.gh-publish-trigger"); }
  finalReviewButton(driver) { return driver.$(".gh-publish-cta > button"); }
  publishConfirmationButton(driver) { return driver.$(".gh-publish-cta > button"); }
  closeModalButton(driver) { return driver.$(".modal-content .close"); }
  postsListButton(driver) { return driver.$('[data-test-nav="posts"]'); }
  postTitleInList(driver) { return driver.$("h3.gh-content-entry-title"); }
  unpublishPostButton(driver) { return driver.$(".gh-editor-header > .gh-editor-publish-buttons > .darkgrey > span"); }
  confirmUnpublishPostButton(driver) { return driver.$(".gh-revert-to-draft > span"); }
  confirmDraftPost(driver) { return driver.$("span > div"); }
  backToPostsButton(driver) { return driver.$("a.ember-view.gh-btn-editor.gh-editor-back-button"); }

  async openPostsList(driver) {
    console.log("Navigating to posts list page...");
    await driver.url("http://localhost:3001/ghost/#/posts");
    await driver.pause(2000);  // Pause to observe the state
  }

  async enterPostDetails(driver, title, content) {
    console.log("Entering post details...");
    
    // Click to create a new post
    await this.newPostButton(driver).click();

    // Enter the title
    await this.titleInput(driver).waitForDisplayed({ timeout: 5000 });
    await this.titleInput(driver).click();  // Explicitly click to focus on the title field
    await this.titleInput(driver).setValue(title);
    console.log(`Title entered: ${title}`);

    // Enter the content
    const contentInput = this.contentInput(driver);
    await contentInput.waitForDisplayed({ timeout: 5000 });
    await contentInput.click();  // Explicitly click to focus on the content area
    await contentInput.addValue(content);  // Set the content
    console.log(`Content entered: ${content}`);
  }

  async publishPost(driver) {
    console.log("Publishing post...");

    // Open the publish menu
    await this.publishMenu(driver).waitForDisplayed({ timeout: 5000 });
    await this.publishMenu(driver).click();
    console.log("Clicked publish menu.");

    // Click the final review button
    await this.finalReviewButton(driver).waitForDisplayed({ timeout: 5000 });
    await this.finalReviewButton(driver).click();
    console.log("Clicked final review button.");

    // Click the publish confirmation button
    await this.publishConfirmationButton(driver).waitForDisplayed({ timeout: 5000 });
    await this.publishConfirmationButton(driver).click();
    console.log("Confirmed publish.");

    // Wait for the modal to appear, then close it
    await this.closeModalButton(driver).waitForDisplayed({ timeout: 5000 });
    await this.closeModalButton(driver).click();
    console.log("Closed publish modal.");

    // Take a screenshot after publishing
  }

  async verifyPostInList(driver, title) {
    console.log("Verifying post in list...");
    await this.postsListButton(driver).waitForDisplayed({ timeout: 5000 });
    await this.postsListButton(driver).click();

    const postTitle = await this.postTitleInList(driver).getText();
    console.log(`Expected title: ${title}, Found title: ${postTitle}`);
    assert.strictEqual(postTitle, title, "The post was not created correctly");

    // Take a screenshot for verification
  }
}

module.exports = new PostPage();
