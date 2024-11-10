const assert = require("assert");

class Page {
    pagesMenuButton(driver) { return driver.$('[data-test-nav="pages"]'); }
    pageTitleField(driver) { return driver.$('textarea[placeholder="Page title"]'); }
    pageContentField(driver) { return driver.$('[data-secondary-instance="false"] > .koenig-lexical > [data-kg="editor"] > .kg-prose > p'); }
    savePageButton(driver) { return driver.$('button.gh-btn.gh-btn-editor.darkgrey.gh-publish-trigger'); }
    pageListSelector(driver) { return driver.$('.posts-list.gh-list'); }
    newPageButton(driver) { return driver.$('a.gh-btn.gh-btn-primary'); }
    settingsMenuButton(driver) { return driver.$('.settings-menu-toggle'); }
    deletePageButton(driver) { return driver.$('.settings-menu-delete-button > .gh-btn'); }
    confirmDeleteButton(driver) { return driver.$('.modal-footer .gh-btn-red'); }
    backToPagesButton(driver) { return driver.$('a.ember-view.gh-editor-back-button'); }
    publishMenuButton(driver) { return driver.$('.gh-editor-header > .gh-editor-publish-buttons > .darkgrey > span'); }
    publishButton(driver) { return driver.$('.gh-publish-cta > .gh-btn > span'); }
    confirmPublishButton(driver) { return driver.$('button.gh-btn.gh-btn-large.gh-btn-pulse.ember-view'); }
    closeModalButton(driver) { return driver.$(".modal-content .close"); }
    pagesContainer(driver) { return driver.$$('.posts-list.gh-list'); }
    pagesTitleInContainer(container) { return container.$('h3.gh-content-entry-title'); }
    pageTitleInList(driver) { return driver.$("h3.gh-content-entry-title"); }
    // Navigate to the pages page
    async navigateToPagesPage(driver) {
        console.log("Navigating to pages page...");
       await driver.url("http://localhost:3001/ghost/#/pages");
    }

    // Start creating a new page
    async startCreatingNewPage(driver) {

        await driver.url("http://localhost:3001/ghost/#/editor/page");
    }

    // Enter page details (title and content)
    async enterPageDetails(driver, title, content) {
        console.log(`Entering page details - Title: ${title}, Content: ${content}`);
        await this.pageTitleField(driver).clearValue();
        await this.pageTitleField(driver).setValue(title);
        await this.pageContentField(driver).click();
        await this.pageContentField(driver).setValue(content);
    }

    // Save the page
    async savePage(driver) {
        console.log("Saving the page...");
        await this.savePageButton(driver).click();
        await driver.pause(1000);
    }
    async verifyPagesInList(driver, titles) {
        await driver.pause(1000);  // Breve pausa para asegurarse de que los posts se hayan cargado
    
        const postContainers = await this.pagesContainer(driver);
        console.log(`Se encontraron ${postContainers.length} contenedores de posts.`);
    
        // Extrae el texto del título de cada post en la lista
        const postTitlesText = await Promise.all(postContainers.map(async (container) => {
          const titleElement = await this.pagesTitleInContainer(container);
          const titleText = await titleElement.getText();
          console.log(`Título encontrado: "${titleText}"`);
          return titleText;
        }));
    
        // Verifica que todos los títulos esperados estén presentes en la lista de títulos obtenidos
        for (const title of titles) {
          assert(postTitlesText.includes(title), `El post con el título "${title}" no se encontró en la lista.`);
        }
      }
    // Publish the page
    async publishPage(driver) {
        console.log("Publishing the page...");
        await this.publishMenuButton(driver).click();
        await this.publishButton(driver).click();
        await this.confirmPublishButton(driver).click();
        await this.closeModalButton(driver).click();
        console.log("Page published.");
    }

    async verifyPageInList(driver, title) {
        console.log("Verifying page in list...");
        await this.navigateToPagesPage(driver);
        
        const pageTitle = await this.pageTitleInList(driver).getText();
        console.log(`Expected title: ${title}, Found title: ${pageTitle}`);
        assert.strictEqual(pageTitle, title, "The page was not created correctly");
    }

    // Select an existing page by title for editing or deletion
    async selectPageByTitle(driver, title) {
        console.log(`Selecting page with title "${title}"...`);
        const pageTitleElement = await driver.$(`//h3[contains(text(), "${title}")]`);
        
        const isVisible = await pageTitleElement.isDisplayed();
        if (isVisible) {
            await pageTitleElement.click();
            await driver.pause(1000);
            console.log(`Page "${title}" found and selected.`);
        } else {
            throw new Error(`Page with title "${title}" not found in the list.`);
        }
    }

    // Edit page details (title and content)
    async editPageDetails(driver, newTitle, newContent) {
        console.log(`Editing page details to - Title: ${newTitle}, Content: ${newContent}`);
        await this.pageTitleField(driver).clearValue();
        await this.pageTitleField(driver).setValue(newTitle);
        await this.pageContentField(driver).clearValue();
        await this.pageContentField(driver).setValue(newContent);
    }

    // Delete a page
    async deletePage(driver) {
        console.log("Deleting the page...");
        await this.settingsMenuButton(driver).click();
        await this.deletePageButton(driver).click();
        await this.confirmDeleteButton(driver).click();
        await driver.pause(1000);
        console.log("Page deleted.");
    }
    async verifyPageIsVisible(driver, title) {
        const pageListContainer = await this.pagesContainer(driver);

        // Extrae el texto del título de cada post en la lista
        const pagesTitlesText = await Promise.all(pageListContainer.map(async (container) => {
          const titleElement = await this.pagesTitleInContainer(container);
          const titleText = await titleElement.getText();
          console.log(`Título encontrado: "${titleText}"`);
          return titleText;
        }));
    
        // Verifica que todos los títulos esperados estén presentes en la lista de títulos obtenidos
    // Verifica que todos los títulos esperados estén presentes en la lista de títulos obtenidos
    for (const title of pagesTitlesText) {
        assert(pagesTitlesText.includes(title), `El post con el título "${title}" no se encontró en la lista.`);
      }
    }
    // Verify that a page with a specific title is not visible in the pages list
    async verifyPageNotInList(driver, title) {
        console.log(`Verifying that page with title "${title}" is not in the list...`);
        const pageTitleElement = await driver.$(`//h3[contains(text(), "${title}")]`);
        
        const isVisible = await pageTitleElement.isDisplayed();
        assert(!isVisible, `The page with title "${title}" is still visible in the list.`);
        console.log(`Confirmed: Page with title "${title}" is not in the list.`);
    }
}

module.exports = new Page();
