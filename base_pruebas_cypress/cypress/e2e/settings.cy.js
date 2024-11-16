import login from './pages/login';
import { Settings } from './pages/settings';

const settings = new Settings();
     
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

        

        
    });
});