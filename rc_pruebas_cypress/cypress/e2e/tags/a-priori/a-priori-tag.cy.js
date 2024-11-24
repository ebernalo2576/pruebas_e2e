const { Tag } = require('../../pages/tag');
import loginPage from "../../pages/login";
describe('Escenarios de pruebas para la funcionalidad tags - a-priori - Ghost', function () {
    before(() => {
        // Configuración inicial de sesión
        cy.session('user-session', () => {
            loginPage.givenUserIsOnLoginPage(); // Navegar a la página de inicio de sesión
            loginPage.whenUserLogsIn();        // Iniciar sesión
            loginPage.thenUserShouldSeeDashboard(); // Confirmar que el dashboard se cargó
        });
    });

    beforeEach(() => {
        // Restaurar la sesión antes de cada prueba y navegar al dashboard
        cy.session('user-session', () => {
            loginPage.givenUserIsOnLoginPage(); // Navegar a la página de inicio de sesión
            loginPage.whenUserLogsIn();        // Iniciar sesión
            loginPage.thenUserShouldSeeDashboard(); // Confirmar que el dashboard se cargó
        });
        cy.visit(Cypress.env('GHOST_URL') + '/ghost/#/dashboard'); // Navegar al dashboard

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

    function editTagsBDD(tags, allowEmptyFields = false) {
        tags.forEach((tagData) => {
            // GIVEN: Navegar a la lista de tags
            tag.givenUserIsOnTagsPage();

            // AND: Navegar a la edición del último tag
            tag.givenUserIsEditingAnExistingTag();

            // WHEN: Limpiar campos y editar detalles del tag
            tag.whenUserClearsFields();
            if (!allowEmptyFields) {
                tag.whenUserEntersTagDetails(tagData.name, tagData.slug, tagData.description);
            }

            // THEN: Validar resultados
            if (!allowEmptyFields) {
                tag.thenTagShouldBeVisibleInTagsList(tagData.name);
            } else {
                tag.thenUserShouldSeeAnError();
            }
        });
    }

    /**
   * Pruebas para crear un nuevo tag con datos válidos (`tagNormalData`).
   */
    tagNormalData.forEach((data) => {
        it(`Debería permitir crear un tag con datos válidos: ${data.name}`, () => {
            // GIVEN: Navegar a la lista de tags
            tag.givenUserIsOnTagsPage();

            // AND: Comenzar a crear un nuevo tag
            tag.andUserStartsCreatingNewTag();

            // WHEN: Ingresar detalles del tag
            tag.whenUserEntersTagDetails(data.name, null, data.description);

            // THEN: El tag debería estar visible en la lista
            tag.thenTagShouldBeVisibleInTagsList(data.name);
        });
    });



    // /**
    //     * Pruebas para crear un nuevo tag sin datos en los campos (`tagWithoutData`).
    //     */
    tagWithoutData.forEach(() => {
        it('Debería mostrar un error al intentar crear un tag sin datos', () => {
            // GIVEN: Navegar a la lista de tags
            tag.givenUserIsOnTagsPage();

            // AND: Comenzar a crear un nuevo tag
            tag.andUserStartsCreatingNewTag();

            // WHEN: Dejar los campos vacíos y guardar
            tag.whenUserClearsFields();
            cy.get(tag.saveTagButton).click();

            // THEN: El usuario debería ver un error
            tag.thenUserShouldSeeAnError();
        });
    });


    /**
         * Pruebas para crear un nuevo tag con menos de 191 caracteres en el campo `slug`.
         */
    tagData.forEach((data) => {
        it(`Debería permitir crear un tag con slug válido: ${data.name}`, () => {
            // GIVEN: Navegar a la lista de tags
            tag.givenUserIsOnTagsPage();

            // AND: Comenzar a crear un nuevo tag
            tag.andUserStartsCreatingNewTag();

            // WHEN: Ingresar detalles del tag
            tag.whenUserEntersTagDetails(data.name, data.slug, data.description);

            // THEN: El tag debería estar visible en la lista
            tag.thenTagShouldBeVisibleInTagsList(data.name);
        });
    });

    /**
     * Pruebas para crear un nuevo tag con más de 191 caracteres en el campo `slug`.
     */
    tagDataLongSlug.forEach((data) => {
        it(`Debería mostrar un error al intentar crear un tag con slug demasiado largo: ${data.name}`, () => {
            // GIVEN: Navegar a la lista de tags
            tag.givenUserIsOnTagsPage();

            // AND: Comenzar a crear un nuevo tag
            tag.andUserStartsCreatingNewTag();

            // WHEN: Ingresar detalles del tag
            tag.whenUserEntersTagDetails(data.name, data.slug, data.description);

            // THEN: El usuario debería ver un error
            tag.thenUserShouldSeeAnError();
        });
    });

    /**
     * Pruebas para crear un nuevo tag con menos de 500 caracteres en el campo `description`.
     */
    tagDataDescription.forEach((data) => {
        it(`Debería permitir crear un tag con descripción válida: ${data.name}`, () => {
            // GIVEN: Navegar a la lista de tags
            tag.givenUserIsOnTagsPage();

            // AND: Comenzar a crear un nuevo tag
            tag.andUserStartsCreatingNewTag();

            // WHEN: Ingresar detalles del tag
            tag.whenUserEntersTagDetails(data.name, data.slug, data.description);

            // THEN: El tag debería estar visible en la lista
            tag.thenTagShouldBeVisibleInTagsList(data.name);
        });
    });

    /**
     * Pruebas para crear un nuevo tag con más de 500 caracteres en el campo `description`.
     */
    tagDataLongDescription.forEach((data) => {
        it(`Debería mostrar un error al intentar crear un tag con descripción demasiado larga: ${data.name}`, () => {
            // GIVEN: Navegar a la lista de tags
            tag.givenUserIsOnTagsPage();

            // AND: Comenzar a crear un nuevo tag
            tag.andUserStartsCreatingNewTag();

            // WHEN: Ingresar detalles del tag
            tag.whenUserEntersTagDetails(data.name, data.slug, data.description);

            // THEN: El usuario debería ver un error
            tag.thenUserShouldSeeAnError();
        });
    });

    /**
     * Pruebas para crear un nuevo tag con menos de 191 caracteres en el campo `name`.
     */
    tagNameData.forEach((data) => {
        it(`Debería permitir crear un tag con name válido: ${data.name}`, () => {
            // GIVEN: Navegar a la lista de tags
            tag.givenUserIsOnTagsPage();

            // AND: Comenzar a crear un nuevo tag
            tag.andUserStartsCreatingNewTag();

            // WHEN: Ingresar detalles del tag
            tag.whenUserEntersTagDetails(data.name, data.slug, data.description);

            // THEN: El tag debería estar visible en la lista
            tag.thenTagShouldBeVisibleInTagsList(data.name);
        });
    });

    /**
     * Pruebas para crear un nuevo tag con más de 191 caracteres en el campo `name`.
     */
    tagLongNameData.forEach((data) => {
        it(`Debería mostrar un error al intentar crear un tag con name demasiado largo: ${data.name}`, () => {
            // GIVEN: Navegar a la lista de tags
            tag.givenUserIsOnTagsPage();

            // AND: Comenzar a crear un nuevo tag
            tag.andUserStartsCreatingNewTag();

            // WHEN: Ingresar detalles del tag
            tag.whenUserEntersTagDetails(data.name, data.slug, data.description);

            // THEN: El usuario debería ver un error
            tag.thenUserShouldSeeAnError();
        });
    });
 /**
     * Prueba: Editar información de un tag existente.
     */
 it('Debería permitir editar un tag existente', function () {
    cy.fixture('tags.json').then((tags) => {
        for (let index = 0; index < 3; index++) {
            // GIVEN: Navegar a la lista de tags
            tag.givenUserIsOnTagsPage();

            // AND: Navegar a la edición del último tag
            tag.givenUserIsEditingAnExistingTag();

            // WHEN: Limpiar campos y actualizar los detalles del tag
            tag.whenUserClearsFields();
            tag.whenUserEntersTagDetails(tags[index].name, tags[index].slug, tags[index].description);

            // THEN: El tag debería estar visible en la lista con los nuevos datos
            tag.thenTagShouldBeVisibleInTagsList(tags[index].name);
        }
    });
});


})