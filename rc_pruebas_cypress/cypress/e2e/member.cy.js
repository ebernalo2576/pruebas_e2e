import loginPage from './pages/login';
import { CreateMember, ViewMembers, EditMember, DeleteMember } from './pages/member';
import { faker } from '@faker-js/faker';
import axios from 'axios';


const createMember = new CreateMember();
const viewMembers = new ViewMembers();
const editMember = new EditMember();
const deleteMember = new DeleteMember();
const memberName = faker.person.fullName();
const memberEmail = faker.internet.email();
const newMemberName = faker.person.fullName(); 
const newMemberEmail = faker.internet.email(); 

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

        // Hacer peticion a la API de mockaroo con axios
        cy.request("https://my.api.mockaroo.com/a_priori.json?key=99771540").then((response) => {
            // Guardar los datos de la API en pseudoData
            pseudoData = response.body;
            
            // Log de datos pseudo-aleatorios
            cy.log(pseudoData);
            console.log(pseudoData);
            console.log(pseudoData.length);
    
            // Seleccionar un índice aleatorio de la lista de datos pseudo-aleatorios
            pseudoRowIndex = Math.floor(Math.random() * pseudoData.length);

            console.log(pseudoRowIndex)
            console.log(pseudoData[pseudoRowIndex])


        });

        cy.wait(1000);
    });



    
