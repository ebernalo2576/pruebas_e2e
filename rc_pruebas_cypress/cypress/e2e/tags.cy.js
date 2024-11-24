const { Tag } = require('./pages/tag');
import loginPage from "./pages/login";
const apiUrl = Cypress.env('API_URL');
const TAGS_API_MOCK_PATH = Cypress.env('TAGS_API_MOCK_PATH');
import _ from 'lodash';
import { faker } from '@faker-js/faker';

function csvToJson(csv) {
    const content = csv.split('\n');
    const header = content[0].split(',');
    return _.tail(content).map((row) => {
      return _.zipObject(header, row.split(','));
    });
  }


function randomIndex(maximo) {
    return Math.floor(Math.random() * (maximo + 1));
}


function generarTagAleatoria() {
    return {
        name: faker.lorem.word(),
        color: faker.internet.color(),
        slug: faker.lorem.slug(),
        description: faker.lorem.sentence()
    };
}

function generarTagAleatoriaWithShortSlug() {
    const seed = faker.string.uuid();
    faker.seed(seed);
    
    return {
        name: faker.lorem.word(),
        color: faker.internet.color(),
        slug: generateTextWithoutSpaces(190),
        description: faker.lorem.sentence()
    };
}

function generarTagAleatoriaWithLongSlug() {
    const seed = faker.string.uuid();
    faker.seed(seed);
    
    return {
        name: faker.lorem.word(),
        color: faker.internet.color(),
        slug: generateTextWithoutSpaces(192),
        description: faker.lorem.sentence()
    };
}

function generarTagAleatoriaWithShortDescription() {
    const seed = faker.string.uuid();
    faker.seed(seed);
    
    return {
        name: faker.lorem.word(),
        color: faker.internet.color(),
        slug: faker.lorem.slug(),
        description: generateTextWithoutSpaces(499)
    };
}

function generarTagAleatoriaWithLongDescription() {
    const seed = faker.string.uuid();
    faker.seed(seed);
    
    return {
        name: faker.lorem.word(),
        color: faker.internet.color(),
        slug: faker.lorem.slug(),
        description: generateTextWithoutSpaces(501)
    };
}

function generarTagAleatoriaWithShortName() {
    const seed = faker.string.uuid();
    faker.seed(seed);
    
    return {
        name: generateTextWithoutSpaces(190),
        color: faker.internet.color(),
        slug: faker.lorem.slug(),
        description: faker.lorem.sentence()
    };
}

function generarTagAleatoriaWithLongName() {
    const seed = faker.string.uuid();
    faker.seed(seed);
    
    return {
        name: generateTextWithoutSpaces(192),
        color: faker.internet.color(),
        slug: faker.lorem.slug(),
        description: faker.lorem.sentence()
    };
}

function generarTagsAleatorias(cantidad, slugType) {
    let tags = [];
    for (let i = 0; i < cantidad; i++) {
        if(slugType == "SHORT_SLUG") { 
            tags.push(generarTagAleatoriaWithShortSlug());
        }else if(slugType == "LONG_SLUG") { 
            tags.push(generarTagAleatoriaWithLongSlug());
        } else if(slugType == "SHORT_DESCRIPTION") { 
            tags.push(generarTagAleatoriaWithShortDescription());
        } else if(slugType == "LONG_DESCRIPTION") { 
            tags.push(generarTagAleatoriaWithLongDescription());
        } else if(slugType == "SHORT_NAME") { 
            tags.push(generarTagAleatoriaWithShortName());
        } else if(slugType == "LONG_NAME") { 
            tags.push(generarTagAleatoriaWithLongName());
        } else {
            tags.push(generarTagAleatoria());
        }
        
    }
    return tags;
  }

function generateTextWithoutSpaces(length) {
    let text = '';
  
    while (text.length < length) {
      const word = faker.lorem.word();
      text += word;
    }
  
    return text.substr(0, length);
}
  
