const { Tag } = require('./pages/tag');
import loginPage from "./pages/login";
const apiUrl = Cypress.env('API_URL');
const TAGS_API_MOCK_PATH = Cypress.env('TAGS_API_MOCK_PATH');
import _ from 'lodash';
import { faker } from '@faker-js/faker';

const parseCsvToJson = (csv) => {
    const content = csv.split('\n');
    const header = content[0].split(',');
    return _.tail(content).map((row) => {
        return _.zipObject(header, row.split(','));
    });
};
const tag = new Tag();

const generateRandomTag = () => {
    return {
        name: faker.lorem.word(),
        color: faker.internet.color(),
        slug: faker.lorem.slug(),
        description: faker.lorem.sentence()
    };
};

const generateRandomTagWithShortSlug = () => {
    const seed = faker.string.uuid();
    faker.seed(seed);

    return {
        name: faker.lorem.word(),
        color: faker.internet.color(),
        slug: createTextWithoutSpaces(190),
        description: faker.lorem.sentence()
    };
};

const generateRandomTagWithLongSlug = () => {
    const seed = faker.string.uuid();
    faker.seed(seed);

    return {
        name: faker.lorem.word(),
        color: faker.internet.color(),
        slug: createTextWithoutSpaces(192),
        description: faker.lorem.sentence()
    };
};

const generateRandomTagWithShortDescription = () => {
    const seed = faker.string.uuid();
    faker.seed(seed);

    return {
        name: faker.lorem.word(),
        color: faker.internet.color(),
        slug: faker.lorem.slug(),
        description: createTextWithoutSpaces(499)
    };
};

const generateRandomTagWithLongDescription = () => {
    const seed = faker.string.uuid();
    faker.seed(seed);

    return {
        name: faker.lorem.word(),
        color: faker.internet.color(),
        slug: faker.lorem.slug(),
        description: createTextWithoutSpaces(501)
    };
};

const generateRandomTagWithShortName = () => {
    const seed = faker.string.uuid();
    faker.seed(seed);

    return {
        name: createTextWithoutSpaces(190),
        color: faker.internet.color(),
        slug: faker.lorem.slug(),
        description: faker.lorem.sentence()
    };
};

const generateRandomTagWithLongName = () => {
    const seed = faker.string.uuid();
    faker.seed(seed);

    return {
        name: createTextWithoutSpaces(192),
        color: faker.internet.color(),
        slug: faker.lorem.slug(),
        description: faker.lorem.sentence()
    };
};

const createRandomTags = (count, slugType) => {
    const tags = [];
    for (let i = 0; i < count; i++) {
        if (slugType === "SHORT_SLUG") {
            tags.push(generateRandomTagWithShortSlug());
        } else if (slugType === "LONG_SLUG") {
            tags.push(generateRandomTagWithLongSlug());
        } else if (slugType === "SHORT_DESCRIPTION") {
            tags.push(generateRandomTagWithShortDescription());
        } else if (slugType === "LONG_DESCRIPTION") {
            tags.push(generateRandomTagWithLongDescription());
        } else if (slugType === "SHORT_NAME") {
            tags.push(generateRandomTagWithShortName());
        } else if (slugType === "LONG_NAME") {
            tags.push(generateRandomTagWithLongName());
        } else {
            tags.push(generateRandomTag());
        }
    }
    return tags;
};

const createTextWithoutSpaces = (length) => {
    let text = '';

    while (text.length < length) {
        const word = faker.lorem.word();
        text += word;
    }

    return text.substr(0, length);
};