/*     it('EP017 - Debería permitir crear y visualizar un nuevo miembro', () => {
        // Precondición inicio de sesión para ejecutar el escenario de prueba
        // loginPage.givenUserIsOnLoginPage();
        // loginPage.whenUserLogsIn();
        // loginPage.thenUserShouldSeeDashboard();

        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();

        // And El usuario ingresa los detalles del miembro
        createMember.whenUserEntersMemberDetails(memberName, memberEmail);

        // Then El usuario verifica que el miembro esté visible en la lista de miembros
        createMember.thenMemberShouldBeVisibleInMembersList(memberName);
    });

    it('EP018 - Debería permitir ver la lista de miembros', () => {
        // Precondición inicio de sesión para ejecutar el escenario de prueba
        // loginPage.givenUserIsOnLoginPage();        
        // loginPage.whenUserLogsIn();                    
        // loginPage.thenUserShouldSeeDashboard();   
    
        // Given El usuario navega a la sección de miembros
        viewMembers.givenUserIsOnMembersPage();  
    
        // When El usuario visualiza la lista de miembros
        viewMembers.whenUserViewsMembersList();   
    
        // Then El usuario verifica que haya miembros en la lista
        viewMembers.thenMembersListShouldBeVisible();  
    });

    it('EP019 - Debería permitir al usuario editar un miembro existente', () => {
        // Precondición inicio de sesión para ejecutar el escenario de prueba
        // loginPage.givenUserIsOnLoginPage();          
        // loginPage.whenUserLogsIn();                
        // loginPage.thenUserShouldSeeDashboard();      
    
        // Given El usuario navega a la lista de miembros y selecciona un miembro específico para editar
        editMember.givenUserIsOnMembersPageAndSelectsMemberToEdit(memberName);
    
        // When El usuario edita el nombre y el correo del miembro
        editMember.whenUserEditsMemberDetails(newMemberName, newMemberEmail);  
    
        // Then El usuario verifica que el miembro editado esté en la lista de miembros con el nuevo nombre
        editMember.thenMemberShouldBeUpdatedInMembersList(newMemberName); 
    });

    it('EP020 - Debería permitir eliminar un miembro existente', () => {
        // Precondición inicio de sesión para ejecutar el escenario de prueba
        // loginPage.givenUserIsOnLoginPage();            
        // loginPage.whenUserLogsIn();                    
        // loginPage.thenUserShouldSeeDashboard();       
    
        // Given El usuario navega a la lista de miembros y selecciona un miembro específico para eliminar
        deleteMember.givenUserIsOnMembersPageAndSelectsMemberToDelete(newMemberName); 
    
        // When El usuario confirma la eliminación del miembro
        deleteMember.whenUserDeletesMember();        
    
        // Then El usuario verifica que el miembro eliminado ya no esté en la lista de miembros
        deleteMember.thenMemberShouldNotBeVisibleInMembersList(newMemberName);
    }); */

    //Debería rechazar la creación de un miembro con un email duplicado. (A priori)
    it('EP022 - Debería rechazar la creación de un miembro con un email duplicado (A priori)', () => {    
        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();
    
        // And El usuario ingresa los detalles del miembro 
        createMember.whenUserEntersMemberDetails(aPrioriData[aPrioriRowIndex].memberName, aPrioriData[aPrioriRowIndex].memberEmail);   
        
        // And El usuario vuelve a la seccion de miembros
        createMember.givenUserIsOnMembersPage();

        // And El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();
        

        // And El usuario ingresa los detalles del miembro con un email duplicado
        createMember.whenUserEntersMemberDetails(aPrioriData[aPrioriRowIndex].memberName, aPrioriData[aPrioriRowIndex].memberEmail);
    
        // Then El usuario debería ver un mensaje de error que indica que el email ya existe
        deleteMember.thenUserShouldSeeDuplicatedEmailError();
    });

    //Debería rechazar la creación de un miembro con un email duplicado. (Pseudo-aletorio)
    it('EP023 - Debería rechazar la creación de un miembro con un email duplicado (Pseudo-aletorio)', () => {    
        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();
    
        
        console.log(pseudoData[pseudoRowIndex])

        // And El usuario ingresa los detalles del miembro 
        createMember.whenUserEntersMemberDetails(pseudoData[pseudoRowIndex].memberName, pseudoData[pseudoRowIndex].memberEmail);   
        
        // And El usuario vuelve a la seccion de miembros
        createMember.givenUserIsOnMembersPage();
        
        // And El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();

        // And El usuario ingresa los detalles del miembro con un email duplicado
        createMember.whenUserEntersMemberDetails(pseudoData[pseudoRowIndex].memberName, pseudoData[pseudoRowIndex].memberEmail);
    
        // Then El usuario debería ver un mensaje de error que indica que el email ya existe
        deleteMember.thenUserShouldSeeDuplicatedEmailError();
    });
    //Debería rechazar la creación de un miembro con un email duplicado. (Aleatorio)
    it('EP024 - Debería rechazar la creación de un miembro con un email duplicado (aletorio)', () => { 
        const memberName = faker.person.fullName();
        const memberEmail = faker.internet.email();

        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();
    
        // And El usuario ingresa los detalles del miembro 
        createMember.whenUserEntersMemberDetails(memberName, memberEmail);   
        
        // And El usuario vuelve a la seccion de miembros
        createMember.givenUserIsOnMembersPage();

        // And El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();

        // And El usuario ingresa los detalles del miembro con un email duplicado
        createMember.whenUserEntersMemberDetails(memberName, memberEmail);
    
        // Then El usuario debería ver un mensaje de error que indica que el email ya existe
        deleteMember.thenUserShouldSeeDuplicatedEmailError();
    });


    //Debería rechazar la edición de un miembro con un email duplicado. (A priori)
    it('EP025 - Debería rechazar la edición de un miembro con un email duplicado (A priori)', () => {    
        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();
    
        // And El usuario ingresa los detalles del miembro 
        createMember.whenUserEntersMemberDetails(aPrioriData[aPrioriRowIndex].memberName, aPrioriData[aPrioriRowIndex].memberEmail); 
        
        // And El usuario vuelve a la seccion de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();
    
        // And El usuario ingresa los detalles del miembro 
        createMember.whenUserEntersMemberDetails(aPrioriData[aPrioriRowIndex-1].memberName, aPrioriData[aPrioriRowIndex-1].memberEmail); 
                
        // Given El usuario navega a la lista de miembros y selecciona un miembro específico para editar
        editMember.givenUserIsOnMembersPageAndSelectsMemberToEdit(aPrioriData[aPrioriRowIndex].memberName);

        // When El usuario edita el miembro con un email duplicado
        editMember.whenUserEditsMemberDetails(aPrioriData[aPrioriRowIndex-1].memberName, aPrioriData[aPrioriRowIndex-1].memberEmail);  
       
        // Then El usuario debería ver un mensaje de error que indica que el email ya existe
        deleteMember.thenUserShouldSeeDuplicatedEmailError();
    });
    //Debería rechazar la edición de un miembro con un email duplicado. (Pseudo-aletorio)
    //Debería rechazar la edición de un miembro con un email duplicado. (Aleatorio)



    //Debería mostrar un error al intentar crear un miembro con un nombre que excede la longitud máxima permitida. (A priori)
    it('EP024 - Debería mostrar un error al intentar crear un miembro con un nombre que excede la longitud máxima permitida. (A priori)', () => {    
        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();
    
        // And El usuario ingresa los detalles del miembro con un nombre que excede la longitud máxima permitida
        createMember.whenUserEntersMemberDetails(memberName, memberEmail);  
    
        // Then El usuario debería ver un mensaje de error que indica que el nombre excede la longitud máxima permitida
        deleteMember.thenMemberShouldNotBeVisibleInMembersList(newMemberName);
    });
    //Debería mostrar un error al intentar crear un miembro con un nombre que excede la longitud máxima permitida. (Pseudo-aletorio)
    //Debería mostrar un error al intentar crear un miembro con un nombre que excede la longitud máxima permitida. (Aleatorio)    



    //Debería rechazar la creación de un miembro con un email vacío. (A priori)
    it('EP025 - Debería rechazar la creación de un miembro con un email vacío (A priori)', () => {    
        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();
    
        // And El usuario ingresa los detalles del miembro con un email vacío
        createMember.whenUserEntersMemberDetails(memberName, memberEmail);       
    
        // Then El usuario debería ver un mensaje de error que indica que debe ingresar un email
        deleteMember.thenMemberShouldNotBeVisibleInMembersList(newMemberName);
    });
    //Debería rechazar la creación de un miembro con un email vacío. (Pseudo-aletorio)
    //Debería rechazar la creación de un miembro con un email vacío. (Aleatorio)



    //Debería rechazar la edición de un miembro con un email vacío. (A priori)
    it('EP026 - Debería rechazar la edición de un miembro con un email vacío (A priori)', () => {    
        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

       // When El usuario edita el miembro con un email vacío
       editMember.whenUserEditsMemberDetails(newMemberName, newMemberEmail);  
    
        // Then El usuario debería ver un mensaje de error que indica que debe ingresar un email
        deleteMember.thenMemberShouldNotBeVisibleInMembersList(newMemberName);
    });
    //Debería rechazar la edición de un miembro con un email vacío. (Pseudo-aletorio)
    //Debería rechazar la edición de un miembro con un email vacío. (Aleatorio)



    //Debería mostrar un error al intentar crear un miembro con un label que excede la longitud máxima permitida. (A priori)
    it('EP027 - Debería mostrar un error al intentar crear un miembro con un label que excede la longitud máxima permitida. (A priori)', () => {    
        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();
    
        // And El usuario ingresa los detalles del miembro con un label que excede la longitud máxima permitida
        createMember.whenUserEntersMemberDetails(memberName, memberEmail);  
    
        // Then El usuario debería ver un mensaje de error que indica que el label excede la longitud máxima permitida
        deleteMember.thenMemberShouldNotBeVisibleInMembersList(newMemberName);
    });
    //Debería mostrar un error al intentar crear un miembro con un label que excede la longitud máxima permitida. (Pseudo-aletorio)
    //Debería mostrar un error al intentar crear un miembro con un label que excede la longitud máxima permitida. (Aleatorio)



    //Debería mostrar un error al intentar crear un miembro con una note que excede la longitud máxima permitida. (A priori)
    it('EP028 - Debería mostrar un error al intentar crear un miembro con una note que excede la longitud máxima permitida. (A priori)', () => {    
        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();
    
        // And El usuario ingresa los detalles del miembro con una note que excede la longitud máxima permitida
        createMember.whenUserEntersMemberDetails(memberName, memberEmail);  
    
        // Then El usuario debería ver un mensaje de error que indica que la note excede la longitud máxima permitida
        deleteMember.thenMemberShouldNotBeVisibleInMembersList(newMemberName);
    });
    //Debería mostrar un error al intentar crear un miembro con una note que excede la longitud máxima permitida. (Pseudo-aletorio)
    //Debería mostrar un error al intentar crear un miembro con una note que excede la longitud máxima permitida. (Aleatorio)



    //Debería rechazar la edición de un miembro con un email en un formato inválido. (A priori)
    it('EP029 - Debería rechazar la edición de un miembro con un email en un formato inválido (A priori)', () => {    
        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

       // When El usuario edita el miembro con un email en un formato inválido
       editMember.whenUserEditsMemberDetails(newMemberName, newMemberEmail);  
    
        // Then El usuario debería ver un mensaje de error que indica que el email tiene un formato inválido
        deleteMember.thenMemberShouldNotBeVisibleInMembersList(newMemberName);
    });
    //Debería rechazar la edición de un miembro con un email en un formato inválido. (Pseudo-aletorio)
    //Debería rechazar la edición de un miembro con un email en un formato inválido. (Aleatorio)



    //No debería ver miembros en la lista de miembros al filtrar por una cadena compuesta de caracteres numéricos. (A priori)
    it('EP030 - No debería ver miembros en la lista de miembros al filtrar por una cadena compuesta de caracteres numéricos (Aleatorio)', () => {    
        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

       // When El usuario edita el miembro con un email en un formato inválido
       editMember.whenUserEditsMemberDetails(newMemberName, newMemberEmail);  
    
        // Then El usuario debería ver un mensaje de error que indica que el email tiene un formato inválido
        deleteMember.thenMemberShouldNotBeVisibleInMembersList(newMemberName);
    });

});