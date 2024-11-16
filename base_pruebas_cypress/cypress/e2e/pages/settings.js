class Settings {
    constructor() {
        this.settingsMenuButton = 'a[href=\\#\\/settings\\/]';
        this.generalSettingsButton = 'a[href=\\#\\/settings\\/general\\/]';
        this.expandButtonSection = 'button.gh-btn';
        this.titleField = 'div.form-group.success.ember-view > input';
        this.descriptionField = 'div.description-container > input';
        this.timezoneField = 'select#timezone.ember-view';
                
    }

    givenUserIsInSettings() {
        cy.get(this.settingsMenuButton).first().click();
        cy.screenshot('settings-page');
    }

    andGivenUserOpensGeneralSection() {
        cy.get(this.generalSettingsButton).first().click();
        cy.screenshot('settings-general-page');
    }

    whenUserExpandsTitleSection() { }
    andWhenUserChangesTitleDescriptionFields() { }

    andWhenUserExpandsTimezoneSection() { }
    andWhenUserChangesTimezoneSelect() { }
    
    andWhenUserExpandsPublicationLanguageSection() { }
    andWhenUserChangesPublicationLanguage() { }
}
export { Settings };