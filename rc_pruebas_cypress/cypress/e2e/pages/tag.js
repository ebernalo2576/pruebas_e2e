export class Tag {
    constructor() {
        this.tagsMenuButton = 'a[data-test-nav="tags"]';
        this.newTagButton = 'a[href="#/tags/new/"].ember-view.gh-btn.gh-btn-primary';
        this.tagNameField = '#tag-name';
        this.tagSlugField = '#tag-slug';
        this.tagDescriptionField = '#tag-description';
        this.saveTagButton = 'button[data-test-button="save"]';
        this.errorAlert = '[data-test-task-button-state="failure"]';
        this.tagListTitle = 'h3.gh-tag-list-name';
        this.editTagButton = 'a[title="Edit tag"]';
    }

    // GIVEN: Navegar a la lista de tags
    givenUserIsOnTagsPage() {
        cy.get(this.tagsMenuButton).should('be.visible').click();
        cy.url().should('include', '/ghost/#/tags');
        cy.screenshot('tags-list');
    }

    // AND: Comenzar a crear un nuevo tag
    andUserStartsCreatingNewTag() {
        cy.get(this.newTagButton).should('be.visible').click();
        cy.url().should('include', '/ghost/#/tags/new');
        cy.screenshot('new-tag-page');
    }

    // GIVEN: Navegar a la edición de un tag existente
    givenUserIsEditingAnExistingTag() {
        cy.get(this.editTagButton).last().scrollIntoView().click();
        cy.screenshot('edit-tag');
    }

    // WHEN: Limpiar campos
    whenUserClearsFields() {
        cy.get(this.tagNameField).clear().screenshot('name-cleared');
        cy.get(this.tagDescriptionField).clear().screenshot('description-cleared');
    }
    whenUserSavesTag() {
        cy.get(this.saveTagButton).click();
        cy.screenshot('tag-saved');
    }

    // WHEN: Ingresar detalles del tag
    whenUserEntersTagDetails(name, slug, description) {
        if (name) cy.get(this.tagNameField).clear().type(name).screenshot('tag-name');
        if (slug) cy.get(this.tagSlugField).clear().type(slug).screenshot('tag-slug');
        if (description) cy.get(this.tagDescriptionField).clear().type(description).screenshot('tag-description');
        cy.get(this.saveTagButton).click();
        cy.screenshot('tag-saved');
    }

    // THEN: Verificar que el tag está visible en la lista
    thenTagShouldBeVisibleInTagsList(name) {
        cy.get(this.tagsMenuButton).click();
        cy.get('h3.gh-tag-list-name', { timeout: 10000 })
        .filter(`:contains(${name})`)
        .should('have.length.at.least', 1);    }

    // THEN: Mostrar error
    thenUserShouldSeeAnError() {
        cy.get(this.errorAlert).should('be.visible');
        cy.screenshot('error-message');
    }
}
