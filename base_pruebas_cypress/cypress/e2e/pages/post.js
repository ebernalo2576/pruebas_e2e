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
    }

    // When: El usuario digita el títuo y contenido del post
    whenUserEntersPostDetails(title, content) {
        cy.get(this.postTitleField).type(title);
        cy.get(this.postContentField).first().type(content);
    }

    // When: El usuario crea el post
    andWhenUserPublishesPost() {
        cy.get(this.publishMenuButton).first().should('be.visible').click();
        cy.get(this.publishButton).should('be.visible').click();
        cy.wait(1000);
        cy.get(this.returnToPosts).first().should('be.visible').click()
    }

    // Then: El usuario valida que el post esté creado
    thenPostShouldBeVisibleInPostsList(title) {
        cy.contains(title).should('exist');
        cy.wait(1000);
    }
}

class ViewPosts extends Post {
    constructor() {
        super();
        //this.postAllSelector = 'div.posts-list.gh-list.feature-memberAttribution';
        this.postAllSelector = 'ol.posts-list.gh-list';
    }

    // Given: El usuario está en la lista de posts
    givenUserIsOnPostsList() {
        cy.get(this.postsListButton).first().click();
        cy.url().should('include', '/ghost/#/posts');
    }

    // When: El usuario revisa la lista de posts
    whenUserViewsPostsList() {
        cy.get(this.postAllSelector).first().should('exist'); 
    }

    // Then: Verifica que el post con el título especificado esté visible en la lista
    thenPostShouldBeVisibleInList(title) {
        cy.contains(this.postTitleSelector, title).should('be.visible');
    }
}

class ValidatePost extends Post {
    constructor() {
        super();
    }

    // Given: El usuario navega a la lista de posts
    givenUserIsOnPostsList() {
        cy.get(this.postsListButton).first().click();         
        cy.url().should('include', '/ghost/#/posts');  
    }

    // When: El usuario selecciona un post específico para verlo en detalle
    whenUserSelectsPostToView(title) {
        cy.contains(this.postTitleSelector, title).click();
    }

    // Then: El contenido del post debe coincidir con el contenido esperado
    thenPostContentShouldMatch(expectedContent) {
        cy.get(this.postContentField).first().should('contain.text', expectedContent); 
        cy.get(this.postsListButton).first().click(); 
        cy.url().should('include', '/ghost/#/posts'); 
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
    }

    // When: El usuario selecciona un post específico para editarlo.
    whenUserSelectsPostToEdit(title) {
        cy.contains(this.postTitleSelector, title).click();
    }

    // When: El usuario edita los detalles del post, incluyendo el título y el contenido.
    whenUserEditsPostDetails(newTitle, newContent) {
        cy.get(this.postTitleField).clear().type(newTitle);
        cy.get(this.postContentField).clear().type(newContent);
    }

    // When: El usuario guarda los cambios en el post.
    whenUserUpdatesPost() {
        cy.get(this.publishMenuButton).first().click(); //publishMenuButton
        cy.get(this.updateButton).first().click();
    }

    // Then: El usuario verifica que el post editado esté visible en la lista con el nuevo título.
    thenPostShouldBeUpdated(newTitle) {
        cy.get(this.postsListButton).first().click();
        cy.contains(this.postTitleSelector, newTitle).should('exist');
    }
}

class UnpublishPost extends Post {
    constructor() {
        super();
        this.publishMenuButton = 'div.gh-publishmenu';
        this.unpublishPostButton = '.gh-editor-header > .gh-editor-publish-buttons > .darkgrey > span';
        this.unpublishPostRadiButton = 'div.gh-publishmenu-radio-label'
        this.confirmUnpublishPostButton = 'button.gh-btn-black.gh-publishmenu-button > span';
        this.backToPostsButton = 'a[href=\\#\\/posts\\/]';
        this.confirmDraftPost = 'span.gh-content-status-draft';
    }

    // Given: El usuario navega a la lista de posts.
    givenUserIsOnPostsList() {
        cy.get(this.postsListButton).first().click();
        cy.url().should('include', '/ghost/#/posts');
    }

    // When: El usuario selecciona un post específico para despublicarlo.
    whenUserSelectsPostToUnpublish(title) {
        cy.contains(this.postTitleSelector, title).click();

    }

    // When: El usuario cambia el estado del post a borrador (despublica el post).
    whenUserUnpublishesPost() {

        //cy.get(this.publishMenuButton).first().click()
        cy.get(this.publishMenuButton).first().should('be.visible').click();
        cy.contains(this.unpublishPostRadiButton, "Unpublished").click();
        cy.contains(this.confirmUnpublishPostButton, "Unpublish").click();
        cy.get(this.backToPostsButton).first().click();

        //cy.get(this.unpublishPostButton).first().click();
        //cy.get(this.confirmUnpublishPostButton).click();
    }

    // Then: El usuario verifica que el post esté en estado borrador y regresa a la lista.
    thenPostShouldNotBeVisibleInPostsList(title) {

        cy.get(this.confirmDraftPost).should('contain', 'Draft');
        cy.wait(500);
        //cy.get(this.backToPostsButton).should('be.visible').click();
        //cy.wait(500);
        cy.contains(this.postTitleSelector, title).should('be.visible');
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
    }

    // When: El usuario selecciona un post específico por su título
    whenUserSelectsPostToDelete(title) {
        cy.contains(this.postTitleSelector, title).click();
        cy.get(this.settingsMenuButton).should('be.visible').click();
    }

    // When: El usuario confirma la eliminación del post
    whenUserConfirmsDeletion() {
        cy.get(this.settingsPanel).first().scrollTo('bottom');
        cy.get(this.deletePostButton).first().should('be.visible').click();
        cy.contains(this.confirmDeleteButton, "Delete").should('be.visible').click();
        //cy.get(this.confirmDeleteButton).should('be.visible').click();
    }

    // Then: El usuario verifica que el post ya no esté visible en la lista de posts
    thenPostShouldNotBeVisibleInPostsList(title) {
        cy.get(this.postsListButton).first().click(); // Navega de regreso a la lista de posts
        cy.contains(this.postTitleSelector, title).should('not.exist');
    }
}

export { CreatePost, ViewPosts, ValidatePost, EditPost, UnpublishPost, DeletePost };