const { signIn } = require('../../support/utils');
import { faker } from '@faker-js/faker';
const { Tag } = require('../../pageObjects/tag');

describe('Escenarios de pruebas para la funcionalidad tags - random - Ghost', function() {

    const tag = new Tag();

      /**
   * -------------------------------------------------------------
   *                    Crear un nuevo tag desde el panel de Tags con menos de 191 caracteres en el campo slug
   * -------------------------------------------------------------
   */
    generarTagsAleatorias(3, "SHORT_SLUG").forEach((data) => {
        it('Crear un nuevo tag desde el panel de Tags con menos de 191 caracteres en el campo slug.', function() {
            signIn();
            tag.clickTagLink();
            tag.clickNavigateToTagEditor();
            tag.name(data.name);
            tag.slug(data.slug);
            tag.description(data.description);
            tag.save();
            tag.clickTagLink();
            tag.checkTitleInList(data.name);
        })
    });

    /**
   * -------------------------------------------------------------
   *  Crear un nuevo tag desde el panel de Tags con mas de 191 caracteres en el campo slug
   * -------------------------------------------------------------
   */
    generarTagsAleatorias(3, "LONG_SLUG").forEach((data) => {
        it('Crear un nuevo tag desde el panel de Tags con mas de 191 caracteres en el campo slug.', function() {
            signIn();
            tag.clickTagLink();
            tag.clickNavigateToTagEditor();
            tag.name(data.name);
            tag.slug(data.slug);
            tag.description(data.description);
            tag.save();
            tag.checkErrorInTag();
        })
    });

     /**
   * -------------------------------------------------------------
   *  Crear un nuevo tag desde el panel de Tags con menos de 500 caracteres en el campo description
   * -------------------------------------------------------------
   */
     generarTagsAleatorias(3, "SHORT_DESCRIPTION").forEach((data) => {
        it('Crear un nuevo tag desde el panel de Tags con menos de 500 caracteres en el campo description.', function() {
            signIn();
            tag.clickTagLink();
            tag.clickNavigateToTagEditor();
            tag.name(data.name);
            tag.slug(data.slug);
            tag.description(data.description);
            tag.save();
            tag.clickTagLink();
            tag.checkTitleInList(data.name)
        })
    });

    /**
   * -------------------------------------------------------------
   *  Crear un nuevo tag desde el panel de Tags con mas de 500 caracteres en el campo description
   * -------------------------------------------------------------
   */
    generarTagsAleatorias(3, "LONG_DESCRIPTION").forEach((data) => {
        it('Crear un nuevo tag desde el panel de Tags con mas de 500 caracteres en el campo description.', function() {
            signIn();
            tag.clickTagLink();
            tag.clickNavigateToTagEditor();
            tag.name(data.name);
            tag.slug(data.slug);
            tag.description(data.description);
            tag.save();
            tag.checkErrorInTag();
        })
    });


      /**
   * -------------------------------------------------------------
   *  Crear un nuevo tag desde el panel de Tags con menos de 191 caracteres en el campo name
   * -------------------------------------------------------------
   */
      generarTagsAleatorias(3, "SHORT_NAME").forEach((data) => {
        it('Crear un nuevo tag desde el panel de Tags con menos de 191 caracteres en el campo name.', function() {
            signIn();
            tag.clickTagLink();
            tag.clickNavigateToTagEditor();
            tag.name(data.name);
            tag.slug(data.slug);
            tag.description(data.description);
            tag.save();
            tag.clickTagLink();
            tag.checkTitleInList(data.name)
        })
    });

    /**
   * -------------------------------------------------------------
   *  Crear un nuevo tag desde el panel de Tags con mas de 191 caracteres en el campo name
   * -------------------------------------------------------------
   */
    generarTagsAleatorias(3, "LONG_NAME").forEach((data) => {
        it('Crear un nuevo tag desde el panel de Tags con mas de 191 caracteres en el campo name.', function() {
            signIn();
            tag.clickTagLink();
            tag.clickNavigateToTagEditor();
            tag.name(data.name);
            tag.slug(data.slug);
            tag.description(data.description);
            tag.save();
            tag.checkErrorInTag();
        })
    })

     /**
   * -------------------------------------------------------------
   *  Crear un nuevo tag desde el panel de Tags
   * -------------------------------------------------------------
   */
     generarTagsAleatorias(3).forEach((data) => {
        it('Crear un nuevo tag desde el panel de Tags', function() {
            signIn();
            tag.clickTagLink();
            tag.clickNavigateToTagEditor();
            tag.name(data.name);
            tag.description(data.description);
            tag.save();
            tag.clickTagLink();
            tag.checkTitleInList(data.name)
        })
    });

    /**
   * -------------------------------------------------------------
   *  Crear un nuevo tag desde el panel de Tags sin datos en los campos
   * -------------------------------------------------------------
   */
    generarTagsAleatorias(3).forEach((data) => {
        it('Crear un nuevo tag desde el panel de Tags sin datos en los campos.', function() {
            signIn();
            tag.clickTagLink();
            tag.clickNavigateToTagEditor();
            tag.save();
            tag.checkErrorInTag();
        })
    })

    it('Editar información de un tag existente', function() {
        signIn();
        for (let index = 0; index < 3; index++) {
            let tagName = faker.string.alpha(10);
            cy.get('a[href="#/tags/"].ember-view').its('length').then((length) => {
                if (length === 1) {
                    tag.clickNavigateTags();
                } else {
                    tag.clickFirstNavigateTags();
                }
            });
            cy.wait(1000);
            
            tag.clickEditaLastTag();
            cy.wait(1000);
            
            tag.clearName();
            cy.wait(1000);

            tag.name(tagName);
            cy.wait(1000);
            
            tag.slug(faker.string.alpha(10));
            cy.wait(1000);

            tag.clearDescription();
            cy.wait(1000);

            tag.description(faker.lorem.lines(3));
            cy.wait(1000);

            tag.save();
            cy.wait(1000);

            tag.clickFirstNavigateEmberView();
            cy.wait(1000);

            tag.checkTitleInList(tagName);
        }
    })

    it('Editar información de un tag existente dejando campos vacios', function() {
        signIn();
        for (let index = 11; index < 14; index++) {
            let tagName = faker.string.alpha(10);

            cy.get('a[href="#/tags/"].ember-view').its('length').then((length) => {
                if (length === 1) {
                    tag.clickNavigateTags();
                } else {
                    tag.clickFirstNavigateTags();
                }
            });
            cy.wait(1000);
            
            tag.clickEditaLastTag();
            cy.wait(1000);
            
            tag.clearName();
            cy.wait(1000);

            tag.name(tagName);
            cy.wait(1000);

            tag.slug(faker.string.alpha(10));
            cy.wait(1000);

            tag.clearDescription();
            cy.wait(1000);

            tag.save();
            cy.wait(1000);

            tag.clickFirstNavigateEmberView();
            cy.wait(1000);

            tag.checkTitleInList(tagName);
        }
    })
    
    
})
