import loginPage from './pages/login';
import { SettingsDeleteContent } from './pages/settings';
import { CreatePage, EditPage, UnpublishPage } from './pages/page';
import { faker } from '@faker-js/faker';

const settingsDeleteContent = new SettingsDeleteContent();
const createPage = new CreatePage();
const editPage = new EditPage();
const unpublishPage = new UnpublishPage();

let pageTitle = '';         

describe('Escenarios de pruebas para la funcionalidad páginas - Ghost', () => {

    let aPrioriData = [];
    let aPrioriRowIndex = 0;

    before(() => {
        cy.fixture('page-a-priori.json').then((page) => {
            aPrioriData = page;
        });
    });

    beforeEach(() => {
        // Restaurar la sesión antes de cada prueba y navegar al dashboard
        cy.session('user-session', () => {
            loginPage.givenUserIsOnLoginPage(); 
            loginPage.whenUserLogsIn();       
            loginPage.thenUserShouldSeeDashboard(); 
        });
        cy.visit(Cypress.env('GHOST_URL') + '/ghost/#/dashboard');
        cy.wait(1000);

        pageTitle = faker.lorem.sentence();         
        const pageContent = faker.lorem.paragraph();
        
        // Crear página
        createPage.givenUserIsOnPages();
        createPage.andGivenUserStartsCreatingNewPage();
        createPage.whenUserEntersPageDetails(pageTitle, pageContent);
        createPage.thenPageShouldBeVisibleInPagesList(pageTitle);
        createPage.givenUserIsOnPages();

        aPrioriRowIndex = Math.floor(Math.random() * aPrioriData.length);
    });

    after(() => {
        //Eliminar todo el contenido
        cy.wait(1000);
        settingsDeleteContent.givenUserIsInSettings(); 
        settingsDeleteContent.andGivenUserOpensGeneralSection(); 
        settingsDeleteContent.whenUserDeleteAllContent(); 
        settingsDeleteContent.thenSettingsShouldDeleted(); 
    });

    it('EP014 - Debería permitir al usuario editar una página existente (Aleatorio)', () => { 
        cy.log(pageTitle)
        const newPageTitle = faker.lorem.sentence();  
        const newPageContent = faker.lorem.paragraph(); 
        // Given El usuario navega a la lista de páginas y selecciona una página para editar
        editPage.givenUserIsOnPagesAndSelectsPageToEdit(pageTitle); 
    
        // When El usuario edita el título y el contenido de la página
        editPage.whenUserEditsPageDetails(newPageTitle, newPageContent);       
    
        // Then El usuario verifica que la página editada esté en la lista de páginas con el nuevo título
        editPage.thenPageShouldBeUpdatedInPagesList(newPageTitle); 
    });

    it('EP015 - Debería permitir despublicar una página existente (Aleatorio)', () => {      
    
        // Given El usuario navega a la lista de páginas y selecciona la página para despublicar
        unpublishPage.givenUserIsOnPagesAndSelectsPageToUnpublish(pageTitle);
    
        // When El usuario cambia el estado de la página a borrador
        unpublishPage.whenUserUnpublishesPage();     
    
        // Then El usuario verifica que la página esté en estado de borrador en la lista de páginas
        unpublishPage.thenPageShouldBeInDraftState(pageTitle);
    });

    it('EP016 - Debería sacar error al intentar editar una página con título de más de 255 carácteres (Aleatorio) ', () => {      
        
        let longTitle = faker.lorem.sentence(10);
        while (longTitle.length <= 255) {
            longTitle += ` ${faker.lorem.sentence(1)}`; 
        }
        const newPageContent = faker.lorem.paragraph();

        // Given El usuario navega a la lista de páginas y selecciona una página para editar
        editPage.givenUserIsOnPagesAndSelectsPageToEdit(pageTitle); 
    
        // When El usuario edita el título y el contenido de la página
        editPage.whenUserEditsPageDetails(longTitle, newPageContent);       
    
        // Then El usuario verifica que la página editada esté en la lista de páginas con el nuevo título
        editPage.thenPageShouldNotBeVisibleInPageList(longTitle); 
    });

});