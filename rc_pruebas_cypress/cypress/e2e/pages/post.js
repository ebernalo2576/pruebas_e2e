class Post {
    constructor() {
        this.postTitleField = 'textarea[placeholder="Post title"]';
        this.postContentField = '[data-secondary-instance="false"] > .koenig-lexical > [data-kg="editor"] > .kg-prose > p';
        this.postsListButton = '[data-test-nav="posts"]';
        this.postTitleSelector = 'h3.gh-content-entry-title';
        this.backToPostsButton = 'a.ember-view.gh-btn-editor.gh-editor-back-button'
    }
}

class CreatePost extends Post {
    constructor() {
        super();
        this.url = Cypress.env('GHOST_URL') + '/ghost/#/dashboard';
        this.clickPost = '.gh-secondary-action.gh-nav-new-post.ember-view';
        this.publishMenuButton = '.gh-editor-header > .gh-editor-publish-buttons > .darkgrey > span';
        this.publishButton = '.gh-publish-cta > .gh-btn > span';
        this.confirmPublishButton = 'button.gh-btn.gh-btn-large.gh-btn-pulse.ember-view';
        this.closeButton = 'button.close';
    }

    // Given: El usuario da ícono + para crear un post
    givenUserIsOnPostCreation() {
        cy.log('Crear post: Navegando a la página de creación de posts');
        cy.get(this.clickPost).should('be.visible').click();
        cy.screenshot('post-creation-page'); 
    }

    // When: El usuario digita el títuo y contenido del post
    whenUserEntersPostDetails(title, content) {
        cy.get(this.postTitleField).type(title);
        cy.screenshot('post-title-entered');
        cy.get(this.postContentField).type(content);
        cy.screenshot('post-content-entered');
    }

    // When: El usuario crea el post
    whenUserPublishesPost() {
        cy.get(this.publishMenuButton).should('be.visible').click();
        cy.screenshot('publish-menu-opened'); 
        cy.get(this.publishButton).should('be.visible').click();
        cy.screenshot('post-published'); 
        cy.get(this.confirmPublishButton).should('be.visible').click();
        cy.screenshot('confirm-publish');
        cy.get(this.closeButton).should('be.visible').click();
        cy.screenshot('post-editor-closed'); 
    }

    // Then: El usuario valida que el post esté creado
    thenPostShouldBeVisibleInPostsList(title) {
        cy.contains(title).should('exist');
        cy.screenshot('post-visible-in-list');
        cy.wait(1000);
    }
}

class ViewPosts extends Post {
    constructor() {
        super();
        this.postAllSelector = 'div.posts-list.gh-list.feature-memberAttribution';
    }

    // Given: El usuario está en la lista de posts
    givenUserIsOnPostsList() {
        cy.get(this.postsListButton).click();
        cy.url().should('include', '/ghost/#/posts');
        cy.screenshot('posts-list-page');
    }

    // When: El usuario revisa la lista de posts
    whenUserViewsPostsList() {
        cy.get(this.postAllSelector).should('exist'); 
        cy.screenshot('posts-list-visible');
    }

    // Then: Verifica que el post con el título especificado esté visible en la lista
    thenPostShouldBeVisibleInList(title) {
        cy.contains(this.postTitleSelector, title).should('be.visible');
        cy.screenshot('post-visible');
    }
}

class ValidatePost extends Post {
    constructor() {
        super();
    }

    // Given: El usuario navega a la lista de posts
    givenUserIsOnPostsList() {
        cy.get(this.postsListButton).click();         
        cy.url().should('include', '/ghost/#/posts');
        cy.screenshot('posts-list-for-validation');  
    }

    // When: El usuario selecciona un post específico para verlo en detalle
    whenUserSelectsPostToView(title) {
        cy.contains(this.postTitleSelector, title).click();
        cy.screenshot('post-selected-for-viewing'); 
    }

    // Then: El contenido del post debe coincidir con el contenido esperado
    thenPostContentShouldMatch(expectedContent) {
        cy.get(this.postContentField).should('contain.text', expectedContent); 
        cy.screenshot('post-content-matches'); 
        cy.get(this.backToPostsButton).click(); 
        cy.screenshot('returned-to-posts-list');
        cy.url().should('include', '/ghost/#/posts'); 
    }

}

class EditPost extends Post {
    constructor() {
        super();
        this.publishMenuButton = '.gh-editor-header > .gh-editor-publish-buttons > .green > span';
        this.updateButton = 'a.ember-view.gh-btn-editor.gh-editor-back-button';
    }

