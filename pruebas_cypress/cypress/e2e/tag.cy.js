import login from './pages/login';
import { CreateTag, EditTag, DeleteTag } from './pages/tag';
import { faker } from '@faker-js/faker'

const createTag = new CreateTag();
const editTag = new EditTag();
const deleteTag = new DeleteTag();
const tagName = faker.commerce.productName();         
const tagDescription = faker.lorem.sentence();
const newTagName = faker.commerce.productName();          // Nuevo nombre del tag
const newTagDescription = faker.lorem.sentence();       

describe('Escenarios de pruebas para la funcionalidad tags - Ghost', () => {
    Cypress.on('uncaught:exception', (err) => {
        if (err.message.includes('TransitionAborted')) {
            return false; 
        }
    });

    it('EP007 - Debería permitir crear y visualizar un nuevo tag', () => {
        login.givenUserIsOnLoginPage();
        login.whenUserLogsIn();
        login.thenUserShouldSeeDashboard();

        // Given: El usuario navega a la página de tags
        createTag.givenUserIsOnTags();

        // When: El usuario comienza a crear un nuevo tag
        createTag.whenUserStartsCreatingNewTag();

        // When: El usuario ingresa los detalles del tag
        createTag.whenUserEntersTagDetails(tagName, tagDescription);

        // When: El usuario guarda el tag
        createTag.whenUserSavesTag();

        // Then: El usuario valida que el tag esté visible en la lista de tags
        createTag.thenTagShouldBeVisibleInTagsList(tagName);
    });

    it('EP008 - Debería permitir editar un tag existente', () => {
        login.givenUserIsOnLoginPage();
        login.whenUserLogsIn();
        login.thenUserShouldSeeDashboard();

        // Given: El usuario está en la página de tags y selecciona el tag a editar
        editTag.givenUserIsOnTagsPageAndSelectsTagToEdit(tagName);

        // When: El usuario modifica el nombre y descripción del tag
        editTag.whenUserEditsTagDetails(newTagName, newTagDescription);

        // When: El usuario guarda los cambios del tag
        editTag.whenUserSavesTagChanges();

        // Then: El usuario verifica que el tag se haya actualizado en la lista de tags
        editTag.thenTagShouldBeUpdatedInTagsList(newTagName);
    });

    it('EP009 - Debería permitir eliminar un tag y verificar que ya no esté en la lista', () => {
        login.givenUserIsOnLoginPage();
        login.whenUserLogsIn();
        login.thenUserShouldSeeDashboard();
        // Given: El usuario está en la página de tags y selecciona el tag a eliminar
        deleteTag.givenUserIsOnTagsPageAndSelectsTagToDelete(newTagName);

        // When: El usuario elimina el tag
        deleteTag.whenUserDeletesTag();

        // Then: El usuario verifica que el tag ya no esté en la lista de tags
        deleteTag.thenTagShouldNotBeVisibleInTagsList(newTagName);
    });
});