class Page {
    constructor() {
        this.pagesMenuButton = '[href="#/pages/"]';    
        this.pageListSelector = '.gh-content-entry-title';
        this.pageTitleField = 'textarea[placeholder="Page Title"]';
        this.pageContentField = '.koenig-editor__editor';
        this.settingsMenuButton = '.settings-menu-toggle';
        this.backToPagesButton = 'a.ember-view.gh-editor-back-button';
        this.publishMenuButton = '.gh-publishmenu.ember-view';      
        this.confirmPublishButton = 'span > div';       
    }
}

class CreatePage extends Page {
    constructor() {
        super();     
        this.newPageButton = 'a.gh-btn.gh-btn-primary';                                  
        this.publishButton = '.gh-publishmenu-footer > button.gh-publishmenu-button'; 
        
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
        cy.get(this.confirmPublishButton).should('contain', 'Published');
        cy.get(this.pagesMenuButton).should('be.visible').click();
    }

    // Then: El usuario verifica que la página esté en la lista de páginas
    thenPageShouldBeVisibleInPagesList(title) {
        cy.contains(title).should('exist');
    }
}


class EditPage extends Page {
    constructor() {
        super();
        this.updateButton = '.gh-publishmenu-footer > button.gh-publishmenu-button'; 
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
        cy.get(this.confirmPublishButton).should('contain', 'Published');
    }

    // Then: El usuario verifica que la página editada esté en la lista de páginas
    thenPageShouldBeUpdatedInPagesList(newTitle) {
        cy.get(this.pagesMenuButton).should('be.visible').click();
        cy.contains(this.pageListSelector, newTitle).should('be.visible');
    }
}


export { CreatePage, EditPage };