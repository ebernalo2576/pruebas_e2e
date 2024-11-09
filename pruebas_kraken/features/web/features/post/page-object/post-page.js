const assert = require("assert");

class PostPage {
   newPostButton(driver) { return driver.$(".gh-nav-new-post"); }
   titleInput(driver) { return driver.$("textarea[placeholder='Post title']"); }
   contentInput(driver) { return driver.$(".koenig-editor__editor"); }
   publishMenu(driver) { return driver.$(".gh-publishmenu"); }
   publishButton(driver) { return driver.$(".gh-publishmenu-button"); }
   postTitleInList(driver) { return driver.$(".gh-content-entry-title"); }  // Adjust if necessary

  async open(driver) {
    await driver.url("http://localhost:3001/ghost/#/posts");  // Use properties.POST_URL if needed
  }

  async createNewPost(driver, title, description) {
    await this.newPostButton(driver).click();
    await this.titleInput(driver).setValue(title);
    const contentInput = this.contentInput(driver);

    await contentInput.waitForDisplayed({ timeout: 5000 });  
    // await this.publishMenu(driver).click();
    // await this.publishButton(driver).click();
  }

  async verifyPostInList(driver, title) {
    const postTitle = await this.postTitleInList(driver).getText();
    assert.strictEqual(postTitle, title, "The post was not created correctly");
  }
}

module.exports = new PostPage();
