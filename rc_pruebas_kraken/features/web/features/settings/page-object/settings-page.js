const assert = require("assert");
const properties = require("../../../../../properties.json");

class SettingsPage {
  newPostButton(driver) { return driver.$(".gh-nav-new-post"); }
  titleInput(driver) { return driver.$('textarea[placeholder="Post title"]'); }
  contentInput(driver) { return driver.$('[data-koenig-dnd-droppable="true"]'); }
  publishMenu(driver) { return driver.$("button.gh-btn.gh-btn-editor.darkgrey.gh-publish-trigger"); }
  finalReviewButton(driver) { return driver.$(".gh-publish-cta > button"); }
  publishConfirmationButton(driver) { return driver.$(".gh-publish-cta > button"); }
  closeModalButton(driver) { return driver.$(".modal-content .close"); }
  postsListButton(driver) { return driver.$('[data-test-nav="posts"]'); }
  postTitleInList(driver) { return driver.$("h3.gh-content-entry-title"); }
  postDetailTitle(driver) { return driver.$("textarea[placeholder='Post title']"); }
  postDetailContent(driver) { return driver.$('[data-koenig-dnd-droppable="true"]'); }
  updateButton(driver) { return driver.$("button.gh-btn.gh-btn-editor.gh-editor-save-trigger.green"); }
  backToPostsButton(driver) { return driver.$("a.gh-editor-back-button"); }

  postContainers(driver) { return driver.$$("div.gh-posts-list-item-group"); }
  postTitleInContainer(container) { return container.$("h3.gh-content-entry-title"); }
  unpublishPostButton(driver) { return driver.$(".gh-editor-header > .gh-editor-publish-buttons > .darkgrey > span"); }
  confirmUnpublishPostButton(driver) { return driver.$(".gh-revert-to-draft > span"); }
  confirmDraftPost(driver) { return driver.$("span:contains('Draft')"); }
  draftStatusIndicator(driver) { return driver.$(".gh-content-entry-status .draft"); }  // Indicador de notificación de borrador


  // Método para abrir la configuracion
  async navigateToSettingsPage(driver) {
    console.log("Navigating to posts list page...");
    await driver.url(properties["URL"] + "#/settings/general");
    await driver.pause(2000);
  }

  async editTitleDescription(driver, title, content) {
    console.log("Editing post title and content...");
    await this.titleInput(driver).clearValue();
    await this.titleInput(driver).setValue(title);
    await this.contentInput(driver).click();
    await this.contentInput(driver).setValue(content);
  }

  async editSiteTimezone(driver, timezone) {
    console.log("Editing site timezone...");
    await driver.$(".gh-setting-timezone").click();
    await driver.$(".gh-setting-timezone").setValue(timezone);
    await driver.$(".gh-setting-timezone").click();
  }

  async editPublicationLanguage(driver, language) {
    console.log("Editing publication language...");
    await driver.$(".gh-setting-language").click();
    await driver.$(".gh-setting-language").setValue(language);
    await driver.$(".gh-setting-language").click();
  }

  async verifySettingsChanges(driver, title, content) {
    console.log("Verifying settings changes...");
    await this.postsListButton(driver).click();
    await driver.pause(1000);
    const postContainers = await this.postContainers(driver);
    const postTitles = await Promise.all(postContainers.map(async post => await post.$("h3.gh-content-entry-title").getText()));
    assert(postTitles.includes(title), `The post "${title}" is not visible in the posts list`);
  }
}