describe('Escenarios de pruebas para la funcionalidad tags - a-priori - Ghost', function () {
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
    const tag = new Tag();

    const tagWithoutData = [
        {
            id: 1
        },
        {
            id: 2
        },
        {
            id: 3
        }
    ];

    const tagNormalData = [
        {
            name: 'Tecnology',
            color: '232323',
            description: 'This slug is for tecnology topics.'
        },
        {
            name: 'Architecture',
            color: '000000',
            description: 'This slug is for architecture topics.'
        },
        {
            name: 'Software Development',
            color: 'ffffff',
            description: 'This slug is for software development topics.'
        }
    ];

    const tagData = [
        {
            name: 'Tecnology',
            color: '232323',
            slug: 'LabellezadeunahistoriaradicaríasuenfoqueendetenidasrazonesimposiblesLabellezadeunahistoriaradicaríasuenfoqueendetenidasrazonesimposiblesLabellezadeunahistoriaradicaríasuenfoqueendetenidasraz',
            description: 'This slug is for tecnology topics.'
        },
        {
            name: 'Architecture',
            color: '000000',
            slug: 'SolounacaminomudohilvanandodestinosocultossintrazadospredeterminadosSolounacaminomudohilvanandodestinosocultossintrazadospredeterminadosSolounacaminomudohilvanandodestinosocultossintrazadoss',
            description: 'This slug is for architecture topics.'
        },
        {
            name: 'Software Development',
            color: 'ffffff',
            slug: 'DestellosdeesperanzadanzansobremisalmaentrelazadadeversosinconclusosDestellosdeesperanzadanzansobremisalmaentrelazadadeversosinconclusosDestellosdeesperanzadanzansobremisalmaentrelazadadever',
            description: 'This slug is for software development topics.'
        },
        {
            name: 'Blockchain',
            color: '0f0f0f',
            slug: 'SuspensiónperpetuadeseraflorandodesconciertosquehablandeloscaminosolvidadosSuspensiónperpetuadeseraflorandodesconciertosquehablandeloscaminosolvidadosSuspensiónperpetuadeseraflorandodescoooo',
            description: 'This slug is for blockchain topics.'
        },
        {
            name: 'Databases',
            color: '234567',
            slug: 'MiradasentrelazadassecretoscompartidosenununiversosecretoquenadiepercibeMiradasentrelazadassecretoscompartidosenununiversosecretoquenadiepercibeMiradasentrelazadassecretoscompartidosenununiv',
            description: 'This slug is for databases topics.'
        },
        {
            name: 'Spring Framework',
            color: '000987',
            slug: 'VoceserrantesenlanocheclamanporsalvaciónenunmundodesolaciónytristezaVoceserrantesenlanocheclamanporsalvaciónenunmundodesolaciónytristezaVoceserrantesenlanocheclamanporsalvaciónenunmundodesol',
            description: 'This slug is for spring framework topics.'
        },
        {
            name: 'Spring Boot',
            color: '8970ff',
            slug: 'LatidosdiluidosenlasombraentintadaunahistoriaquesoloelvientoconoceLatidosdiluidosenlasombraentintadaunahistoriaquesoloelvientoconoceLatidosdiluidosenlasombraentintadaunahistoriaquesoloelvien',
            description: 'This slug is for spring boot topics.'
        },
        {
            name: 'Angular',
            color: 'fff334',
            slug: 'SilencioabsolutoenmarañadodepalabrasquedibujanimágenesdesvanecidasyetéreasSilencioabsolutoenmarañadodepalabrasquedibujanimágenesdesvanecidasyetéreasSilencioabsolutoenmarañadodepalabrasquedib',
            description: 'This slug is for angular topics.'
        },
        {
            name: 'React',
            color: '009327',
            slug: 'AmaneceradormecidosobreelacantiladomientraselmundodespiertahaciadestinoinciertoAmaneceradormecidosobreelacantiladomientraselmundodespiertahaciadestinoinciertoAmaneceradormecidosobreelacantil',
            description: 'This slug is for react topics.'
        },
        {
            name: 'Kotlin',
            color: 'f9f832',
            slug: 'ertyeceradormecidosobreelacantiladomientraselmundodespiertahaciadestinoinciertoAmaneceradormecidosobreelacantiladomientraselmundodespiertahaciadestinoinciertoAmaneceradormecidosobreelacantil',
            description: 'This slug is for kotlin topics.'
        }
    ];

    const tagNameData = [
        {
            name: 'LabellezadeunahistoriaradicaríasuenfoqueendetenidasrazonesimposiblesLabellezadeunahistoriaradicaríasuenfoqueendetenidasrazonesimposiblesLabellezadeunahistoriaradicaríasuenfoqueendetenidasraz',
            color: '232323',
            slug: 'Tecnology',
            description: 'This slug is for tecnology topics.'
        },
        {
            name: 'SolounacaminomudohilvanandodestinosocultossintrazadospredeterminadosSolounacaminomudohilvanandodestinosocultossintrazadospredeterminadosSolounacaminomudohilvanandodestinosocultossintrazadoss',
            color: '000000',
            slug: 'Architecture',
            description: 'This slug is for architecture topics.'
        },
        {
            name: 'DestellosdeesperanzadanzansobremisalmaentrelazadadeversosinconclusosDestellosdeesperanzadanzansobremisalmaentrelazadadeversosinconclusosDestellosdeesperanzadanzansobremisalmaentrelazadadever',
            color: 'ffffff',
            slug: 'Software Development',
            description: 'This slug is for software development topics.'
        }
    ];

    const tagLongNameData = [
        {
            name: 'LabellezadeunahistoriaradicaríasuenfoqueendetenidasrazonesimposiblesLabellezadeunahistoriaradicaríasuenfoqueendetenidasrazonesimposiblesLabellezadeunahistoriaradicaríasuenfoqueendetenidasrazzz',
            color: '232323',
            slug: 'Tecnology',
            description: 'This slug is for tecnology topics.'
        },
        {
            name: 'SolounacaminomudohilvanandodestinosocultossintrazadospredeterminadosSolounacaminomudohilvanandodestinosocultossintrazadospredeterminadosSolounacaminomudohilvanandodestinosocultossintrazadossss',
            color: '000000',
            slug: 'Architecture',
            description: 'This slug is for architecture topics.'
        },
        {
            name: 'DestellosdeesperanzadanzansobremisalmaentrelazadadeversosinconclusosDestellosdeesperanzadanzansobremisalmaentrelazadadeversosinconclusosDestellosdeesperanzadanzansobremisalmaentrelazadadeverrr',
            color: 'ffffff',
            slug: 'Software Development',
            description: 'This slug is for software development topics.'
        }
    ];

    const tagDataLongSlug = [
        {
            name: 'Tecnology',
            color: '232323',
            slug: '12LabellezadeunahistoriaradicaríasuenfoqueendetenidasrazonesimposiblesLabellezadeunahistoriaradicaríasuenfoqueendetenidasrazonesimposiblesLabellezadeunahistoriaradicaríasuenfoqueendetenidasraz',
            description: 'This slug is for tecnology topics.'
        },
        {
            name: 'Architecture',
            color: '000000',
            slug: '34SolounacaminomudohilvanandodestinosocultossintrazadospredeterminadosSolounacaminomudohilvanandodestinosocultossintrazadospredeterminadosSolounacaminomudohilvanandodestinosocultossintrazadoss',
            description: 'This slug is for architecture topics.'
        },
        {
            name: 'Software Development',
            color: 'ffffff',
            slug: '56DestellosdeesperanzadanzansobremisalmaentrelazadadeversosinconclusosDestellosdeesperanzadanzansobremisalmaentrelazadadeversosinconclusosDestellosdeesperanzadanzansobremisalmaentrelazadadever',
            description: 'This slug is for software development topics.'
        },
        {
            name: 'Blockchain',
            color: '0f0f0f',
            slug: '78SuspensiónperpetuadeseraflorandodesconciertosquehablandeloscaminosolvidadosSuspensiónperpetuadeseraflorandodesconciertosquehablandeloscaminosolvidadosSuspensiónperpetuadeseraflorandodescoooo',
            description: 'This slug is for blockchain topics.'
        },
        {
            name: 'Databases',
            color: '234567',
            slug: '90MiradasentrelazadassecretoscompartidosenununiversosecretoquenadiepercibeMiradasentrelazadassecretoscompartidosenununiversosecretoquenadiepercibeMiradasentrelazadassecretoscompartidosenununiv',
            description: 'This slug is for databases topics.'
        },
        {
            name: 'Spring Framework',
            color: '000987',
            slug: '12VoceserrantesenlanocheclamanporsalvaciónenunmundodesolaciónytristezaVoceserrantesenlanocheclamanporsalvaciónenunmundodesolaciónytristezaVoceserrantesenlanocheclamanporsalvaciónenunmundodesol',
            description: 'This slug is for spring framework topics.'
        },
        {
            name: 'Spring Boot',
            color: '8970ff',
            slug: '34LatidosdiluidosenlasombraentintadaunahistoriaquesoloelvientoconoceLatidosdiluidosenlasombraentintadaunahistoriaquesoloelvientoconoceLatidosdiluidosenlasombraentintadaunahistoriaquesoloelvien',
            description: 'This slug is for spring boot topics.'
        },
        {
            name: 'Angular',
            color: 'fff334',
            slug: '56SilencioabsolutoenmarañadodepalabrasquedibujanimágenesdesvanecidasyetéreasSilencioabsolutoenmarañadodepalabrasquedibujanimágenesdesvanecidasyetéreasSilencioabsolutoenmarañadodepalabrasquedib',
            description: 'This slug is for angular topics.'
        },
        {
            name: 'React',
            color: '009327',
            slug: '78AmaneceradormecidosobreelacantiladomientraselmundodespiertahaciadestinoinciertoAmaneceradormecidosobreelacantiladomientraselmundodespiertahaciadestinoinciertoAmaneceradormecidosobreelacantil',
            description: 'This slug is for react topics.'
        },
        {
            name: 'Kotlin',
            color: 'f9f832',
            slug: '90ertyeceradormecidosobreelacantiladomientraselmundodespiertahaciadestinoinciertoAmaneceradormecidosobreelacantiladomientraselmundodespiertahaciadestinoinciertoAmaneceradormecidosobreelacantil',
            description: 'This slug is for kotlin topics.'
        }
    ];

    const tagDataDescription = [
        {
            name: 'Tecnology',
            color: '232323',
            slug: 'TecnologySlug',
            description: 'This slug is for technology topics. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod magna id fermentum efficitur. Proin auctor finibus massa a pulvinar. Vivamus ac dui at metus consectetur interdum. Nam eu convallis turpis, a luctus lacus. Nullam ultrices, mauris et pulvinar viverra, justo velit finibus mi, sit amet suscipit lacus mi in ex. Quisque eget finibus turpis. Sed id tempor purus. Etiam tristique lorem sed urna efficitur, id feugiat metus fermentum. Quisque finibus'
        },
        {
            name: 'Architecture',
            color: '000000',
            slug: 'ArchitectureSlug',
            description: 'This slug is for architecture topics. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod magna id fermentum efficitur. Proin auctor finibus massa a pulvinar. Vivamus ac dui at metus consectetur interdum. Nam eu convallis turpis, a luctus lacus. Nullam ultrices, mauris et pulvinar viverra, justo velit finibus mi, sit amet suscipit lacus mi in ex. Quisque eget finibus turpis. Sed id tempor purus. Etiam tristique lorem sed urna efficitur, id feugiat metus fermentum. Quisque fini0'
        },
        {
            name: 'Software Development',
            color: 'ffffff',
            slug: 'SoftwareDevSlug',
            description: 'This slug is for software development topics. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod magna id fermentum efficitur. Proin auctor finibus massa a pulvinar. Vivamus ac dui at metus consectetur interdum. Nam eu convallis turpis, a luctus lacus. Nullam ultrices, mauris et pulvinar viverra, justo velit finibus mi, sit amet suscipit lacus mi in ex. Quisque eget finibus turpis. Sed id tempor purus. Etiam tristique lorem sed urna efficitur, id feugiat metus fermentum. Quisq'
        }
    ];

    const tagDataLongDescription = [
        {
            name: 'Tecnology',
            color: '232323',
            slug: 'TecnologySlug',
            description: 'This slug is for technology topics. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod magna id fermentum efficitur. Proin auctor finibus massa a pulvinar. Vivamus ac dui at metus consectetur interdum. Nam eu convallis turpis, a luctus lacus. Nullam ultrices, mauris et pulvinar viverra, justo velit finibus mi, sit amet suscipit lacus mi in ex. Quisque eget finibus turpis. Sed id tempor purus. Etiam tristique lorem sed urna efficitur, id feugiat metus fermentum. Quisque finibusss'
        },
        {
            name: 'Architecture',
            color: '000000',
            slug: 'ArchitectureSlug',
            description: 'This slug is for architecture topics. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod magna id fermentum efficitur. Proin auctor finibus massa a pulvinar. Vivamus ac dui at metus consectetur interdum. Nam eu convallis turpis, a luctus lacus. Nullam ultrices, mauris et pulvinar viverra, justo velit finibus mi, sit amet suscipit lacus mi in ex. Quisque eget finibus turpis. Sed id tempor purus. Etiam tristique lorem sed urna efficitur, id feugiat metus fermentum. Quisque fini000'
        },
        {
            name: 'Software Development',
            color: 'ffffff',
            slug: 'SoftwareDevSlug',
            description: 'This slug is for software development topics. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod magna id fermentum efficitur. Proin auctor finibus massa a pulvinar. Vivamus ac dui at metus consectetur interdum. Nam eu convallis turpis, a luctus lacus. Nullam ultrices, mauris et pulvinar viverra, justo velit finibus mi, sit amet suscipit lacus mi in ex. Quisque eget finibus turpis. Sed id tempor purus. Etiam tristique lorem sed urna efficitur, id feugiat metus fermentum. Quisqqq'
        }
    ];


    tagNormalData.forEach((data) => {
        it(`Debería permitir crear un tag con datos válidos: ${data.name}`, () => {
            tag.givenUserIsOnTagsPage();

            tag.andUserStartsCreatingNewTag();

            tag.whenUserEntersTagDetails(data.name, null, data.description);

            tag.thenTagShouldBeVisibleInTagsList(data.name);
        });
    });



    tagWithoutData.forEach(() => {
        it('Debería mostrar un error al intentar crear un tag sin datos', () => {
            tag.givenUserIsOnTagsPage();

            tag.andUserStartsCreatingNewTag();

            tag.whenUserClearsFields();
            cy.get(tag.saveTagButton).click();

            tag.thenUserShouldSeeAnError();
        });
    });


    tagData.forEach((data) => {
        it(`Debería permitir crear un tag con slug válido: ${data.name}`, () => {
            tag.givenUserIsOnTagsPage();

            tag.andUserStartsCreatingNewTag();

            tag.whenUserEntersTagDetails(data.name, data.slug, data.description);

            tag.thenTagShouldBeVisibleInTagsList(data.name);
        });
    });

    tagDataLongSlug.forEach((data) => {
        it(`Crear un nuevo tag con menos de 191 caracteres en el campo slug : ${data.name}`, () => {
            tag.givenUserIsOnTagsPage();

            tag.andUserStartsCreatingNewTag();

            tag.whenUserEntersTagDetails(data.name, data.slug, data.description);

            tag.thenUserShouldSeeAnError();
        });
    });


    tagDataDescription.forEach((data) => {
        it(`Debería permitir crear un tag con descripción válida: ${data.name}`, () => {
            tag.givenUserIsOnTagsPage();

            tag.andUserStartsCreatingNewTag();

            tag.whenUserEntersTagDetails(data.name, data.slug, data.description);

            tag.thenTagShouldBeVisibleInTagsList(data.name);
        });
    });


    tagDataLongDescription.forEach((data) => {
        it(` Debería mostrar un error al intentar crear un tag con descripción demasiado larga: ${data.name}`, () => {
            tag.givenUserIsOnTagsPage();

            tag.andUserStartsCreatingNewTag();

            tag.whenUserEntersTagDetails(data.name, data.slug, data.description);

            tag.thenUserShouldSeeAnError();
        });
    });


    tagLongNameData.forEach((data) => {
        it(`Debería mostrar un error al intentar crear un tag con name demasiado largo: ${data.name}`, () => {
            tag.givenUserIsOnTagsPage();

            tag.andUserStartsCreatingNewTag();

            tag.whenUserEntersTagDetails(data.name, data.slug, data.description);

            tag.thenUserShouldSeeAnError();
        });
    });

    it('Debería permitir editar un tag existente', function () {
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

        cy.request(apiUrl + "/" + TAGS_API_MOCK_PATH).then((response) => {
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