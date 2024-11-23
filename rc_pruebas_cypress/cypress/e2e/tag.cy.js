import loginPage from './pages/login';
import { CreateTag, EditTag, DeleteTag } from './pages/tag';
import { faker } from '@faker-js/faker'

const createTag = new CreateTag();
const editTag = new EditTag();
const deleteTag = new DeleteTag();
const tagName = faker.commerce.productName();         
const tagDescription = faker.lorem.sentence();
const newTagName = faker.commerce.productName(); 
const newTagDescription = faker.lorem.sentence();       


const apiUrl = Cypress.env('MEMBERS_API_URL');

describe('Escenarios de pruebas para la funcionalidad miembros - Ghost', () => {

    let aPrioriData = [];
    let aPrioriRowIndex = 0;
    let pseudoData = [];
    let pseudoRowIndex = 0;

    before(() => {
        // Configuración inicial de sesión
        cy.session('user-session', () => {
            loginPage.givenUserIsOnLoginPage(); // Navegar a la página de inicio de sesión
            loginPage.whenUserLogsIn();        // Iniciar sesión
            loginPage.thenUserShouldSeeDashboard(); // Confirmar que el dashboard se cargó
        });

         // Leer datos del archivo CSV (a priori) antes de las pruebas
         cy.fixture('members-a-priori.json').then((members) => {
            aPrioriData = members;
        });
    });

    beforeEach(() => {
        // Restaurar la sesión antes de cada prueba y navegar al dashboard
        cy.session('user-session', () => {
            loginPage.givenUserIsOnLoginPage(); // Navegar a la página de inicio de sesión
            loginPage.whenUserLogsIn();        // Iniciar sesión
            loginPage.thenUserShouldSeeDashboard(); // Confirmar que el dashboard se cargó
        });
        cy.visit(Cypress.env('GHOST_URL') + '/ghost/#/dashboard'); // Navegar al dashboard
        
        cy.log(aPrioriData);
        console.log(aPrioriData);
        // Seleccionar un índice aleatorio de la lista de datos a priori
        aPrioriRowIndex = Math.floor(Math.random() * aPrioriData.length);

        // Hacer peticion a la API de mockaroo
        cy.request(apiUrl).then((response) => {
            // Guardar los datos de la API en pseudoData
            pseudoData = response.body;
            
            // Seleccionar un índice aleatorio de la lista de datos pseudo-aleatorios
            pseudoRowIndex = Math.floor(Math.random() * pseudoData.length);

            console.log(pseudoRowIndex)
            console.log(pseudoData[pseudoRowIndex])


        });

        cy.wait(1000);
    });
    // it('EP017 - Debería permitir crear y visualizar un nuevo miembro (A priori)', () => {
    //     // Precondición inicio de sesión para ejecutar el escenario de prueba
    //     // loginPage.givenUserIsOnLoginPage();
    //     // loginPage.whenUserLogsIn();
    //     // loginPage.thenUserShouldSeeDashboard();

    //     // Given El usuario navega a la sección de miembros
    //     createMember.givenUserIsOnMembersPage();

    //     // When El usuario comienza a crear un nuevo miembro
    //     createMember.andGivenUserStartsCreatingNewMember();

    //     // And El usuario ingresa los detalles del miembro
    //     createMember.whenUserEntersMemberDetails(memberName, memberEmail);

    //     // Then El usuario verifica que el miembro esté visible en la lista de miembros
    //     createMember.thenMemberShouldBeVisibleInMembersList(memberName);
    // });


});