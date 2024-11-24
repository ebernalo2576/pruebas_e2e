import login from './pages/login';
import { SettingsDeleteContent } from './pages/settings';
import { CreatePost, EditPost, UnpublishPost } from './pages/post';
import { faker } from '@faker-js/faker'

const settingsDeleteContent = new SettingsDeleteContent();
const createPost = new CreatePost();
const editPost = new EditPost();
const unpublishPost = new UnpublishPost();
const apiUrl = Cypress.env('API_URL')+"/page-pseudo-aleatorio.json?key=6fad6d30";

let postTitle = '';

describe('Escenarios de pruebas para la funcionalidad post - Ghost', () => {
    let aPrioriData = [];
    let aPrioriRowIndex = 0;
    let pseudoData = [];
    let pseudoRowIndex = 0;

    before(() => {
        cy.fixture('page-a-priori.json').then((page) => {
            aPrioriData = page;
        });
    });

    beforeEach(() => {
        // Restaurar la sesión antes de cada prueba y navegar al dashboard
        cy.session('user-session', () => {
            login.givenUserIsOnLoginPage(); 
            login.whenUserLogsIn();       
            login.thenUserShouldSeeDashboard(); 
        });
        cy.visit(Cypress.env('GHOST_URL') + '/ghost/#/dashboard');
        cy.wait(1000);

        postTitle = faker.lorem.sentence();         
        const postContent = faker.lorem.paragraph();
        
        // Crear post
        createPost.givenUserIsOnPostCreation();
        createPost.whenUserEntersPostDetails(postTitle, postContent);
        createPost.thenPostShouldBeVisibleInPostsList(postTitle);

        aPrioriRowIndex = Math.floor(Math.random() * aPrioriData.length);

        cy.request(apiUrl).then((response) => {
            pseudoData = response.body;

            pseudoRowIndex = Math.floor(Math.random() * pseudoData.length);
        });
    });

    afterEach(() => {
        //Eliminar todo el contenido
        cy.wait(1000);
        settingsDeleteContent.givenUserIsInSettings(); 
        settingsDeleteContent.andGivenUserOpensGeneralSection(); 
        settingsDeleteContent.whenUserDeleteAllContent(); 
        settingsDeleteContent.thenSettingsShouldDeleted(); 
    });

    it('EP005 - Debería permitir al usuario editar un post existente (Aleatorio)', () => {
        const newPostTitle = faker.lorem.sentence();  
        const newPostContent = faker.lorem.paragraph();
        // Given El usuario está en la lista de posts
        editPost.givenUserIsOnPostsList();

        // and El usuario selecciona un post para editar
        editPost.andGivenUserSelectsPostToEdit(postTitle);

        // When El usuario edita el título y el contenido del post
        editPost.whenUserEditsPostDetails(newPostTitle, newPostContent);

        // Then El post debería estar visible en la lista de posts con el nuevo título
        editPost.thenPostShouldBeUpdated(newPostTitle);
    });

    it('EP006 - Debería permitir despublicar un post existente (Aleatorio)', () => {

        // Given El usuario está en la lista de posts
        unpublishPost.givenUserIsOnPostsList();

        // When El usuario selecciona un post para despublicarlo
        unpublishPost.whenUserSelectsPostToUnpublish(postTitle);

        // Then El post no debería estar visible en la lista de posts
        unpublishPost.thenPostShouldNotBeVisibleInPostsList(postTitle);
    });

    it('EP016 - Debería sacar error al intentar editar una página con título de más de 255 carácteres (Aleatorio) ', () => {      
        
        let longTitle = faker.lorem.sentence(10);
        while (longTitle.length <= 255) {
            longTitle += ` ${faker.lorem.sentence(1)}`; 
        }
        const newPostContent = faker.lorem.paragraph();

        // Given El usuario está en la lista de posts
        editPost.givenUserIsOnPostsList();

        // and El usuario selecciona un post para editar
        editPost.andGivenUserSelectsPostToEdit(postTitle);
    
        // When El usuario edita el título y el contenido de la página
        editPost.whenUserEditsPostDetails(longTitle, newPostContent);       
    
        // Then El usuario verifica que la página editada esté en la lista de páginas con el nuevo título
        editPost.thenPostShouldNotBeVisibleInPostList(longTitle); 
    });

    it('EP059 - Debería permitir al usuario editar una página existente y poner una fecha (A-priori)', () => { 
        
        // Given El usuario está en la lista de posts
        editPost.givenUserIsOnPostsList();

        // and El usuario selecciona un post para editar
        editPost.andGivenUserSelectsPostToEdit(postTitle);
    
        // When El usuario edita el título y el contenido de la página
        editPost.whenUserEditsPostDetails(aPrioriData[aPrioriRowIndex].title, aPrioriData[aPrioriRowIndex].description, aPrioriData[aPrioriRowIndex].date);       
    
        // Then El usuario verifica que la página editada esté en la lista de páginas con el nuevo título
        editPost.thenPostShouldBeUpdated(aPrioriData[aPrioriRowIndex].title); 
    });

    it('EP060 - No debería permitir al usuario editar una página existente sin el título(Aleatorio)', () => { 
  
        const newPostContent = faker.lorem.paragraph(); 
        
        // Given El usuario está en la lista de posts
        editPost.givenUserIsOnPostsList();

        // and El usuario selecciona un post para editar
        editPost.andGivenUserSelectsPostToEdit(postTitle);
   
        // When El usuario edita el título y el contenido de la página
        editPost.whenUserEditsPostDetails('', newPostContent);       
     
        // Then El usuario verifica que la página editada esté en la lista de páginas con el nuevo título
        editPost.thenPostShouldBeUpdated(''); 
    });

    it('EP061 - No debería permitir al usuario editar una página existente sin el contenido (Aleatorio)', () => { 
        
        const newpostTitle = faker.lorem.sentence();  
        
        // Given El usuario está en la lista de posts
        editPost.givenUserIsOnPostsList();

        // and El usuario selecciona un post para editar
        editPost.andGivenUserSelectsPostToEdit(postTitle);
   
        // When El usuario edita el título y el contenido de la página
        editPost.whenUserEditsPostDetails(newpostTitle, '');       
     
        // Then El usuario verifica que la página editada esté en la lista de páginas con el nuevo título
        editPost.thenPostShouldBeUpdated(newpostTitle); 
    });

    it('EP062 - No debería permitir al usuario editar una página existente sin autor (A-priori)', () => { 
        
        // Given El usuario está en la lista de posts
        editPost.givenUserIsOnPostsList();

        // and El usuario selecciona un post para editar
        editPost.andGivenUserSelectsPostToEdit(postTitle);
    
        // When El usuario edita el título y el contenido de la página
        editPost.whenUserEditsPostDetails(aPrioriData[aPrioriRowIndex].title, aPrioriData[aPrioriRowIndex].description, aPrioriData[aPrioriRowIndex].date, false);       
    
        // Then El usuario verifica que la página editada esté en la lista de páginas con el nuevo título
        editPost.thenPostShouldNotBeVisibleInPostList(aPrioriData[aPrioriRowIndex].title); 
    });

    it('EP063 - Debería permitir al usuario editar una página existente y poner una fecha (Pseudo-aletorio)', () => { 
        
        // Given El usuario está en la lista de posts
        editPost.givenUserIsOnPostsList();

        // and El usuario selecciona un post para editar
        editPost.andGivenUserSelectsPostToEdit(postTitle);
    
        // When El usuario edita el título y el contenido de la página
        editPost.whenUserEditsPostDetails(pseudoData[pseudoRowIndex].title, pseudoData[pseudoRowIndex].description, pseudoData[pseudoRowIndex].date);       
    
        // Then El usuario verifica que la página editada esté en la lista de páginas con el nuevo título
        editPost.thenPostShouldBeUpdated(pseudoData[pseudoRowIndex].title); 
    });

    it('EP064 - No debería permitir al usuario editar una página existente sin autor (Pseudo-aletorio)', () => { 
        
        // Given El usuario está en la lista de posts
        editPost.givenUserIsOnPostsList();

        // and El usuario selecciona un post para editar
        editPost.andGivenUserSelectsPostToEdit(postTitle); 
    
        // When El usuario edita el título y el contenido de la página
        editPost.whenUserEditsPostDetails(pseudoData[pseudoRowIndex].title, pseudoData[pseudoRowIndex].description, pseudoData[pseudoRowIndex].date, false);       
    
        // Then El usuario verifica que la página editada esté en la lista de páginas con el nuevo título
        editPost.thenPostShouldNotBeVisibleInPostList(pseudoData[pseudoRowIndex].title); 
    });

    it('EP065 - No debería permitir al usuario editar una sin título y sin contenido (Aleatorio)', () => { 
      
        // Given El usuario está en la lista de posts
        editPost.givenUserIsOnPostsList();

        // and El usuario selecciona un post para editar
        editPost.andGivenUserSelectsPostToEdit(postTitle);
    
        // When El usuario edita el título y el contenido de la página
        editPost.whenUserEditsPostDetails('', '');       
    
        // Then El usuario verifica que la página editada esté en la lista de páginas con el nuevo título
        editPost.thenPostShouldBeUpdated(''); 
    });

    it('EP066 - Debería permitir al usuario editar una página existente con un título con carácteres especiales (Aleatorio)', () => { 
        const specialCharacters = '!@#$%^&*)_+}|:<>?];~';
        const length = 50; 

        const newPostTitle = Array.from({ length }, () =>
            faker.helpers.arrayElement(specialCharacters.split(''))
        ).join('');

        const newPostContent = faker.lorem.paragraph(); 
        // Given El usuario está en la lista de posts
        editPost.givenUserIsOnPostsList();

        // and El usuario selecciona un post para editar
        editPost.andGivenUserSelectsPostToEdit(postTitle);
    
        // When El usuario edita el título y el contenido de la página
        editPost.whenUserEditsPostDetails(newPostTitle, newPostContent);       
    
        // Then El usuario verifica que la página editada esté en la lista de páginas con el nuevo título
        editPost.thenPostShouldBeUpdated(newPostTitle); 
    });

    it('EP067 - No debería permitir al usuario editar una página existente con contenido con carácteres especiales(Aleatorio)', () => { 

        const specialCharacters = '!@#$%^&*)_+}|:<>?];~';
        const length = 50; 

        const newPostTitle = faker.lorem.sentence();  
        const newPostContent = Array.from({ length }, () =>
            faker.helpers.arrayElement(specialCharacters.split(''))
        ).join('');
    
        // Given El usuario está en la lista de posts
        editPost.givenUserIsOnPostsList();

        // and El usuario selecciona un post para editar
        editPost.andGivenUserSelectsPostToEdit(postTitle);
    
        // When El usuario edita el título y el contenido de la página
        editPost.whenUserEditsPostDetails(newPostTitle, newPostContent);       
    
        // Then El usuario verifica que la página editada esté en la lista de páginas con el nuevo newPostTitle
        editPost.thenPostShouldBeUpdated(newpostTitle); 
    });
    
});