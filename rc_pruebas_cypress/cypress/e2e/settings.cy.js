import login from './pages/login';
import { SettingsTitleDescription,  SettingsDeleteContent} from './pages/settings';
import { faker } from '@faker-js/faker';

const settingsTitleDescription = new SettingsTitleDescription();
const settingsDeleteContent = new SettingsDeleteContent();
const title = faker.lorem.words(3); 
const description = faker.lorem.sentence(6); 
     
describe('Escenarios de pruebas para la funcionalidad Settings - Ghost Version Base', () => {
    Cypress.on('uncaught:exception', (err) => {
        if (err.message.includes('TransitionAborted')) {
            return false; 
        }
    });

    /*it('EP021 - Debería permitir al usuario cambiar el título y configuración el sitio y guardar los cambios', () => {
        // Precondición inicio de sesión para ejecutar el escenario de prueba
        login.givenUserIsOnLoginPage();
        login.whenUserLogsIn();
        login.thenUserShouldSeeDashboard();

        // Given El usuario accede a la sección de configuración
        settingsTitleDescription.givenUserIsInSettings();

        // and El usuario abre la sección general
        settingsTitleDescription.andGivenUserOpensGeneralSection();

        // and El usuario cambia los campos de título y descripción
        settingsTitleDescription.whenUserChangesTitleDescriptionFields(title, description);

        // then Los cambios deberían guardarse correctamente
        settingsTitleDescription.thenSettingsShouldBeSaved();
    });*/

    it('EP022 - Debería permitir eliminar toda el contenido', () => {
        // Precondición inicio de sesión para ejecutar el escenario de prueba
        login.givenUserIsOnLoginPage();
        login.whenUserLogsIn();
        login.thenUserShouldSeeDashboard();

        // Given El usuario accede a la sección de configuración
        settingsDeleteContent.givenUserIsInSettings();

        // and El usuario abre la sección general
        settingsDeleteContent.andGivenUserOpensGeneralSection();

        // and El usuario cambia los campos de título y descripción
        settingsDeleteContent.whenUserDeleteAllContent();

        // then Los cambios deberían guardarse correctamente
        //settingsDeleteContent.thenSettingsShouldBeSaved();
    });
});