class Post {
    constructor() {
        this.postTitleField = 'textarea[placeholder="Post Title"]';
        this.postContentField = 'div.koenig-editor__editor-wrapper[data-kg="editor-wrapper"]';
        this.postsListButton = 'a[href=\\#\\/posts\\/]';
        this.postTitleSelector = 'h3.gh-content-entry-title';
        this.backToPostsButton = 'a.ember-view.gh-btn-editor.gh-editor-back-button'
    }
}

class CreatePost extends Post {
    constructor() {
        super();
        this.url = Cypress.env('GHOST_URL') + '/ghost/#/dashboard';
        this.clickPost = '.gh-secondary-action.gh-nav-new-post.ember-view';
        this.publishMenuButton = 'div.gh-publishmenu';
        this.publishButton = 'button.gh-btn-black.gh-publishmenu-button > span';
        this.confirmPublishButton = 'button.gh-btn.gh-btn-large.gh-btn-pulse.ember-view';
        this.returnToPosts = 'a.gh-editor-back-button[href=\\#\\/posts\\/]'
        this.closeButton = 'button.close';
    }

    // Given: El usuario da ícono + para crear un post
    givenUserIsOnPostCreation() {
        cy.log('Crear post: Navegando a la página de creación de posts');
        cy.get(this.clickPost).should('be.visible').click();
        cy.screenshot('create-post-page');
    }

    // When: El usuario digita el títuo y contenido del post
    whenUserEntersPostDetails(title, content) {
        cy.get(this.postTitleField).type(title);
        cy.screenshot('post-title-entered');
        cy.get(this.postContentField).first().type(content);
        cy.screenshot('post-content-entered'); 
    }

    // When: El usuario crea el post
    andWhenUserPublishesPost() {
        cy.get(this.publishMenuButton).first().should('be.visible').click();
        cy.screenshot('publish-post-clicked');
        cy.get(this.publishButton).should('be.visible').click();
        cy.screenshot('post-published');
        cy.wait(1000);
        cy.get(this.returnToPosts).first().should('be.visible').click();
        cy.screenshot('returned-to-posts');
    }

    // Then: El usuario valida que el post esté creado
    thenPostShouldBeVisibleInPostsList(title) {
        cy.contains(title).should('exist');
        cy.screenshot('post-visible-in-list');
        cy.wait(1000);
    }
}

class EditPost extends Post {
    constructor() {
        super();
        this.publishMenuButton = 'div.gh-publishmenu'; //'.gh-editor-header > .gh-editor-publish-buttons > .green > span';
        this.updateButton = 'button.gh-publishmenu-button'; //'a.ember-view.gh-btn-editor.gh-editor-back-button';
    }

    // Given: El usuario navega a la lista de posts.
    givenUserIsOnPostsList() {
        cy.get(this.postsListButton).first().click();
        cy.url().should('include', '/ghost/#/posts');
        cy.screenshot('posts-list-page');
    }

    // When: El usuario selecciona un post específico para editarlo.
    whenUserSelectsPostToEdit(title) {
        cy.contains(this.postTitleSelector, title).click();
        cy.screenshot('post-selected-for-edit');
    }

    // When: El usuario edita los detalles del post, incluyendo el título y el contenido.
    whenUserEditsPostDetails(newTitle, newContent) {
        cy.get(this.postTitleField).clear().type(newTitle);
        cy.screenshot('edited-post-title');
        cy.get(this.postContentField).clear().type(newContent);
        cy.screenshot('edited-post-content'); 
    }

    // When: El usuario guarda los cambios en el post.
    whenUserUpdatesPost() {
        cy.get(this.publishMenuButton).first().click();
        cy.screenshot('publish-menu-opened');
        cy.get(this.updateButton).first().click();
        cy.screenshot('post-updated');
    }

    // Then: El usuario verifica que el post editado esté visible en la lista con el nuevo título.
    thenPostShouldBeUpdated(newTitle) {
        cy.get(this.postsListButton).first().click();
        cy.contains(this.postTitleSelector, newTitle).should('exist');
        cy.screenshot('updated-post-visible');
    }
}

class DeletePost extends Post {
    constructor() {
        super();
        this.settingsMenuButton = 'button.gh-btn-editor[title="Settings"]'; //'.settings-menu-toggle';
        this.settingsPanel = 'div.settings-menu-pane';
        this.deletePostButton = 'button.settings-menu-delete-button';
        this.confirmDeleteButton = 'button.gh-btn-red';
    }

    // Given: El usuario está en la lista de posts
    givenUserIsOnPostsList() {
        cy.get(this.postsListButton).first().click();
        cy.url().should('include', '/ghost/#/posts');
        cy.screenshot('posts-list-page');
    }

    // When: El usuario selecciona un post específico por su título
    whenUserSelectsPostToDelete(title) {
        cy.contains(this.postTitleSelector, title).click();
        cy.screenshot('post-selected-for-delete'); 
        cy.get(this.settingsMenuButton).should('be.visible').click();
        cy.screenshot('settings-menu-opened'); 
    }

    // When: El usuario confirma la eliminación del post
    whenUserConfirmsDeletion() {
        cy.get(this.settingsPanel).first().scrollTo('bottom');
        cy.screenshot('scrolled-to-delete'); 
        cy.get(this.deletePostButton).first().should('be.visible').click();
        cy.screenshot('delete-button-clicked'); 
        cy.contains(this.confirmDeleteButton, "Delete").should('be.visible').click();
        cy.screenshot('post-deletion-confirmed');
        //cy.get(this.confirmDeleteButton).should('be.visible').click();
    }

    // Then: El usuario verifica que el post ya no esté visible en la lista de posts
    thenPostShouldNotBeVisibleInPostsList(title) {
        cy.get(this.postsListButton).first().click(); // Navega de regreso a la lista de posts
        cy.contains(this.postTitleSelector, title).should('not.exist');
        cy.screenshot('post-not-visible-in-list');
    }
}

export { CreatePost, EditPost, DeletePost };