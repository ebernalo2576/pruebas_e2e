import login from './pages/login';
import { Settings } from './pages/settings';

const settings = new Settings();
const title = "Nuevo Titulo";
const description = "Nueva Descripcion";
const timezoneSelected = '(GMT -5:00) Bogota, Lima, Quito';
const publicationLanguage = 'es';
     
describe('Escenarios de pruebas para la funcionalidad Settings - Ghost Version Base', () => {
    Cypress.on('uncaught:exception', (err) => {
        if (err.message.includes('TransitionAborted')) {
            return false; 
        }
    });

    it('EP021 - EP021 - Debería permitir al usuario cambiar la configuración general del sitio y guardar los cambios', () => {
        // Precondición inicio de sesión para ejecutar el escenario de prueba
        login.givenUserIsOnLoginPage();
        login.whenUserLogsIn();
        login.thenUserShouldSeeDashboard();

        //given
        settings.givenUserIsInSettings();

        //AND 
        settings.andGivenUserOpensGeneralSection();

        //WHEN
        settings.whenUserExpandsTitleSection();

        //AND
        settings.andWhenUserChangesTitleDescriptionFields(title, description);

        //and
        settings.andWhenUserExpandsTimezoneSection();

        //and
        settings.andWhenUserChangesTimezoneSelect(timezoneSelected);

        //and
        settings.andWhenUserExpandsPublicationLanguageSection();

        //and
        settings.andWhenUserChangesPublicationLanguage(publicationLanguage);

        //and
        settings.andWhenUserSavesChanges();

        //then
        settings.thenSettingsShouldBeSaved();
    });
});