describe('Escenarios de pruebas para la funcionalidad tags - a-priori - Ghost', function () {
    let aPrioriData = {};
    before(() => {
        cy.session('user-session', () => {
            loginPage.givenUserIsOnLoginPage();
            loginPage.whenUserLogsIn();
            loginPage.thenUserShouldSeeDashboard();
        });
        cy.fixture('tags-a-priori.json').then((tags) => {
            aPrioriData = tags;
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

    const tag = new Tag();

    it('EP008 - Debería permitir crear un tag con datos válidos (A priori)', () => {
        aPrioriData.tagNormalData.forEach((data) => {
            tag.givenUserIsOnTagsPage();
            tag.andUserStartsCreatingNewTag();
            tag.whenUserEntersTagDetails(data.name, null, data.description);
            tag.thenTagShouldBeVisibleInTagsList(data.name);
        });
    });

    it('EP011 - Debería mostrar un error al intentar crear un tag sin datos (A priori)', () => {
        aPrioriData.tagWithoutData.forEach(() => {
            tag.givenUserIsOnTagsPage();
            tag.andUserStartsCreatingNewTag();
            tag.whenUserClearsFields();
            cy.get(tag.saveTagButton).click();
            tag.thenUserShouldSeeAnError();
        });
    });

    it('EP014 - Debería permitir crear un tag con slug válido (A priori)', () => {
        aPrioriData.tagData.forEach((data) => {
            tag.givenUserIsOnTagsPage();
            tag.andUserStartsCreatingNewTag();
            tag.whenUserEntersTagDetails(data.name, data.slug, data.description);
            tag.thenTagShouldBeVisibleInTagsList(data.name);
        });
    });

    it('EP017 - Crear un nuevo tag con menos de 191 caracteres en el campo slug (A priori)', () => {
        aPrioriData.tagDataLongSlug.forEach((data) => {
            tag.givenUserIsOnTagsPage();
            tag.andUserStartsCreatingNewTag();
            tag.whenUserEntersTagDetails(data.name, data.slug, data.description);
            tag.thenUserShouldSeeAnError();
        });
    });

    it('EP020 - Debería permitir crear un tag con descripción válida (A priori)', () => {
        aPrioriData.tagDataDescription.forEach((data) => {
            tag.givenUserIsOnTagsPage();
            tag.andUserStartsCreatingNewTag();
            tag.whenUserEntersTagDetails(data.name, data.slug, data.description);
            tag.thenTagShouldBeVisibleInTagsList(data.name);
        });
    });

    it('EP023 - Debería mostrar un error al intentar crear un tag con descripción demasiado larga (A priori)', () => {
        aPrioriData.tagDataLongDescription.forEach((data) => {
            tag.givenUserIsOnTagsPage();
            tag.andUserStartsCreatingNewTag();
            tag.whenUserEntersTagDetails(data.name, data.slug, data.description);
            tag.thenUserShouldSeeAnError();
        });
    });

    it('EP026 - Debería mostrar un error al intentar crear un tag con name demasiado largo (A priori)', () => {
        aPrioriData.tagLongNameData.forEach((data) => {
            tag.givenUserIsOnTagsPage();
            tag.andUserStartsCreatingNewTag();
            tag.whenUserEntersTagDetails(data.name, data.slug, data.description);
            tag.thenUserShouldSeeAnError();
        });
    });

    it('EP029 - Debería permitir editar un tag existente (A priori)', () => {
        cy.fixture('tags.json').then((tags) => {
            for (let index = 0; index < 3; index++) {
                tag.givenUserIsOnTagsPage();
                tag.givenUserIsEditingAnExistingTag();
                tag.whenUserClearsFields();
                tag.whenUserEntersTagDetails(tags[index].name, tags[index].slug, tags[index].description);
                tag.thenTagShouldBeVisibleInTagsList(tags[index].name);
            }
        });
    });
});

describe('Escenarios de pruebas para la funcionalidad tags - pseudo-aleatorio - Ghost', function () {
    let pseudoData = [];
    let pseudoRowIndex = 0;

    before(() => {
        cy.session('user-session', () => {
            loginPage.givenUserIsOnLoginPage();
            loginPage.whenUserLogsIn();
            loginPage.thenUserShouldSeeDashboard();
        });
        cy.request(`${apiUrl}/${TAGS_API_MOCK_PATH}`).then((response) => {
            const csvData = response.body;
            pseudoData = parseCsvToJson(csvData);
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

    it('EP009 - Debería permitir crear un tag con datos válidos (Pseudo-aleatorio)', () => {
        pseudoData.forEach((tagData) => {
            tag.givenUserIsOnTagsPage();
            tag.andUserStartsCreatingNewTag();
            tag.whenUserEntersTagDetails(tagData.name, tagData.slug, tagData.description);
            tag.saveTagButton();
            tag.thenTagShouldBeVisibleInTagsList(tagData.name);
        });
    });

    it('EP012 - Debería mostrar un error al intentar crear un tag sin datos (Pseudo-aleatorio)', () => {
        tag.givenUserIsOnTagsPage();
        tag.andUserStartsCreatingNewTag();
        tag.whenUserClearsFields();
        tag.whenUserSavesTag();
        tag.thenUserShouldSeeAnError();
    });

    it('EP015 - Debería permitir crear un tag con slug válido (Pseudo-aleatorio)', () => {
        pseudoData.forEach((tagData) => {
            tag.givenUserIsOnTagsPage();
            tag.andUserStartsCreatingNewTag();
            tag.whenUserEntersTagDetails(tagData.name, tagData.slug, tagData.description);
            tag.thenTagShouldBeVisibleInTagsList(tagData.name);
        });
    });

    it('EP030 - Debería permitir editar un tag existente (Pseudo-aleatorio)', () => {
        for (let i = 0; i < 3; i++) {
            const tagData = pseudoData[pseudoRowIndex];
            tag.givenUserIsOnTagsPage();
            tag.givenUserIsEditingAnExistingTag();
            tag.whenUserEntersTagDetails(tagData.name, tagData.slug, tagData.description);
            tag.thenTagShouldBeVisibleInTagsList(tagData.name);
        }
    });
});
describe('Escenarios de pruebas para la funcionalidad tags - aleatorio - Ghost', function () {

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

    it('EP010 - Debería permitir crear un tag con datos válidos (Aleatorio)', () => {
        const testCases = [
            { type: "SHORT_SLUG", description: "menos de 191 caracteres en el campo slug" },
            { type: "LONG_SLUG", description: "más de 191 caracteres en el campo slug" },
            { type: "SHORT_DESCRIPTION", description: "menos de 500 caracteres en el campo description" },
            { type: "LONG_DESCRIPTION", description: "más de 500 caracteres en el campo description" },
            { type: "SHORT_NAME", description: "menos de 191 caracteres en el campo name" },
            { type: "LONG_NAME", description: "más de 191 caracteres en el campo name" },
        ];
    
        testCases.forEach((testCase) => {
            createRandomTags(3, testCase.type).forEach((data) => {
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
    });

    it('EP031 - Debería permitir editar un tag existente (Aleatorio)', () => {
        for (let i = 0; i < 3; i++) {
            const tagData = {
                name: faker.string.alpha(10),
                slug: faker.string.alpha(10),
                description: faker.lorem.lines(3),
            };
            tag.givenUserIsOnTagsPage();
            tag.givenUserIsEditingAnExistingTag();
            tag.whenUserEntersTagDetails(tagData.name, tagData.slug, tagData.description);
            tag.thenTagShouldBeVisibleInTagsList(tagData.name);
        }
    });
});
