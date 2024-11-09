import loginPage from './pages/login';
import { CreateMember, ViewMembers, EditMember, DeleteMember } from './pages/member';
import { faker } from '@faker-js/faker';

const createMember = new CreateMember();
const viewMembers = new ViewMembers();
const editMember = new EditMember();
const deleteMember = new DeleteMember();
const memberName = faker.person.fullName();
const memberEmail = faker.internet.email();
const newMemberName = faker.person.fullName(); 
const newMemberEmail = faker.internet.email(); 

describe('Escenarios de pruebas para la funcionalidad miembros - Ghost', () => {

    it('EP015 - Debería permitir crear y visualizar un nuevo miembro', () => {
        // Given: El usuario inicia sesión
        loginPage.givenUserIsOnLoginPage();
        loginPage.whenUserLogsIn();
        loginPage.thenUserShouldSeeDashboard();

        // Given: El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

        // When: El usuario comienza a crear un nuevo miembro
        createMember.whenUserStartsCreatingNewMember();

        // When: El usuario ingresa los detalles del miembro
        createMember.whenUserEntersMemberDetails(memberName, memberEmail);

        // When: El usuario guarda el miembro
        createMember.whenUserSavesMember();

        // Then: El usuario verifica que el miembro esté visible en la lista de miembros
        createMember.thenMemberShouldBeVisibleInMembersList(memberName);
    });

    it('EP016 - Debería permitir ver la lista de miembros', () => {
        // Given: El usuario inicia sesión y navega a la sección de miembros
        loginPage.givenUserIsOnLoginPage();
        loginPage.whenUserLogsIn();
        loginPage.thenUserShouldSeeDashboard();

        viewMembers.givenUserIsOnMembersPage();

        // Then: El usuario verifica que haya miembros en la lista
        viewMembers.thenMembersListShouldBeVisible();
    });

    it('EP017 - Debería permitir al usuario editar un miembro existente', () => {
        // Given: El usuario inicia sesión y navega a la lista de miembros, luego selecciona un miembro para editar
        loginPage.givenUserIsOnLoginPage();
        loginPage.whenUserLogsIn();
        loginPage.thenUserShouldSeeDashboard();

        editMember.givenUserIsOnMembersPageAndSelectsMemberToEdit(memberName);

        // When: El usuario edita el nombre y el correo del miembro
        editMember.whenUserEditsMemberDetails(newMemberName, newMemberEmail);

        // When: El usuario guarda los cambios en el miembro
        editMember.whenUserSavesEditedMember();

        // Then: El usuario verifica que el miembro editado esté en la lista de miembros con el nuevo nombre
        editMember.thenMemberShouldBeUpdatedInMembersList(newMemberName);
    });

    it('EP018 - Debería permitir eliminar un miembro existente', () => {
        // Given: El usuario inicia sesión y navega a la lista de miembros, luego selecciona un miembro para eliminar
        loginPage.givenUserIsOnLoginPage();
        loginPage.whenUserLogsIn();
        loginPage.thenUserShouldSeeDashboard();

        deleteMember.givenUserIsOnMembersPageAndSelectsMemberToDelete(newMemberName);

        // When: El usuario confirma la eliminación del miembro
        deleteMember.whenUserDeletesMember();

        // Then: El usuario verifica que el miembro eliminado ya no esté en la lista de miembros
        deleteMember.thenMemberShouldNotBeVisibleInMembersList(newMemberName);
    });
});