import { faker } from '@faker-js/faker';
import { generarTagsAleatorias } from '../utils';
const { Tag } = require('../../pages/tag');
import loginPage from "../../pages/login";

describe('Escenarios de pruebas para la funcionalidad tags - random - Ghost', function () {

    const tag = new Tag();
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

        cy.wait(1000);
    });
    const editTag = (tagData) => {
        tag.givenUserIsOnTagsPage();
        tag.givenUserIsEditingAnExistingTag();
        tag.whenUserEntersTagDetails(tagData.name, tagData.slug, tagData.description);
        tag.thenTagShouldBeVisibleInTagsList(tagData.name);
    };

    const testCases = [
        { type: "SHORT_SLUG", description: "menos de 191 caracteres en el campo slug" },
        { type: "LONG_SLUG", description: "más de 191 caracteres en el campo slug" },
        { type: "SHORT_DESCRIPTION", description: "menos de 500 caracteres en el campo description" },
        { type: "LONG_DESCRIPTION", description: "más de 500 caracteres en el campo description" },
        { type: "SHORT_NAME", description: "menos de 191 caracteres en el campo name" },
        { type: "LONG_NAME", description: "más de 191 caracteres en el campo name" },
    ];

    testCases.forEach((testCase) => {
        generarTagsAleatorias(3, testCase.type).forEach((data) => {
            it(`Crear un nuevo tag desde el panel de Tags con ${testCase.description}`, function () {
                tag.givenUserIsOnTagsPage();
                tag.andUserStartsCreatingNewTag();
                tag.whenUserEntersTagDetails(data.name, data.slug, data.description);
                if (testCase.type.includes("LONG")) {
                    tag.thenUserShouldSeeAnError();
                } else {
                    tag.thenTagShouldBeVisibleInTagsList(data.name);
                }
            });
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
        for (let index = 0; index < 3; index++) {
            const tagData = {
                name: faker.string.alpha(10),
                slug: faker.string.alpha(10),
                description: faker.lorem.lines(3),
            };
            editTag(tagData);
        }
    });

    it('Editar información de un tag existente dejando campos vacíos', function () {
        for (let index = 0; index < 3; index++) {
            const tagData = {
                name: faker.string.alpha(10),
                slug: faker.string.alpha(10),
                description: "",
            };
            editTag(tagData);
        }
    });
})
