class Page {
    constructor() {
        this.pagesMenuButton = '[data-test-nav="pages"]';    
        this.pageListSelector = '.gh-content-entry-title';
        this.pageTitleField = 'textarea[placeholder="Page title"]';
        this.pageContentField = '[data-secondary-instance="false"] > .koenig-lexical > [data-kg="editor"] > .kg-prose > p';
        this.settingsMenuButton = '.settings-menu-toggle';
        this.backToPagesButton = 'a.ember-view.gh-editor-back-button';           
    }
}

class CreatePage extends Page {
    constructor() {
        super();
        this.publishMenuButton = '.gh-editor-header > .gh-editor-publish-buttons > .darkgrey > span';             
        this.newPageButton = 'a.gh-btn.gh-btn-primary';                                  
        this.publishButton = '.gh-publish-cta > .gh-btn > span'; 
        this.confirmPublishButton = 'button.gh-btn.gh-btn-large.gh-btn-pulse.ember-view';
        this.closeButton = 'button.close';                  
    }

    // Given: El usuario navega a la sección de páginas
    givenUserIsOnPages() {
        cy.get(this.pagesMenuButton).should('be.visible').click();
        cy.url().should('include', '/ghost/#/pages');
    }

    // When: El usuario hace clic en "New Page" para crear una nueva página
    whenUserStartsCreatingNewPage() {
        cy.get(this.newPageButton).should('be.visible').click();
        cy.url().should('include', '/ghost/#/editor/page');
    }

    // When: El usuario ingresa el título y el contenido de la página
    whenUserEntersPageDetails(title, content) {
        cy.get(this.pageTitleField).clear().type(title);
        cy.get(this.pageContentField).click().type(content);
    }

    // When: El usuario publica la página
    whenUserPublishesPage() {
        cy.get(this.publishMenuButton).should('be.visible').click();
        cy.get(this.publishButton).should('be.visible').click();
        cy.get(this.confirmPublishButton).should('be.visible').click();
        cy.get(this.closeButton).should('be.visible').click();
    }

    // Then: El usuario verifica que la página esté en la lista de páginas
    thenPageShouldBeVisibleInPagesList(title) {
        cy.contains(title).should('exist');
    }
}

class ViewPages extends Page {
    constructor() {
        super();
    }

    // Then: El usuario verifica que una página con el título especificado esté visible en la lista
    thenPageShouldBeVisible(title) {
        cy.contains(this.pageListSelector, title).should('be.visible');
    }

    // Given: El usuario navega a la sección de páginas
    givenUserIsOnPagesSection() {
        cy.get(this.pagesMenuButton).should('be.visible').click();   
        cy.url().should('include', '/ghost/#/pages');              
    }

    // When: El usuario visualiza la lista de páginas
    whenUserViewsPagesList() {
        cy.get(this.pageListSelector).should('exist'); 
    }

    // Then: Verifica que una página con el título especificado esté visible en la lista
    thenPageShouldBeVisible(title) {
        cy.contains(this.pageListSelector, title).should('be.visible'); 
    }
}

class ValidatePage extends Page {
    constructor() {
        super();                     
        this.pageContentSelector = '[data-secondary-instance="false"] > .koenig-lexical > [data-kg="editor"] > .kg-prose > p'; 
    }

    // Given: El usuario navega a la lista de páginas
    givenUserIsOnPagesSection() {
        cy.get(this.pagesMenuButton).should('be.visible').click();
        cy.url().should('include', '/ghost/#/pages');
    }

    // When: El usuario selecciona una página específica para ver sus detalles
    whenUserSelectsPageToValidate(title) {
        cy.contains(this.pageListSelector, title).click(); // Abre la página para ver sus detalles
    }

    // Then: El usuario valida que el título y el contenido de la página coincidan con los valores esperados
    thenPageDetailsShouldMatch(expectedTitle, expectedContent) {
        cy.get(this.pageContentSelector).should('contain.text', expectedContent);
        cy.get(this.backToPagesButton).should('be.visible').click();
        cy.url().should('include', '/ghost/#/pages'); 
    }
}

