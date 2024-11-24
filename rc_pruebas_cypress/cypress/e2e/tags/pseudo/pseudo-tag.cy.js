const { Tag } = require('../../pages/tag');
import loginPage from "../../pages/login";
const apiUrl = Cypress.env('TAGS_API_URL');
import _ from 'lodash';
function csvToJson(csv) {
    const content = csv.split('\n');
    const header = content[0].split(',');
    return _.tail(content).map((row) => {
      return _.zipObject(header, row.split(','));
    });
  }

describe('Escenarios de pruebas para la funcionalidad tags - pseudo - Ghost', function () {
    const tag = new Tag();
    let pseudoData = [];
    let pseudoRowIndex = 0;

    before(() => {
        cy.session('user-session', () => {
            loginPage.givenUserIsOnLoginPage();
            loginPage.whenUserLogsIn();
            loginPage.thenUserShouldSeeDashboard();
        });
    });

    beforeEach(() => {
        cy.session('user-session', () => {
            loginPage.givenUserIsOnLoginPage();
            loginPage.whenUserLogsIn();
            loginPage.thenUserShouldSeeDashboard();
        });

        cy.visit(Cypress.env('GHOST_URL') + '/ghost/#/dashboard');

        cy.request(apiUrl).then((response) => {
            pseudoData = csvToJson(response.body);
        
            cy.log('Pseudo Data:', pseudoData);
            console.log('Pseudo Data:', pseudoData);
        
            pseudoRowIndex = Math.floor(Math.random() * pseudoData.length);
        
            cy.log('Selected Data:', pseudoData[pseudoRowIndex]);
            console.log('Selected Data:', pseudoData[pseudoRowIndex]);
        });

        cy.wait(1000);
    });

    pseudoData.forEach((tagData, index) => {
        it(`Crear un nuevo tag desde la API de Mockaroo (${index + 1})`, function () {
            tag.givenUserIsOnTagsPage();
            tag.andUserStartsCreatingNewTag();
            tag.whenUserEntersTagDetails(tagData.name, tagData.slug, tagData.description);
            tag.saveTagButton();
            if (tagData.name.length > 191 || tagData.slug.length > 191 || tagData.description.length > 500) {
                tag.thenUserShouldSeeAnError();
            } else {
                tag.thenTagShouldBeVisibleInTagsList(tagData.name);
            }
        });
    });


    it('Crear un nuevo tag desde el panel de Tags sin datos en los campos.', function () {
        tag.givenUserIsOnTagsPage();
        tag.andUserStartsCreatingNewTag();
        tag.whenUserClearsFields();
        tag.whenUserSavesTag();
        tag.thenUserShouldSeeAnError();
    });

    it('Editar información de un tag existente', function () {
        for (let i = 0; i < 3; i++) {
            const tagData = pseudoData[pseudoRowIndex];
            tag.givenUserIsOnTagsPage();
            tag.givenUserIsEditingAnExistingTag();
            tag.whenUserEntersTagDetails(tagData.name, tagData.slug, tagData.description);
            tag.thenTagShouldBeVisibleInTagsList(tagData.name);
        }
    });
});
