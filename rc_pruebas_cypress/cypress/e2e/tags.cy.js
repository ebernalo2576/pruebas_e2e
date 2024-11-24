const { Tag } = require('./pages/tag');
import loginPage from "./pages/login";
const apiUrl = Cypress.env('API_URL');
const TAGS_API_MOCK_PATH = Cypress.env('TAGS_API_MOCK_PATH');
import _ from 'lodash';
import { faker } from '@faker-js/faker';
import apriori_tags from "../fixtures/tags-a-priori.json";

const csvToJson = (csv) => {
    const content = csv.split('\n');
    const header = content[0].split(',');
    return _.tail(content).map((row) => _.zipObject(header, row.split(',')));
};

const randomIndex = (maximo) => Math.floor(Math.random() * (maximo + 1));

const generarTagAleatoria = () => ({
    name: faker.lorem.word(),
    color: faker.internet.color(),
    slug: faker.lorem.slug(),
    description: faker.lorem.sentence(),
});

const generateTextWithoutSpaces = (length) => {
    let text = '';
    while (text.length < length) {
        text += faker.lorem.word();
    }
    return text.substring(0, length);
};

const generarTagAleatoriaWithShortSlug = () => ({
    name: faker.lorem.word(),
    color: faker.internet.color(),
    slug: generateTextWithoutSpaces(190),
    description: faker.lorem.sentence(),
});

const generarTagAleatoriaWithLongSlug = () => ({
    name: faker.lorem.word(),
    color: faker.internet.color(),
    slug: generateTextWithoutSpaces(192),
    description: faker.lorem.sentence(),
});

const generarTagAleatoriaWithShortDescription = () => ({
    name: faker.lorem.word(),
    color: faker.internet.color(),
    slug: faker.lorem.slug(),
    description: generateTextWithoutSpaces(499),
});

const generarTagAleatoriaWithLongDescription = () => ({
    name: faker.lorem.word(),
    color: faker.internet.color(),
    slug: faker.lorem.slug(),
    description: generateTextWithoutSpaces(501),
});

const generarTagAleatoriaWithShortName = () => ({
    name: generateTextWithoutSpaces(190),
    color: faker.internet.color(),
    slug: faker.lorem.slug(),
    description: faker.lorem.sentence(),
});

const generarTagAleatoriaWithLongName = () => ({
    name: generateTextWithoutSpaces(192),
    color: faker.internet.color(),
    slug: faker.lorem.slug(),
    description: faker.lorem.sentence(),
});

const generarTagsAleatorias = (cantidad, slugType) => {
    const tags = [];
    for (let i = 0; i < cantidad; i++) {
        switch (slugType) {
            case "SHORT_SLUG":
                tags.push(generarTagAleatoriaWithShortSlug());
                break;
            case "LONG_SLUG":
                tags.push(generarTagAleatoriaWithLongSlug());
                break;
            case "SHORT_DESCRIPTION":
                tags.push(generarTagAleatoriaWithShortDescription());
                break;
            case "LONG_DESCRIPTION":
                tags.push(generarTagAleatoriaWithLongDescription());
                break;
            case "SHORT_NAME":
                tags.push(generarTagAleatoriaWithShortName());
                break;
            case "LONG_NAME":
                tags.push(generarTagAleatoriaWithLongName());
                break;
            default:
                tags.push(generarTagAleatoria());
                break;
        }
    }
    return tags;
};
const tag = new Tag();

