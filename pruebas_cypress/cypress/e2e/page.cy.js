import loginPage from './pages/login';
import { CreatePage, ViewPages, ValidatePage, EditPage, DeletePage } from './pages/page';
import { faker } from '@faker-js/faker';

const createPage = new CreatePage();
const viewPages = new ViewPages();
const validatePage = new ValidatePage();
const editPage = new EditPage();
const deletePage = new DeletePage();
const pageTitle = faker.lorem.sentence();         
const pageContent = faker.lorem.paragraph();
const newPageTitle = faker.lorem.sentence();      // Nuevo título para la página
const newPageContent = faker.lorem.paragraph(); 

describe('Escenarios de pruebas para la funcionalidad páginas - Ghost', () => {

    it('EP010 - Debería permitir crear y visualizar una nueva página', () => {
        // Given: El usuario inicia sesión
        loginPage.givenUserIsOnLoginPage();
        loginPage.whenUserLogsIn();
        loginPage.thenUserShouldSeeDashboard();

        // Given: El usuario navega a la sección de páginas
        createPage.givenUserIsOnPages();

        // When: El usuario comienza a crear una nueva página
        createPage.whenUserStartsCreatingNewPage();

        // When: El usuario ingresa los detalles de la página
        createPage.whenUserEntersPageDetails(pageTitle, pageContent);

        // When: El usuario publica la página
        createPage.whenUserPublishesPage();

        // Then: El usuario valida que la página esté visible en la lista de páginas
        createPage.thenPageShouldBeVisibleInPagesList(pageTitle);
    });

    it('EP011 - Debería permitir ver una página existente en la lista de páginas', () => {
        // Given: El usuario inicia sesión y navega a la sección de páginas
        loginPage.givenUserIsOnLoginPage();
        loginPage.whenUserLogsIn();
        loginPage.thenUserShouldSeeDashboard();

        viewPages.givenUserIsOnPagesSection();

        // Then: El usuario verifica que la página con el título especificado esté visible en la lista
        viewPages.thenPageShouldBeVisible(pageTitle);
    });

    it('EP012 - Debería validar los detalles de una página existente', () => {
        // Given: El usuario inicia sesión y navega a la lista de páginas
        loginPage.givenUserIsOnLoginPage();
        loginPage.whenUserLogsIn();
        loginPage.thenUserShouldSeeDashboard();

        validatePage.givenUserIsOnPagesSection();

        // When: El usuario selecciona la página para ver sus detalles
        validatePage.whenUserSelectsPageToValidate(pageTitle);

        // Then: El usuario valida que el título y el contenido de la página coincidan con los valores esperados
        validatePage.thenPageDetailsShouldMatch(pageTitle, pageContent);

        // Then: El usuario regresa a la lista de páginas
        validatePage.thenUserGoesBackToPageList();
    });

    it('EP013 - Debería permitir al usuario editar una página existente', () => {
        // Given: El usuario inicia sesión y navega a la lista de páginas, luego selecciona una página para editar
        loginPage.givenUserIsOnLoginPage();
        loginPage.whenUserLogsIn();
        loginPage.thenUserShouldSeeDashboard();

        editPage.givenUserIsOnPagesAndSelectsPageToEdit(pageTitle);

        // When: El usuario edita el título y el contenido de la página
        editPage.whenUserEditsPageDetails(newPageTitle, newPageContent);

        // When: El usuario guarda los cambios en la página
        editPage.whenUserUpdatesPage();

        // Then: El usuario verifica que la página editada esté en la lista de páginas con el nuevo título
        editPage.thenPageShouldBeUpdatedInPagesList(newPageTitle);
    });

    it('EP014 - Debería permitir eliminar una página existente', () => {
        // Given: El usuario inicia sesión y navega a la lista de páginas, luego selecciona una página para eliminar
        loginPage.givenUserIsOnLoginPage();
        loginPage.whenUserLogsIn();
        loginPage.thenUserShouldSeeDashboard();

        deletePage.givenUserIsOnPagesAndSelectsPageToDelete(newPageTitle);

        // When: El usuario confirma la eliminación de la página
        deletePage.whenUserDeletesPage();

        // Then: El usuario verifica que la página eliminada ya no esté en la lista de páginas
        deletePage.thenPageShouldNotBeVisibleInPagesList(newPageTitle);
    });
});