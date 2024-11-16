import loginPage from './pages/login';
import { CreatePage, EditPage } from './pages/page';
import { faker } from '@faker-js/faker';

const createPage = new CreatePage();
const editPage = new EditPage();
const pageTitle = faker.lorem.sentence();         
const pageContent = faker.lorem.paragraph();
const newPageTitle = faker.lorem.sentence();  
const newPageContent = faker.lorem.paragraph(); 

describe('Escenarios de pruebas para la funcionalidad páginas - Ghost', () => {

    it('EP011 - Debería permitir crear y visualizar una nueva página', () => {
        // Precondición inicio de sesión para ejecutar el escenario de prueba
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

    it('EP014 - Debería permitir al usuario editar una página existente', () => {
        // Precondición inicio de sesión para ejecutar el escenario de prueba
        loginPage.givenUserIsOnLoginPage();       
        loginPage.whenUserLogsIn();                
        loginPage.thenUserShouldSeeDashboard();    

        // Given: El usuario navega a la lista de páginas y selecciona una página para editar
        editPage.givenUserIsOnPagesAndSelectsPageToEdit(pageTitle); 
    
        // When: El usuario edita el título y el contenido de la página
        editPage.whenUserEditsPageDetails(newPageTitle, newPageContent);

        // When: El usuario guarda los cambios en la página
        editPage.whenUserUpdatesPage();          
    
        // Then: El usuario verifica que la página editada esté en la lista de páginas con el nuevo título
        editPage.thenPageShouldBeUpdatedInPagesList(newPageTitle); 
    });

});