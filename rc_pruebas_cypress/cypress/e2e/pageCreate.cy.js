import loginPage from './pages/login';
import { CreatePage } from './pages/page';
import { faker } from '@faker-js/faker';
import { SettingsDeleteContent } from './pages/settings';

const createPage = new CreatePage();
const settingsDeleteContent = new SettingsDeleteContent();

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


    it('EP011 - Debería permitir crear y visualizar una nueva página', () => {

        const pageTitle = faker.lorem.sentence();         
        const pageContent = faker.lorem.paragraph();

        // Given El usuario navega a la sección de páginas
        createPage.givenUserIsOnPages();

        // and El usuario comienza a crear una nueva página
        createPage.andGivenUserStartsCreatingNewPage();

        // When El usuario ingresa los detalles de la página
        createPage.whenUserEntersPageDetails(pageTitle, pageContent);


        // Then El usuario valida que la página esté visible en la lista de páginas
        createPage.thenPageShouldBeVisibleInPagesList(pageTitle);
    });

    it('EP045 - Debería permitircrear una página con un título de menos de 255 carácteres (A-priori)', () => {

        // Given El usuario navega a la sección de páginas
        createPage.givenUserIsOnPages();

        // and El usuario comienza a crear una nueva página
        createPage.andGivenUserStartsCreatingNewPage();

        // When El usuario ingresa los detalles de la página
        createPage.whenUserEntersPageDetails(aPrioriData[aPrioriRowIndex].title, aPrioriData[aPrioriRowIndex].description);

        // Then El usuario valida que la página esté visible en la lista de páginas
        createPage.thenPageShouldBeVisibleInPagesList(aPrioriData[aPrioriRowIndex].title);
    });

    it('EP046 - No debería permitir crear una página con un título de más de 255 carácteres (Aleatorio)', () => {

        let longTitle = faker.lorem.sentence(10);
        while (longTitle.length <= 255) {
            longTitle += ` ${faker.lorem.sentence(1)}`; 
        }
        const pageContent = faker.lorem.paragraph();

        // Given El usuario navega a la sección de páginas
        createPage.givenUserIsOnPages();

        // and El usuario comienza a crear una nueva página
        createPage.andGivenUserStartsCreatingNewPage();

        // When El usuario ingresa los detalles de la página
        createPage.whenUserEntersPageDetails(longTitle, pageContent);

        // Then El usuario valida que la página no esté visible en la lista de páginas
        createPage.thenPageShouldNotBeVisibleInPageList(longTitle);
    });
});