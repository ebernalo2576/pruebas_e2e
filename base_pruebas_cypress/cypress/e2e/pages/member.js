class Member {
    constructor() {
        this.membersMenuButton = '[data-test-nav="members"]';
        this.memberListSelector = '.gh-members-list-name';
        this.newMemberButton = 'a.gh-btn.gh-btn-primary';
        this.memberNameField = '#member-name';
        this.memberEmailField = '#member-email';
        this.saveMemberButton = 'button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view';
    }
}

class CreateMember extends Member {
    constructor() {
        super();
    }

    // Given: El usuario navega a la sección de miembros
    givenUserIsOnMembersPage() {
        cy.get(this.membersMenuButton).should('be.visible').click();
        cy.url().should('include', '/ghost/#/members');
    }

    // When: El usuario hace clic en "New Member" para crear un nuevo miembro
    whenUserStartsCreatingNewMember() {
        cy.get(this.newMemberButton).should('be.visible').click();
        cy.url().should('include', '/ghost/#/members/new');
    }

    // When: El usuario ingresa el nombre y correo electrónico del miembro
    whenUserEntersMemberDetails(name, email) {
        cy.get(this.memberNameField).clear().type(name);
        cy.get(this.memberEmailField).clear().type(email);
    }

    // When: El usuario guarda el miembro
    whenUserSavesMember() {
        cy.get('.gh-main').scrollTo('top');
        cy.get(this.saveMemberButton).should('be.visible').click();
    }

    // Then: El usuario verifica que el miembro esté visible en la lista de miembros
    thenMemberShouldBeVisibleInMembersList(name) {
        cy.get(this.membersMenuButton).click(); 
        cy.contains(this.memberListSelector, name).should('be.visible');
    }
}
class ViewMembers {
    constructor() {
        this.membersMenuButton = '[data-test-nav="members"]';  
        this.memberListSelector = '.gh-members-list-name';    
    }

    // Given: El usuario navega a la sección de miembros
    givenUserIsOnMembersPage() {
        cy.get(this.membersMenuButton).should('be.visible').click(); 
        cy.url().should('include', '/ghost/#/members');      
    }

    // When: El usuario visualiza la lista de miembros
    whenUserViewsMembersList() {
        cy.get(this.memberListSelector).should('exist');   
    }

    // Then: Verifica que la lista de miembros esté visible
    thenMembersListShouldBeVisible() {
        cy.get(this.memberListSelector).should('be.visible');   
    }
}

class EditMember extends Member {
    constructor() {
        super();
    }

    // Given: El usuario navega a la lista de miembros y selecciona un miembro para editar
    givenUserIsOnMembersPageAndSelectsMemberToEdit(name) {
        cy.get(this.membersMenuButton).should('be.visible').click();
        cy.contains(this.memberListSelector, name).click(); // Selecciona el miembro para editar
    }

    // When: El usuario modifica el nombre y/o correo electrónico del miembro
    whenUserEditsMemberDetails(newName, newEmail) {
        cy.get(this.memberNameField).clear().type(newName);
        cy.get(this.memberEmailField).clear().type(newEmail);
    }

    // When: El usuario guarda los cambios
    whenUserSavesEditedMember() {
        cy.get('.gh-main').scrollTo('top');
        cy.get(this.saveMemberButton).should('be.visible').click();
    }

    // Then: El usuario verifica que el miembro editado esté visible en la lista de miembros con el nuevo nombre
    thenMemberShouldBeUpdatedInMembersList(newName) {
        cy.get(this.membersMenuButton).click(); 
        cy.contains(this.memberListSelector, newName).should('be.visible');
    }
}

class DeleteMember extends Member {
    constructor() {
        super();
        this.settingsMenuButton = 'button.closed.ember-view';        
        this.deleteMemberButton = '[data-test-button="delete-member"]';     
        this.confirmDeleteButton = '.modal-footer .gh-btn-red';    
    }

    // Given: El usuario navega a la lista de miembros y selecciona el miembro para eliminar
    givenUserIsOnMembersPageAndSelectsMemberToDelete(name) {
        cy.get(this.membersMenuButton).should('be.visible').click();
        cy.contains(this.memberListSelector, name).click(); 
        cy.get('.gh-main').scrollTo('top');
        cy.get(this.settingsMenuButton).should('be.visible').click(); 
    }

    // When: El usuario confirma la eliminación del miembro
    whenUserDeletesMember() {
        cy.get(this.deleteMemberButton).should('be.visible').click();
        cy.get(this.confirmDeleteButton).should('be.visible').click();
    }

    // Then: El usuario verifica que el miembro ya no esté en la lista de miembros
    thenMemberShouldNotBeVisibleInMembersList(name) {
        cy.get(this.membersMenuButton).should('be.visible').click(); 
        cy.contains(this.memberListSelector, name).should('not.exist');
    }
}

export { CreateMember, ViewMembers, EditMember, DeleteMember };