describe('EP008-EP031: Pruebas para la funcionalidad tags en Ghost - aprori', () => {
    const {
        tagNormalData,
        tagWithoutData,
        tagData,
        tagDataLongSlug,
        tagDataDescription,
        tagDataLongDescription,
        tagLongNameData,
    } = apriori_tags;

    before(() => {
        cy.session('user-session', () => {
            loginPage.givenUserIsOnLoginPage();
            loginPage.whenUserLogsIn();
            loginPage.thenUserShouldSeeDashboard();
        });
    });
    afterEach(() => { });
    beforeEach(() => {
        cy.session('user-session', () => {
            loginPage.givenUserIsOnLoginPage();
            loginPage.whenUserLogsIn();
            loginPage.thenUserShouldSeeDashboard();
        });
        cy.visit(Cypress.env('GHOST_URL') + '/ghost/#/dashboard');
        cy.wait(1000);
    });

    tagNormalData?.forEach((data) => {
        it(`EP008: Debería permitir crear un tag con datos válidos (A priori): ${data.name}`, () => {
            tag.givenUserIsOnTagsPage();
            tag.andUserStartsCreatingNewTag();
            tag.whenUserEntersTagDetails(data.name, null, data.description);
            tag.thenTagShouldBeVisibleInTagsList(data.name);

        });
    });

    tagWithoutData?.forEach(() => {
        it('EP011: Debería mostrar un error al intentar crear un tag sin datos (A priori)', () => {
            tag.givenUserIsOnTagsPage();
            tag.andUserStartsCreatingNewTag();
            tag.whenUserClearsFields();
            cy.get(tag.saveTagButton).click();
            tag.thenUserShouldSeeAnError();
        });
    });

    tagData?.forEach((data) => {
        it(`EP014: Debería permitir crear un tag con slug válido (A priori): ${data.name}`, () => {
            tag.givenUserIsOnTagsPage();
            tag.andUserStartsCreatingNewTag();
            tag.whenUserEntersTagDetails(data.name, data.slug, data.description);
            tag.thenTagShouldBeVisibleInTagsList(data.name);
        });
    });

    tagDataLongSlug?.forEach((data) => {
        it(`EP017: Crear un nuevo tag con menos de 191 caracteres en el campo slug (A priori): ${data.name}`, () => {
            tag.givenUserIsOnTagsPage();
            tag.andUserStartsCreatingNewTag();
            tag.whenUserEntersTagDetails(data.name, data.slug, data.description);
            tag.thenUserShouldSeeAnError();
        });
    });
    tagDataDescription?.forEach((data) => {
        it(`EP020: Debería permitir crear un tag con descripción válida (A priori): ${data.name}`, () => {
            tag.givenUserIsOnTagsPage();
            tag.andUserStartsCreatingNewTag();
            tag.whenUserEntersTagDetails(data.name, data.slug, data.description);
            tag.thenTagShouldBeVisibleInTagsList(data.name);
        });
    });

    tagDataLongDescription?.forEach((data) => {
        it(`EP023: Debería mostrar un error al intentar crear un tag con descripción demasiado larga (A priori): ${data.name}`, () => {
            tag.givenUserIsOnTagsPage();
            tag.andUserStartsCreatingNewTag();
            tag.whenUserEntersTagDetails(data.name, data.slug, data.description);
            tag.thenUserShouldSeeAnError();
        });
    });

    tagLongNameData?.forEach((data) => {
        it(`EP026: Debería mostrar un error al intentar crear un tag con name demasiado largo (A priori): ${data.name}`, () => {
            tag.givenUserIsOnTagsPage();
            tag.andUserStartsCreatingNewTag();
            tag.whenUserEntersTagDetails(data.name, data.slug, data.description);
            tag.thenUserShouldSeeAnError();
        });
    });

    it('EP029: Debería permitir editar un tag existente (A priori)', () => {
        cy.fixture('tags.json').then((tags) => {
            for (let i = 0; i < 3; i++) {
                tag.givenUserIsOnTagsPage();
                tag.givenUserIsEditingAnExistingTag();
                tag.whenUserClearsFields();
                tag.whenUserEntersTagDetails(tags[i].name, tags[i].slug, tags[i].description);
                tag.thenTagShouldBeVisibleInTagsList(tags[i].name);
            }
        });
    });
});

describe('EP009-EP030: Pruebas para la funcionalidad tags - Pseudo-aleatorio - Ghost', () => {
    let pseudoData = [];

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

        cy.request(`${apiUrl}/${TAGS_API_MOCK_PATH}`).then((response) => {
            pseudoData = csvToJson(response.body);
        });

        cy.wait(1000);
    });

    pseudoData.forEach((data, index) => {
        it(`EP009: Crear un nuevo tag con datos válidos desde la API de Mockaroo (${index + 1})`, () => {
            tag.givenUserIsOnTagsPage();
            tag.andUserStartsCreatingNewTag();
            tag.whenUserEntersTagDetails(data.name, data.slug, data.description);

            if (data.name.length > 191 || data.slug.length > 191 || data.description.length > 500) {
                tag.thenUserShouldSeeAnError();
            } else {
                tag.thenTagShouldBeVisibleInTagsList(data.name);
            }
        });
    });

    it('EP012: Crear un nuevo tag sin datos desde la API de Mockaroo', () => {
        tag.givenUserIsOnTagsPage();
        tag.andUserStartsCreatingNewTag();
        tag.whenUserClearsFields();
        tag.whenUserSavesTag();
        tag.thenUserShouldSeeAnError();
    });

    it('EP030: Editar información de un tag existente (Pseudo-aleatorio)', () => {
        for (let i = 0; i < 3; i++) {
            const data = pseudoData[randomIndex(pseudoData.length - 1)];
            tag.givenUserIsOnTagsPage();
            tag.givenUserIsEditingAnExistingTag();
            tag.whenUserEntersTagDetails(data.name, data.slug, data.description);
            tag.thenTagShouldBeVisibleInTagsList(data.name);
        }
    });
});
describe('EP010-EP031: Pruebas para la funcionalidad tags - Aleatorio - Ghost', () => {

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

    const testCases = [
        { type: "SHORT_SLUG", description: "menos de 191 caracteres en el campo slug" },
        { type: "LONG_SLUG", description: "más de 191 caracteres en el campo slug" },
        { type: "SHORT_DESCRIPTION", description: "menos de 500 caracteres en el campo descripción" },
        { type: "LONG_DESCRIPTION", description: "más de 500 caracteres en el campo descripción" },
        { type: "SHORT_NAME", description: "menos de 191 caracteres en el campo name" },
        { type: "LONG_NAME", description: "más de 191 caracteres en el campo name" },
    ];

    testCases.forEach((testCase) => {
        generarTagsAleatorias(3, testCase.type).forEach((data) => {
            it(`EP010: Crear un nuevo tag con ${testCase.description}`, () => {
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

    it('EP031: Editar información de un tag existente con datos aleatorios', () => {
        for (let i = 0; i < 3; i++) {
            const data = generarTagAleatoria();
            tag.givenUserIsOnTagsPage();
            tag.givenUserIsEditingAnExistingTag();
            tag.whenUserEntersTagDetails(data.name, data.slug, data.description);
            tag.thenTagShouldBeVisibleInTagsList(data.name);
        }
    });
});