class EditPage extends Page {
    constructor() {
        super();
        this.publishMenuButton = '.gh-editor-header > .gh-editor-publish-buttons > .green > span';
        this.updateButton = 'a.ember-view.gh-btn-editor.gh-editor-back-button'; 
        this.confirmUpdateButton = 'button.gh-btn.gh-btn-large.gh-btn-pulse.ember-view';
    }

    // Given: El usuario navega a la lista de páginas y selecciona una página para editar
    givenUserIsOnPagesAndSelectsPageToEdit(title) {
        cy.get(this.pagesMenuButton).should('be.visible').click();
        cy.contains(this.pageListSelector, title).click();
    }

    // When: El usuario modifica el título y el contenido de la página
    whenUserEditsPageDetails(newTitle, newContent) {
        cy.get(this.pageTitleField).clear().type(newTitle);
        cy.get(this.pageContentField).clear().type(newContent);
    }

    // When: El usuario guarda los cambios
    whenUserUpdatesPage() {
        cy.get(this.publishMenuButton).click();
        cy.get(this.updateButton).should('be.visible').click();
    }

    // Then: El usuario verifica que la página editada esté en la lista de páginas
    thenPageShouldBeUpdatedInPagesList(newTitle) {
        cy.get(this.pagesMenuButton).click();
        cy.contains(this.pageListSelector, newTitle).should('be.visible');
    }
}

class UnpublishPage extends Page {
    constructor() {
        super();             
        this.unpublishButton = '.gh-editor-header > .gh-editor-publish-buttons > .darkgrey > span'; 
        this.confirmUnpublishButton = '.gh-revert-to-draft > span';  
        this.confirmDraftPage = 'span > div'; 
    }

    // Given: El usuario navega a la lista de páginas y selecciona una página para despublicar
    givenUserIsOnPagesAndSelectsPageToUnpublish(title) {
        cy.get(this.pagesMenuButton).should('be.visible').click();
        cy.contains(this.pageListSelector, title).click(); 
    }

    // When: El usuario cambia el estado de la página a borrador
    whenUserUnpublishesPage() {
        cy.get(this.unpublishButton).should('be.visible').click();
        cy.get(this.confirmUnpublishButton).should('be.visible').click();
    }

    // Then: El usuario verifica que la página esté en estado de borrador
    thenPageShouldBeInDraftState(title) {
        cy.get(this.confirmDraftPage).should('contain', 'Draft');
        cy.wait(500);
        cy.get(this.backToPagesButton).should('be.visible').click();
        cy.wait(500);
        cy.contains(this.pageListSelector, title).should('be.visible');
    }
}
class DeletePage extends Page {
    constructor() {
        super();
        this.settingsMenuButton = '.settings-menu-toggle';      
        this.deletePageButton = '.settings-menu-delete-button > .gh-btn'; 
        this.confirmDeleteButton = '.modal-footer .gh-btn-red';   
    }

    // Given: El usuario navega a la lista de páginas y selecciona la página para eliminar
    givenUserIsOnPagesAndSelectsPageToDelete(title) {
        cy.get(this.pagesMenuButton).should('be.visible').click();
        cy.contains(this.pageListSelector, title).click();
        cy.get(this.settingsMenuButton).should('be.visible').click(); 
    }

    // When: El usuario confirma la eliminación de la página
    whenUserDeletesPage() {
        cy.get('.settings-menu').scrollTo('bottom');
        cy.get(this.deletePageButton).should('be.visible').click();
        cy.get(this.confirmDeleteButton).should('be.visible').click();
    }

    // Then: El usuario verifica que la página ya no esté en la lista de páginas
    thenPageShouldNotBeVisibleInPagesList(title) {
        cy.get(this.pagesMenuButton).click();
        cy.contains(this.pageListSelector, title).should('not.exist');
    }
}

export { CreatePage, ViewPages, ValidatePage, EditPage, UnpublishPage, DeletePage };