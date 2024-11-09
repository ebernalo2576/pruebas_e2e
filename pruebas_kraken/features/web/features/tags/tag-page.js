const assert = require("assert");

class TagPage {
    tagsMenuButton(driver) { return driver.$('[data-test-nav="tags"]'); }
    tagNameField(driver) { return driver.$('#tag-name'); }
    tagDescriptionField(driver) { return driver.$('#tag-description'); }
    saveTagButton(driver) { return driver.$('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view'); }
    tagListSelector(driver) { return driver.$('.gh-tag-list-name'); }
    deleteTagButton(driver) { return driver.$('button.gh-btn.gh-btn-red.gh-btn-icon'); }
    confirmDeleteTagButton(driver) { return driver.$('.modal-footer .gh-btn-red'); }
    newTagButton(driver) { return driver.$('a.gh-btn.gh-btn-primary'); }

    // Navigate to the tags page
    async navigateToTagsPage(driver) {
        console.log("Navigating to tags page...");
        await driver.url("http://localhost:3001/ghost/#/tags");
    }

    async openOpenNewTagClick(driver){
        console.log("Opening to create a new tag...");
        await this.newTagButton(driver).click();
        await driver.pause(1000);
    }
    // Fill in tag details (name and description)
    async fillTagDetails(driver, name, description) {
        console.log("Filling tag details...");
        await this.tagNameField(driver).clearValue();
        await this.tagNameField(driver).setValue(name);
        await this.tagDescriptionField(driver).clearValue();
        await this.tagDescriptionField(driver).setValue(description);
    }

    // Save the tag (for either creating or editing)
    async saveTag(driver) {
        await this.saveTagButton(driver).click();
        await driver.pause(1000);
    }

    // Verify that a tag is visible in the tags list
    async verifyTagIsVisible(driver, name) {
        console.log(`Verifying tag "${name}" is visible...`);
        await this.tagsMenuButton(driver).click();
        const tag = await this.tagListSelector(driver);
        const isVisible = await tag.isDisplayed();
        assert(isVisible, `The tag "${name}" is not visible in the tags list`);
    }

    // Verify that a tag is not visible in the tags list
    async verifyTagIsNotVisible(driver, name) {
        console.log(`Verifying tag "${name}" is not visible...`);
        await this.tagsMenuButton(driver).click();
        const tags = await driver.$$(this.tagListSelector(driver));
        const tagNames = await Promise.all(tags.map(async tag => await tag.getText()));
        assert(!tagNames.includes(name), `The tag "${name}" is still visible in the tags list`);
    }

    // Select an existing tag by name
    async selectTagByName(driver, name) {
        console.log(`Selecting tag "${name}"...`);
        const tags = await driver.$$(this.tagListSelector(driver));
        for (const tag of tags) {
            const tagName = await tag.getText();
            if (tagName === name) {
                await tag.click();
                await driver.pause(1000);
                return;
            }
        }
        throw new Error(`The tag "${name}" was not found in the list.`);
    }

    // Edit the details of an existing tag
    async editTag(driver, name, newName, newDescription) {
        console.log(`Editing tag "${name}"...`);
        await this.selectTagByName(driver, name);
        await this.fillTagDetails(driver, newName, newDescription);
        await this.saveTag(driver);
    }

    // Delete a tag
    async deleteTag(driver, name) {
        console.log(`Deleting tag "${name}"...`);
        await this.selectTagByName(driver, name);
        await driver.$('.gh-main').scrollTo('bottom');
        await this.deleteTagButton(driver).click();
        await this.confirmDeleteTagButton(driver).click();
        await driver.pause(1000);
    }

     // Start creating a new tag
     async startCreatingNewTag(driver) {
        console.log("Starting to create a new tag...");
        await this.newTagButton(driver).click();
        await driver.pause(1000);
        await driver.url().should('include', '/ghost/#/tags/new');
    }

    // Enter tag details (name and description)
    async enterTagDetails(driver, name, description) {
        console.log(`Entering tag details - Name: ${name}, Description: ${description}`);
        await this.tagNameField(driver).click();
        await this.tagNameField(driver).setValue(name);
        await this.tagDescriptionField(driver).click();

        await this.tagDescriptionField(driver).setValue(description);
    }

    // Save the tag (for either creating or editing)
    async saveTag(driver) {
        await this.saveTagButton(driver).click();
        await driver.pause(1000);
    }
    async verifyTagIsVisible(driver, tagName) {
        console.log(`Verifying that tag "${tagName}" is visible...`);
    
        // Use a simple text-based selector to check for visibility of the tag name
        const tagTextElement = await driver.$(`//*[text()="${tagName}"]`);
        const isTagVisible = await tagTextElement.isDisplayed();
    
        // Assert that the tag is visible
        assert(isTagVisible, `The tag "${tagName}" is not visible on the page.`);
        console.log(`Tag "${tagName}" is confirmed visible.`);
      }
}

module.exports = new TagPage();
