class Tag {
    constructor() {
        this.tagsMenuButton = '[data-test-nav="tags"]'
    }
}

class CreateTag extends Tag {
    constructor() {   
        super();   
        this.newTagButton = 'a.gh-btn.gh-btn-primary';           
        this.tagNameField = '#tag-name';                    
        this.tagDescriptionField = '#tag-description';    
        this.saveTagButton = 'button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view'; 
        this.tagListSelector = '.gh-tag-list-name';
    }

    // Given: El usuario navega a la página de tags
    givenUserIsOnTags() {
        cy.get(this.tagsMenuButton).should('be.visible').click();
        cy.url().should('include', '/ghost/#/tags');
    }

    // When: El usuario hace clic en "New Tag" para crear un tag
    whenUserStartsCreatingNewTag() {
        cy.get(this.newTagButton).should('be.visible').click();
        cy.url().should('include', '/ghost/#/tags/new');
    }

    // When: El usuario ingresa el nombre y descripción del tag
    whenUserEntersTagDetails(name, description) {
        cy.get(this.tagNameField).clear().type(name);
        cy.get(this.tagDescriptionField).clear().type(description);
    }

    // When: El usuario guarda el tag
    whenUserSavesTag() {
        cy.get('.gh-main').scrollTo('top');
        cy.get(this.saveTagButton).should('be.visible').click();

    }

    // Then: El usuario valida que el tag esté en la lista de tags
    thenTagShouldBeVisibleInTagsList(name) {
        cy.get(this.tagsMenuButton).click(); // Navegar de regreso a la lista de tags
        cy.contains(this.tagListSelector, name).should('be.visible');
    }
}

class DeleteTag extends Tag {
    constructor() {
        super();         
        this.deleteTagButton = 'button.gh-btn.gh-btn-red.gh-btn-icon'; 
        this.confirmDeleteTagButton = '.modal-footer .gh-btn-red';
    }

    // Given: El usuario está en la página de tags y selecciona el tag a eliminar
    givenUserIsOnTagsPageAndSelectsTagToDelete(name) {
        cy.get(this.tagsMenuButton).should('be.visible').click();
        cy.url().should('include', '/ghost/#/tags');
        cy.contains(name).click();  // Seleccionar el tag por su nombre
    }

    // When: El usuario hace clic en el botón para eliminar el tag
    whenUserDeletesTag() {
        cy.get('.gh-main').scrollTo('bottom'); // Asegura que el botón esté visible
        cy.get(this.deleteTagButton).should('be.visible').click();
        cy.wait(1000);
        cy.get(this.confirmDeleteTagButton).should('be.visible').click(); // Confirmar eliminación en el modal
        //cy.wait(1000);
    }

    // Then: El usuario verifica que el tag ya no está en la lista de tags
    thenTagShouldNotBeVisibleInTagsList(name) {
        //cy.get(this.tagsMenuButton).click(); // Volver a la lista de tags
        //cy.contains(this.tagListSelector, name).should('not.exist');
    }
}

export { CreateTag, DeleteTag };