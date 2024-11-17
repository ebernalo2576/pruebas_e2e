class Settings {
    constructor() {
        this.settingsMenuButton = 'a[href=\\#\\/settings\\/]';
        this.generalSettingsButton = '[data-testid="title-and-description"] > .items-start > :nth-child(2) > .flex > .cursor-pointer > span';
        this.expandButtonSection = 'button.gh-btn';
        this.titleField = 'input[placeholder="Site title"]';
        this.descriptionField = 'input[placeholder="Site description"]';
        this.saveButton = 'div > button.bg-green > span';     
    }

    // Given El usuario navega a la página de configuración
    givenUserIsInSettings() {
        cy.get(this.settingsMenuButton).first().click();
        cy.screenshot('settings-menu-opened'); 
    }

    // And El usuario abre la sección general de configuración
    andGivenUserOpensGeneralSection() {
        cy.get(this.generalSettingsButton).first().click();
        cy.screenshot('general-section-opened'); 
    }

    // When El usuario ingresa un nuevo título y descripción
    whenUserChangesTitleDescriptionFields(title, description) { 
        cy.get(this.titleField).clear().type(title);
        cy.screenshot('title-field-updated'); 
        cy.get(this.descriptionField).clear().type(description);
        cy.screenshot('description-field-updated'); 
        
    }

    // Then El usuario verifica que los cambios se hayan guardado correctamente
    thenSettingsShouldBeSaved() {
        cy.get('#admin-x-settings-scroller').scrollTo('top');
        cy.get(this.saveButton).should('be.visible').click();
        cy.screenshot('settings-saved'); 
    }
}
export { Settings };