    // Given: El usuario navega a la lista de posts.
    givenUserIsOnPostsList() {
        cy.get(this.postsListButton).click();
        cy.url().should('include', '/ghost/#/posts');
        cy.screenshot('posts-list-before-edit');
    }

    // When: El usuario selecciona un post específico para editarlo.
    whenUserSelectsPostToEdit(title) {
        cy.contains(this.postTitleSelector, title).click();
        cy.screenshot('post-selected-for-editing');
    }

    // When: El usuario edita los detalles del post, incluyendo el título y el contenido.
    whenUserEditsPostDetails(newTitle, newContent) {
        cy.get(this.postTitleField).clear().type(newTitle);
        cy.screenshot('post-title-edited');
        cy.get(this.postContentField).clear().type(newContent);
        cy.screenshot('post-content-edited'); 
    }

    // When: El usuario guarda los cambios en el post.
    whenUserUpdatesPost() {
        cy.get(this.publishMenuButton).click();
        cy.screenshot('publish-menu-opened');
        cy.get(this.updateButton).click();
        cy.screenshot('post-updated');
    }

    // Then: El usuario verifica que el post editado esté visible en la lista con el nuevo título.
    thenPostShouldBeUpdated(newTitle) {
        cy.get(this.postsListButton).click();
        cy.screenshot('returned-to-posts-list');
        cy.contains(this.postTitleSelector, newTitle).should('exist');
        cy.screenshot('edited-post-visible');
    }
}

class UnpublishPost extends Post {
    constructor() {
        super();
        this.unpublishPostButton = '.gh-editor-header > .gh-editor-publish-buttons > .darkgrey > span';
        this.confirmUnpublishPostButton = '.gh-revert-to-draft > span';
        this.confirmDraftPost = 'span > div';
    }

    // Given: El usuario navega a la lista de posts.
    givenUserIsOnPostsList() {
        cy.get(this.postsListButton).click();
        cy.url().should('include', '/ghost/#/posts');
        cy.screenshot('posts-list-before-unpublish'); 
    }

    // When: El usuario selecciona un post específico para despublicarlo.
    whenUserSelectsPostToUnpublish(title) {
        cy.contains(this.postTitleSelector, title).click();
        cy.screenshot('post-selected-for-unpublish');
    }

    // When: El usuario cambia el estado del post a borrador (despublica el post).
    whenUserUnpublishesPost() {
        cy.get(this.unpublishPostButton).click();
        cy.screenshot('unpublish-menu-opened');
        cy.get(this.confirmUnpublishPostButton).click();
        cy.screenshot('post-unpublished');
    }

    // Then: El usuario verifica que el post esté en estado borrador y regresa a la lista.
    thenPostShouldNotBeVisibleInPostsList(title) {
        cy.get(this.confirmDraftPost).should('contain', 'Draft');
        cy.screenshot('post-in-draft-state');
        cy.wait(500);
        cy.get(this.backToPostsButton).should('be.visible').click();
        cy.screenshot('returned-to-posts-list');
        cy.wait(500);
        cy.contains(this.postTitleSelector, title).should('be.visible');
        cy.screenshot('draft-post-visible-in-list');
    }
}

class DeletePost extends Post {
    constructor() {
        super();
        this.settingsMenuButton = '.settings-menu-toggle';
        this.deletePostButton = '.settings-menu-delete-button > .gh-btn > span';
        this.confirmDeleteButton = '.modal-footer .gh-btn-red';
    }

    // Given: El usuario está en la lista de posts
    givenUserIsOnPostsList() {
        cy.get(this.postsListButton).click();
        cy.url().should('include', '/ghost/#/posts');
        cy.screenshot('post-selected-for-delete');
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
        cy.get('.settings-menu').scrollTo('bottom');
        cy.screenshot('scroll-to-delete');
        cy.get(this.deletePostButton).should('be.visible').click();
        cy.screenshot('delete-button-clicked');
        cy.get(this.confirmDeleteButton).should('be.visible').click();
        cy.screenshot('post-deletion-confirmed');
    }

    // Then: El usuario verifica que el post ya no esté visible en la lista de posts
    thenPostShouldNotBeVisibleInPostsList(title) {
        cy.get(this.postsListButton).click(); 
        cy.screenshot('returned-to-posts-list');
        cy.contains(this.postTitleSelector, title).should('not.exist');
        cy.screenshot('post-not-visible-in-list');
    }
}

export { CreatePost, ViewPosts, ValidatePost, EditPost, UnpublishPost, DeletePost };