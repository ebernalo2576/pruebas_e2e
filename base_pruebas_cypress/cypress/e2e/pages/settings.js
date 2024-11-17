class Settings {
    constructor() {
        this.settingsMenuButton = 'a[href=\\#\\/settings\\/]';
        this.generalSettingsButton = 'a[href=\\#\\/settings\\/general\\/]';
        this.expandButtonSection = 'button.gh-btn';
        this.titleField = 'div.form-group.ember-view > input';
        this.descriptionField = 'div.description-container > input';
        this.timezoneField = 'select#timezone.ember-view';
        this.publicationLanguageField = 'div.form-group.ember-view > input.ember-text-field.gh-input.ember-view';
        this.saveButton = 'button.gh-btn > span';
                
    }

    givenUserIsInSettings() {
        cy.get(this.settingsMenuButton).first().click();
        //cy.screenshot('settings-page');
    }

    andGivenUserOpensGeneralSection() {
        cy.get(this.generalSettingsButton).first().click();
        //cy.screenshot('settings-general-page');
    }

    whenUserExpandsTitleSection() {
        cy.get(this.expandButtonSection).eq(1).click();
    }

    andWhenUserChangesTitleDescriptionFields(title, description) { 
        cy.get(this.titleField).first().clear().type(title, {force: true});
        cy.get(this.descriptionField).first().clear().type(description, {force: true});
    }

    andWhenUserExpandsTimezoneSection() { 
        cy.get(this.expandButtonSection).eq(2).click();
    }
    andWhenUserChangesTimezoneSelect(selectedValue) {
        cy.get(this.timezoneField).first().select(selectedValue, {force: true});
    }
    
    andWhenUserExpandsPublicationLanguageSection() { 
        cy.get(this.expandButtonSection).eq(3).click();
    }

    andWhenUserChangesPublicationLanguage(newValue) {
        cy.get(this.publicationLanguageField).eq(2).clear().type(newValue, { force: true });
    }

    andWhenUserSavesChanges() {
        cy.contains(this.saveButton, "Save settings").first().click();
        
    }
    thenSettingsShouldBeSaved() {
        cy.contains(this.saveButton, "Saved").should('exist');
    }
}
export { Settings };