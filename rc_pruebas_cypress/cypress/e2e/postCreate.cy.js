import login from './pages/login';
import { CreatePost } from './pages/post';
import { faker } from '@faker-js/faker'
import { SettingsDeleteContent } from './pages/settings';


const createPost = new CreatePost();
const settingsDeleteContent = new SettingsDeleteContent();
const apiUrl = Cypress.env('API_URL')+"/posts-pseudo-aleatorio.json?key=34c634a0";

const postTitle = faker.lorem.sentence();
const postContent = faker.lorem.paragraph();
const newTitle = faker.lorem.sentence();
const newContent = faker.lorem.paragraph();

describe('Escenarios de pruebas para la funcionalidad post - Ghost', () => {
    Cypress.on('uncaughtexception', (err) => {
        if (err.message.includes('TransitionAborted')) {
            return false; 
        }
    });

    let aPrioriData = [];
    let aPrioriRowIndex = 0;
    let pseudoData = [];
    let pseudoRowIndex = 0;

    before(() => {
        cy.fixture('post-a-priori.json').then((post) => {
            aPrioriData = post;
        });
    });

    beforeEach(() => {
        // Restaurar la sesión antes de cada prueba y navegar alZ dashboard
        cy.session('user-session', () => {
            login.givenUserIsOnLoginPage(); 
            login.whenUserLogsIn();       
            login.thenUserShouldSeeDashboard(); 
        });
        cy.visit(Cypress.env('GHOST_URL') + '/ghost/#/dashboard');
        cy.wait(1000);

        aPrioriRowIndex = Math.floor(Math.random() * aPrioriData.length);

        cy.request(apiUrl).then((response) => {
            pseudoData = response.body;
            cy.log(pseudoData);
            pseudoRowIndex = Math.floor(Math.random() * pseudoData.length);
        });
    });

    afterEach(() => {
        //Eliminar todo el contenido
        /*cy.wait(1000);
        settingsDeleteContent.givenUserIsInSettings(); 
        settingsDeleteContent.andGivenUserOpensGeneralSection(); 
        settingsDeleteContent.whenUserDeleteAllContent(); 
        settingsDeleteContent.thenSettingsShouldDeleted(); 
        */
    });

    it('EP002 - Debería permitir crear un post con un título y descripción (Aleatorio)', () => {

        // Given El usuario está en la página de creación de posts
        createPost.givenUserIsOnPostCreation();

        // When El usuario introduce el título y el contenido del post
        createPost.whenUserEntersPostDetails(postTitle, postContent, '', true, false);

        // Then El post debería estar visible en la lista de posts
        createPost.thenPostShouldBeVisibleInPostsList(postTitle);
    });

    it('EP069 - Debería permitir crear un post con un título de menos de 255 carácteres (A-priori)', () => {

        // Given El usuario navega a la sección de páginas
        createPost.givenUserIsOnPostCreation();

        // When El usuario ingresa los detalles de la página
        createPost.whenUserEntersPostDetails(aPrioriData[aPrioriRowIndex].title, aPrioriData[aPrioriRowIndex].body);

        // Then El usuario valida que la página esté visible en la lista de páginas
        createPost.thenPostShouldBeVisibleInPostsList(aPrioriData[aPrioriRowIndex].title);
    });

    it('EP070 - No debería permitir crear un post con un título de más de 255 carácteres (Aleatorio)', () => {

        let longTitle = faker.lorem.sentence(10);
        while (longTitle.length <= 255) {
            longTitle += ` ${faker.lorem.sentence(1)}`; 
        }
        const pageContent = faker.lorem.paragraph();

        // Given El usuario navega a la sección de páginas
        createPost.givenUserIsOnPostCreation();

        // When El usuario ingresa los detalles de la página
        createPost.whenUserEntersPostDetails(longTitle, pageContent);

        // Then El usuario valida que la página no esté visible en la lista de páginas
        createPost.thenPostShouldNotBeVisibleInPostsList(longTitle);
    });

    it('EP071 - Debería validar que un post no se pueda crear con título vacío (Aleatorio)', () => {

        const pageContent = faker.lorem.paragraph();

        // Given El usuario navega a la sección de páginas
        createPost.givenUserIsOnPostCreation();

        // When El usuario ingresa los detalles de la página
        createPost.whenUserEntersPostDetails('', pageContent);


        // Then El usuario valida que la página esté visible en la lista de páginas
        createPost.thenPostShouldBeVisibleInPostsList('');
    });

    it('EP072 - Debería validar que un post no se pueda crear con contenido vacío (Aleatorio)', () => {

        const pageTitle = faker.lorem.sentence(); 

        // Given El usuario navega a la sección de páginas
        createPost.givenUserIsOnPostCreation();

        // When El usuario ingresa los detalles de la página
        createPost.whenUserEntersPostDetails(pageTitle, '');

        // Then El usuario valida que la página esté visible en la lista de páginas
        createPost.thenPostShouldBeVisibleInPostsList(pageTitle);
    });

    it('EP073 - Debería permitir crear un post con fecha (A-priori)', () => {

        // Given El usuario navega a la sección de páginas
        createPost.givenUserIsOnPostCreation();

        // When El usuario ingresa los detalles de la página
        createPost.whenUserEntersPostDetails(aPrioriData[aPrioriRowIndex].title, aPrioriData[aPrioriRowIndex].body, aPrioriData[aPrioriRowIndex].date);

        // Then El usuario valida que la página esté visible en la lista de páginas
        createPost.thenPostShouldBeVisibleInPostsList(aPrioriData[aPrioriRowIndex].title);
    });

    it('EP074 - No debería permitir crear un post sin autor (A-priori)', () => {

        // Given El usuario navega a la sección de páginas
        createPost.givenUserIsOnPostCreation();

        // When El usuario ingresa los detalles de la página
        createPost.whenUserEntersPostDetails(aPrioriData[aPrioriRowIndex].title, aPrioriData[aPrioriRowIndex].body, aPrioriData[aPrioriRowIndex].date, false);

        // Then El usuario valida que la página esté visible en la lista de páginas
        createPost.thenPostShouldNotBeVisibleInPostsList(aPrioriData[aPrioriRowIndex].title, false);
    });

    it('EP075 - Debería permitir crear un post con fecha (Pseudo-aletorio)', () => {

        // Given El usuario navega a la sección de páginas
        createPost.givenUserIsOnPostCreation();

        // When El usuario ingresa los detalles de la página
        createPost.whenUserEntersPostDetails(pseudoData[pseudoRowIndex].title, pseudoData[pseudoRowIndex].body, pseudoData[pseudoRowIndex].date);

        // Then El usuario valida que la página esté visible en la lista de páginas
        createPost.thenPostShouldBeVisibleInPostsList(pseudoData[pseudoRowIndex].title);
    });

    it('EP076 - No debería permitir crear un post sin autor (Pseudo-aletorio)', () => {

        // Given El usuario navega a la sección de páginas
        createPost.givenUserIsOnPostCreation();

        // When El usuario ingresa los detalles de la página
        createPost.whenUserEntersPostDetails(pseudoData[pseudoRowIndex].title, pseudoData[pseudoRowIndex].body, pseudoData[pseudoRowIndex].date, false);

        // Then El usuario valida que la página esté visible en la lista de páginas
        createPost.thenPostShouldNotBeVisibleInPostsList(pseudoData[pseudoRowIndex].title, false);
    });

    it('EP077 - Debería permitir crear un post con un título de menos de 255 carácteres (Pseudo-aletorio)', () => {

        // Given El usuario navega a la sección de páginas
        createPost.givenUserIsOnPostCreation();

        // When El usuario ingresa los detalles de la página
        createPost.whenUserEntersPostDetails(pseudoData[pseudoRowIndex].title, pseudoData[pseudoRowIndex].body);

        // Then El usuario valida que la página esté visible en la lista de páginas
        createPost.thenPostShouldBeVisibleInPostsList(pseudoData[pseudoRowIndex].title);
    });

    it('EP078 - No debería permitir crear un post sin título y sin contenido (Aletorio)', () => {

        const pageTitle = faker.lorem.sentence();         
        const pageContent = faker.lorem.paragraph();

        // Given El usuario navega a la sección de páginas
        createPost.givenUserIsOnPostCreation();

        // When El usuario ingresa los detalles de la página
        createPost.whenUserEntersPostDetails(pageTitle, pageContent, '', true, true);

        // Then El usuario valida que la página esté visible en la lista de páginas
        createPost.thenPostShouldBeVisibleInPostsList('');
    });

    it('EP079 - No debería permitir crear un post con un título con carácteres especiales (Aleatorio)', () => {

        const specialCharacters = '!@#$%^&*)_+}|:<>?];~';
        const length = 50; 

        const pageTitle = Array.from({ length }, () =>
            faker.helpers.arrayElement(specialCharacters.split(''))
        ).join('');
     
        const pageContent = faker.lorem.paragraph();

        // Given El usuario navega a la sección de páginas
        createPost.givenUserIsOnPostCreation();

        // When El usuario ingresa los detalles de la página
        createPost.whenUserEntersPostDetails(pageTitle, pageContent);


        // Then El usuario valida que la página esté visible en la lista de páginas
        createPost.thenPostShouldBeVisibleInPostsList(pageTitle);
    });

    it('EP080 - Debería permitir crear un post con contenido con carácteres especiales (Aleatorio)', () => {

        const specialCharacters = '!@#$%^&*)_+}|:<>?];~';
        const length = 50; 

        const pageTitle = faker.lorem.sentence(); 
        const pageContent = Array.from({ length }, () =>
            faker.helpers.arrayElement(specialCharacters.split(''))
        ).join('');

        // Given El usuario navega a la sección de páginas
        createPost.givenUserIsOnPostCreation();

        // When El usuario ingresa los detalles de la página
        createPost.whenUserEntersPostDetails(pageTitle, pageContent);


        // Then El usuario valida que la página esté visible en la lista de páginas
        createPost.thenPostShouldBeVisibleInPostsList(pageTitle);
    });

    it('EP081 - No Debería permitir crear un post con título que supera el límite de caracteres (Aleatorio)', () => {

        let longTitle = faker.lorem.sentence(1000);
        while (longTitle.length <=  524288) {
            longTitle += ` ${faker.lorem.sentence(1)}`; 
        }
        const pageContent = faker.lorem.paragraph();

        // Given El usuario navega a la sección de páginas
        createPost.givenUserIsOnPostCreation();

        // When El usuario ingresa los detalles de la página
        createPost.whenUserEntersPostDetails(longTitle, pageContent);

        // Then El usuario valida que la página no esté visible en la lista de páginas
        createPost.thenPostShouldNotBeVisibleInPostsList(longTitle);

    });

    
    
});