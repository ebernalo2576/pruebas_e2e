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
/*     it('EP022 - Debería mostrar un error al intentar CREAR un miembro con un email duplicado (A priori)', () => {    
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
    it('EP023 - Debería mostrar un error al intentar CREAR un miembro con un email duplicado (Pseudo-aletorio)', () => {    
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
    it('EP024 - Debería mostrar un error al intentar CREAR un miembro con un email duplicado (aletorio)', () => { 
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
    it('EP025 - Debería mostrar un error al intentar EDITAR un miembro con un email duplicado (A priori)', () => {    
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
        createMember.whenUserEntersMemberDetails(aPrioriData[(pseudoRowIndex - 1 + pseudoData.length) % pseudoData.length].memberName, aPrioriData[(pseudoRowIndex - 1 + pseudoData.length) % pseudoData.length].memberEmail); 
                
        // Given El usuario navega a la lista de miembros y selecciona un miembro específico para editar
        editMember.givenUserIsOnMembersPageAndSelectsMemberToEdit(aPrioriData[aPrioriRowIndex].memberName);

        // When El usuario edita el miembro con un email duplicado
        editMember.whenUserEditsMemberDetails(aPrioriData[(pseudoRowIndex - 1 + pseudoData.length) % pseudoData.length].memberName, aPrioriData[(pseudoRowIndex - 1 + pseudoData.length) % pseudoData.length].memberEmail);  
       
        // Then El usuario debería ver un mensaje de error que indica que el email ya existe
        deleteMember.thenUserShouldSeeDuplicatedEmailError();
    });

    //Debería rechazar la edición de un miembro con un email duplicado. (Pseudo-aletorio)
    it('EP026 - Debería mostrar un error al intentar EDITAR un miembro con un email duplicado (Pseudo-aleatorio)', () => {    
        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();
    
        // And El usuario ingresa los detalles del miembro 
        createMember.whenUserEntersMemberDetails(pseudoData[pseudoRowIndex].memberName, pseudoData[pseudoRowIndex].memberEmail); 
        
        // And El usuario vuelve a la seccion de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();
    
        // And El usuario ingresa los detalles del miembro 
        createMember.whenUserEntersMemberDetails(pseudoData[(pseudoRowIndex - 1 + pseudoData.length) % pseudoData.length].memberName, pseudoData[(pseudoRowIndex - 1 + pseudoData.length) % pseudoData.length].memberEmail); 
                
        // Given El usuario navega a la lista de miembros y selecciona un miembro específico para editar
        editMember.givenUserIsOnMembersPageAndSelectsMemberToEdit(pseudoData[pseudoRowIndex].memberName);

        // When El usuario edita el miembro con un email duplicado
        editMember.whenUserEditsMemberDetails(pseudoData[(pseudoRowIndex - 1 + pseudoData.length) % pseudoData.length].memberName, pseudoData[(pseudoRowIndex - 1 + pseudoData.length) % pseudoData.length].memberEmail);  
       
        // Then El usuario debería ver un mensaje de error que indica que el email ya existe
        deleteMember.thenUserShouldSeeDuplicatedEmailError();
    });
    //Debería rechazar la edición de un miembro con un email duplicado. (Aleatorio)
    it('EP027 - Debería mostrar un error al intentar EDITAR un miembro con un email duplicado (aleatorio)', () => {   
        const member1Name = faker.person.fullName();
        const member1Email = faker.internet.email(); 
        const member2Name = faker.person.fullName();
        const member2Email = faker.internet.email();
        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();
    
        // And El usuario ingresa los detalles del miembro 
        createMember.whenUserEntersMemberDetails(member1Name, member1Email); 
        
        // And El usuario vuelve a la seccion de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();
    
        // And El usuario ingresa los detalles del miembro 
        createMember.whenUserEntersMemberDetails(member2Name, member2Email); 
                
        // Given El usuario navega a la lista de miembros y selecciona un miembro específico para editar
        editMember.givenUserIsOnMembersPageAndSelectsMemberToEdit(member1Name);

        // When El usuario edita el miembro con un email duplicado
        editMember.whenUserEditsMemberDetails(member2Name, member2Email);  
       
        // Then El usuario debería ver un mensaje de error que indica que el email ya existe
        deleteMember.thenUserShouldSeeDuplicatedEmailError();
    });


    //Debería mostrar un error al intentar crear un miembro con un email excesivamente largo de 200 caracteres (A priori)
    it('EP028 - Debería mostrar un error al intentar CREAR un miembro con un email excesivamente largo de 200 caracteres (A priori)', () => {    
        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();
    
        // And El usuario ingresa los detalles del miembro con un nombre que excede la longitud máxima permitida
        createMember.whenUserEntersMemberDetails(aPrioriData[aPrioriRowIndex].memberName, aPrioriData[aPrioriRowIndex].memberLongEmail);  
    
        // Then El usuario debería ver un mensaje de error que indica que el nombre excede la longitud máxima permitida
        deleteMember.thenUserShouldSeeDuplicatedEmailError();
    });
    //Debería mostrar un error al intentar crear un miembro con un email que excede la longitud máxima permitida. (Pseudo-aletorio)
    it('EP029 - Debería mostrar un error al intentar CREAR un miembro con un email excesivamente largo de 200 caracteres (Pseudo-aletorio)', () => {    
        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();
    
        // And El usuario ingresa los detalles del miembro con un nombre que excede la longitud máxima permitida
        createMember.whenUserEntersMemberDetails(pseudoData[pseudoRowIndex].memberName, pseudoData[pseudoRowIndex].memberLongEmail);  
    
        // Then El usuario debería ver un mensaje de error que indica que el nombre excede la longitud máxima permitida
        deleteMember.thenUserShouldSeeDuplicatedEmailError();
    });
    //Debería mostrar un error al intentar crear un miembro con un email que excede la longitud máxima permitida. (Aleatorio)    
    it('EP030 - Debería mostrar un error al intentar CREAR un miembro con un email excesivamente largo de 200 caracteres (Aleatorio)', () => {
        const memberName = faker.person.fullName();
        const memberEmail = faker.string.alphanumeric(100) + '@' + faker.string.alphanumeric(95) + '.com';
        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();
    
        // And El usuario ingresa los detalles del miembro con un nombre que excede la longitud máxima permitida
        createMember.whenUserEntersMemberDetails(memberName, memberEmail);  
    
        // Then El usuario debería ver un mensaje de error que indica que el nombre excede la longitud máxima permitida
        deleteMember.thenUserShouldSeeDuplicatedEmailError();
    });



    //Debería rechazar la creación de un miembro con un email vacío. (A priori)
    it('EP031 - Debería mostrar un error al intentar CREAR un miembro con un email vacío (A priori)', () => {    
        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();
    
        // And El usuario ingresa los detalles del miembro 
        createMember.whenUserEntersMemberDetails(aPrioriData[aPrioriRowIndex].memberName, aPrioriData[aPrioriRowIndex].emptyEmail); 
       
        // Then El usuario debería ver un mensaje de error que indica que debe ingresar un email
        deleteMember.thenUserShouldSeeDuplicatedEmailError();
    }); */
    //Debería rechazar la creación de un miembro con un email vacío. (Pseudo-aletorio)
    it('EP032 - Debería rechazar la creación de un miembro con un email vacío (Pseudo-aletorio)', () => {    
        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();
    
        // And El usuario ingresa los detalles del miembro 
        createMember.whenUserEntersMemberDetails(pseudoData[pseudoRowIndex].memberName, pseudoData[pseudoRowIndex].emptyEmail); 
       
        // Then El usuario debería ver un mensaje de error que indica que debe ingresar un email
        deleteMember.thenUserShouldSeeDuplicatedEmailError();
    });
    //Debería rechazar la creación de un miembro con un email vacío. (Aleatorio)
    it('EP033 - Debería rechazar la creación de un miembro con un email vacío (Aleatorio)', () => {    
        const memberName = faker.person.fullName();
        const emptyEmail = "";
        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();
    
        // And El usuario ingresa los detalles del miembro 
        createMember.whenUserEntersMemberDetails(memberName, emptyEmail); 
       
        // Then El usuario debería ver un mensaje de error que indica que debe ingresar un email
        deleteMember.thenUserShouldSeeDuplicatedEmailError();
    });



    //Debería rechazar la edición de un miembro con un email vacío. (A priori)
    it('EP034 - Debería rechazar la edición de un miembro con un email vacío (A priori)', () => {    
        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();
    
        // And El usuario ingresa los detalles del miembro 
        createMember.whenUserEntersMemberDetails(aPrioriData[aPrioriRowIndex].memberName, aPrioriData[aPrioriRowIndex].memberEmail); 
        
        // And El usuario vuelve a la seccion de miembros
        //createMember.givenUserIsOnMembersPage();
                
        // And El usuario navega a la lista de miembros y selecciona un miembro específico para editar
        editMember.givenUserIsOnMembersPageAndSelectsMemberToEdit(aPrioriData[aPrioriRowIndex].memberName);

        // And El usuario edita el miembro con un email vacío
        editMember.whenUserEditsMemberDetails(aPrioriData[(pseudoRowIndex - 1 + pseudoData.length) % pseudoData.length].memberName, aPrioriData[(pseudoRowIndex - 1 + pseudoData.length) % pseudoData.length].emptyEmail);  
       
        // Then El usuario debería ver un mensaje de error que indica que debe ingresar un email
        deleteMember.thenUserShouldSeeDuplicatedEmailError();
    });
    //Debería rechazar la edición de un miembro con un email vacío. (Pseudo-aletorio)
    it('EP035 - Debería rechazar la edición de un miembro con un email vacío (Paseudo-aleatorio)', () => {    
        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();
    
        // And El usuario ingresa los detalles del miembro 
        createMember.whenUserEntersMemberDetails(pseudoData[pseudoRowIndex].memberName, pseudoData[pseudoRowIndex].memberEmail); 
        
        // And El usuario vuelve a la seccion de miembros
        //createMember.givenUserIsOnMembersPage();
                
        // And El usuario navega a la lista de miembros y selecciona un miembro específico para editar
        editMember.givenUserIsOnMembersPageAndSelectsMemberToEdit(pseudoData[pseudoRowIndex].memberName);

        // And El usuario edita el miembro con un email vacío
        editMember.whenUserEditsMemberDetails(pseudoData[(pseudoRowIndex - 1 + pseudoData.length) % pseudoData.length].memberName, pseudoData[(pseudoRowIndex - 1 + pseudoData.length) % pseudoData.length].emptyEmail);  
       
        // Then El usuario debería ver un mensaje de error que indica que debe ingresar un email
        deleteMember.thenUserShouldSeeDuplicatedEmailError();
    });
    //Debería rechazar la edición de un miembro con un email vacío. (Aleatorio)
    it('EP036 - Debería rechazar la edición de un miembro con un email vacío (Aleatorio)', () => {   
        const memberName = faker.person.fullName();
        const memberEmail = faker.internet.email();
        const emptyEmail = ""; 
        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();
    
        // And El usuario ingresa los detalles del miembro 
        createMember.whenUserEntersMemberDetails(memberName, memberEmail); 
        
        // And El usuario vuelve a la seccion de miembros
        //createMember.givenUserIsOnMembersPage();
                
        // And El usuario navega a la lista de miembros y selecciona un miembro específico para editar
        editMember.givenUserIsOnMembersPageAndSelectsMemberToEdit(memberName);

        // And El usuario edita el miembro con un email vacío
        editMember.whenUserEditsMemberDetails(memberName, emptyEmail);  
       
        // Then El usuario debería ver un mensaje de error que indica que debe ingresar un email
        deleteMember.thenUserShouldSeeDuplicatedEmailError();
    });


    //Debería permitir al usuario editar un miembro existente (Pseudo-aleatorio)
    it('EP037 - Debería permitir al usuario EDITAR exitosamente un miembro existente con un email y nombre válidos (Pseudo-aleatorio)', () => {    
        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();
    
        // And El usuario ingresa los detalles del miembro 
        createMember.whenUserEntersMemberDetails(pseudoData[pseudoRowIndex].memberName, pseudoData[pseudoRowIndex].memberEmail); 
        
        // And El usuario vuelve a la seccion de miembros
        //createMember.givenUserIsOnMembersPage();
                
        // And El usuario navega a la lista de miembros y selecciona un miembro específico para editar
        editMember.givenUserIsOnMembersPageAndSelectsMemberToEdit(pseudoData[pseudoRowIndex].memberName);

        // And El usuario edita el miembro con un nombre y email válidos
        editMember.whenUserEditsMemberDetails(pseudoData[(pseudoRowIndex - 1 + pseudoData.length) % pseudoData.length].memberName, pseudoData[(pseudoRowIndex - 1 + pseudoData.length) % pseudoData.length].memberEmail); 
    
        // Then El usuario verifica que el miembro editado esté en la lista de miembros con el nuevo nombre
        editMember.thenMemberShouldBeUpdatedInMembersList(pseudoData[(pseudoRowIndex - 1 + pseudoData.length) % pseudoData.length].memberName); 
    });
    //Debería permitir al usuario editar un miembro existente (aleatorio)
    it('EP038 - Debería permitir al usuario EDITAR exitosamente un miembro existente con un email y nombre válidos (aleatorio)', () => {    
        const memberName = faker.person.fullName();
        const memberEmail = faker.internet.email();
        const newMemberName = faker.person.fullName();
        const newMemberEmail = faker.internet.email();
        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();
    
        // And El usuario ingresa los detalles del miembro 
        createMember.whenUserEntersMemberDetails(memberName, memberEmail); 
        
        // And El usuario vuelve a la seccion de miembros
        //createMember.givenUserIsOnMembersPage();
                
        // And El usuario navega a la lista de miembros y selecciona un miembro específico para editar
        editMember.givenUserIsOnMembersPageAndSelectsMemberToEdit(memberName);

        // And El usuario edita el miembro con un nombre y email válidos
        editMember.whenUserEditsMemberDetails(newMemberName, newMemberEmail); 
    
        // Then El usuario verifica que el miembro editado esté en la lista de miembros con el nuevo nombre
        editMember.thenMemberShouldBeUpdatedInMembersList(newMemberName); 
    });



    //Debería mostrar un error al intentar CREAR un miembro con un email en un formato inválido (A priori)
    it('EP039 - Debería mostrar un error al intentar CREAR un miembro con un email en un formato inválido (A priori)', () => {    
        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();
    
        // And El usuario ingresa los detalles del miembro con un email en un formato inválido
        createMember.whenUserEntersMemberDetails(aPrioriData[aPrioriRowIndex].memberName, aPrioriData[aPrioriRowIndex].invalidEmail);  
    
        // Then El usuario debería ver un mensaje de error que indica que el email no es válido
        deleteMember.thenUserShouldSeeDuplicatedEmailError();
    });
    //Debería mostrar un error al intentar CREAR un miembro con un email en un formato inválido (Pseudo-aletorio)
    it('EP040 - Debería mostrar un error al intentar CREAR un miembro con un email en un formato inválido (Pseudo-aleatorio)', () => {    
        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();
    
        // And El usuario ingresa los detalles del miembro con un email en un formato inválido
        createMember.whenUserEntersMemberDetails(pseudoData[pseudoRowIndex].memberName, pseudoData[pseudoRowIndex].invalidEmail);  
    
        // Then El usuario debería ver un mensaje de error que indica que el email no es válido
        deleteMember.thenUserShouldSeeDuplicatedEmailError();
    });
    //Debería mostrar un error al intentar CREAR un miembro con un email en un formato inválido (Aleatorio) 
    it('EP041 - Debería mostrar un error al intentar CREAR un miembro con un email en un formato inválido (Aleatorio)', () => {    
        const memberName = faker.person.fullName();
        const invalidEmail = faker.string.symbol(10) + faker.internet.emoji() + faker.string.sample(10);

        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();
    
        // And El usuario ingresa los detalles del miembro con un email en un formato inválido
        createMember.whenUserEntersMemberDetails(memberName, invalidEmail);  
    
        // Then El usuario debería ver un mensaje de error que indica que el email no es válido
        deleteMember.thenUserShouldSeeDuplicatedEmailError();
    });



    //Debería mostrar un error al intentar EDITAR un miembro con un email en un formato inválido (A priori)
    it('EP042 - Debería mostrar un error al intentar EDITAR un miembro con un email en un formato inválido (A priori)', () => {    
        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();
    
        // And El usuario ingresa los detalles del miembro 
        createMember.whenUserEntersMemberDetails(aPrioriData[aPrioriRowIndex].memberName, aPrioriData[aPrioriRowIndex].memberEmail); 
        
        // And El usuario vuelve a la seccion de miembros
        //createMember.givenUserIsOnMembersPage(); 
                
        // Given El usuario navega a la lista de miembros y selecciona un miembro específico para editar
        editMember.givenUserIsOnMembersPageAndSelectsMemberToEdit(aPrioriData[aPrioriRowIndex].memberName);

        // When El usuario edita el miembro con un email en un formato inválido
        editMember.whenUserEditsMemberDetails(aPrioriData[(pseudoRowIndex - 1 + pseudoData.length) % pseudoData.length].memberName, aPrioriData[(pseudoRowIndex - 1 + pseudoData.length) % pseudoData.length].invalidEmail);  
       
        // Then El usuario debería ver un mensaje de error que indica que el email no es válido
        deleteMember.thenUserShouldSeeDuplicatedEmailError();
    });
    //Debería mostrar un error al intentar EDITAR un miembro con un email en un formato inválido (Pseudo-aletorio)
    it('EP043 - Debería mostrar un error al intentar EDITAR un miembro con un email en un formato inválido (Pseudo-aleatorio)', () => {    
        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();
    
        // And El usuario ingresa los detalles del miembro 
        createMember.whenUserEntersMemberDetails(pseudoData[pseudoRowIndex].memberName, pseudoData[pseudoRowIndex].memberEmail); 
        
        // And El usuario vuelve a la seccion de miembros
        //createMember.givenUserIsOnMembersPage(); 
                
        // Given El usuario navega a la lista de miembros y selecciona un miembro específico para editar
        editMember.givenUserIsOnMembersPageAndSelectsMemberToEdit(pseudoData[pseudoRowIndex].memberName);

        // When El usuario edita el miembro con un email en un formato inválido
        editMember.whenUserEditsMemberDetails(pseudoData[(pseudoRowIndex - 1 + pseudoData.length) % pseudoData.length].memberName, pseudoData[(pseudoRowIndex - 1 + pseudoData.length) % pseudoData.length].invalidEmail);  
       
        // Then El usuario debería ver un mensaje de error que indica que el email no es válido
        deleteMember.thenUserShouldSeeDuplicatedEmailError();
    });
    //Debería mostrar un error al intentar EDITAR un miembro con un email en un formato inválido (Aleatorio)
    it('EP044 - Debería mostrar un error al intentar EDITAR un miembro con un email en un formato inválido (aleatorio)', () => {   
        const memberName = faker.person.fullName();
        const memberEmail = faker.internet.email();
        const invalidEmail = faker.string.symbol(10) + faker.internet.emoji() + faker.string.sample(10);

        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();
    
        // And El usuario ingresa los detalles del miembro 
        createMember.whenUserEntersMemberDetails(memberName, memberEmail); 
        
        // And El usuario vuelve a la seccion de miembros
        //createMember.givenUserIsOnMembersPage(); 
                
        // Given El usuario navega a la lista de miembros y selecciona un miembro específico para editar
        editMember.givenUserIsOnMembersPageAndSelectsMemberToEdit(memberName);

        // When El usuario edita el miembro con un email en un formato inválido
        editMember.whenUserEditsMemberDetails(memberName, invalidEmail);  
       
        // Then El usuario debería ver un mensaje de error que indica que el email no es válido
        deleteMember.thenUserShouldSeeDuplicatedEmailError();
    });


    //Debería permitir CREAR exitosamente un nuevo miembro con un email y nombre correctos (Pseudo-aletorio)
    it('EP045 - Debería permitir CREAR exitosamente un nuevo miembro con un email y nombre correctos (Pseudo-aletorio)', () => {    
        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();

        // And El usuario ingresa los detalles del miembro
        createMember.whenUserEntersMemberDetails(pseudoData[pseudoRowIndex].memberName, pseudoData[pseudoRowIndex].memberEmail);

        // Then El usuario verifica que el miembro esté visible en la lista de miembros
        createMember.thenMemberShouldBeVisibleInMembersList(pseudoData[pseudoRowIndex].memberName);
    });
    //Debería permitir CREAR exitosamente un nuevo miembro con un email y nombre correctos (Aletorio)
    it('EP046 - Debería permitir CREAR exitosamente un nuevo miembro con un email y nombre correctos (Aletorio)', () => {  
        const memberName = faker.person.fullName();
        const memberEmail = faker.internet.email();

        // Given El usuario navega a la sección de miembros
        createMember.givenUserIsOnMembersPage();

        // When El usuario comienza a crear un nuevo miembro
        createMember.andGivenUserStartsCreatingNewMember();

        // And El usuario ingresa los detalles del miembro
        createMember.whenUserEntersMemberDetails(memberName, memberEmail);

        // Then El usuario verifica que el miembro esté visible en la lista de miembros
        createMember.thenMemberShouldBeVisibleInMembersList(memberName);
    });

});