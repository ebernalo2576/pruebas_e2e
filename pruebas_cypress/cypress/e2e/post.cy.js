import login from './pages/login';
import { CreatePost, ViewPosts, ValidatePost, EditPost, UnpublishPost, DeletePost } from './pages/post';
import { faker } from '@faker-js/faker'


const createPost = new CreatePost();
const viewPost = new ViewPosts();
const validatePost = new ValidatePost();
const editPost = new EditPost();
const unpublishPost = new UnpublishPost();
const deletePost = new DeletePost();

const postTitle = faker.lorem.sentence();
const postContent = faker.lorem.paragraph();
const newTitle = faker.lorem.sentence();
const newContent = faker.lorem.paragraph();

describe('Escenarios de pruebas para la funcionalidad post - Ghost', () => {

    it('EP002 - Debería permitir crear un post con un título y descripción aleatoria', () => {
        // Given: El usuario está en la página de inicio de sesión
        login.givenUserIsOnLoginPage();

        // When: El usuario ingresa sus credenciales y envía el formulario
        login.whenUserLogsIn();

        // Then: El usuario debería ver el dashboard
        login.thenUserShouldSeeDashboard();

        // Given: El usuario está en la página de creación de posts
        createPost.givenUserIsOnPostCreation();

        // When: El usuario introduce el título y el contenido del post
        createPost.whenUserEntersPostDetails(postTitle, postContent);

        // When: El usuario publica el post
        createPost.whenUserPublishesPost();

        // Then: El post debería estar visible en la lista de posts
        createPost.thenPostShouldBeVisibleInPostsList(postTitle);
    });

    it('EP003 - Debería mostrar los posts creados en la lista de posts', () => {
        // Given: El usuario está en la página de inicio de sesión
        login.givenUserIsOnLoginPage();
        login.whenUserLogsIn();
        login.thenUserShouldSeeDashboard();

        // Given: El usuario navega a la lista de posts
        viewPost.givenUserIsOnPostsList();

        // Then: Verifica que el post creado esté visible en la lista
        viewPost.thenPostShouldBeVisibleInList(postTitle);
    });

    it('EP004 - Debería visualizar un post y validar título y contenido', () => {
        login.givenUserIsOnLoginPage();
        login.whenUserLogsIn();
        login.thenUserShouldSeeDashboard();

        // Given: El usuario está en la lista de posts
        validatePost.givenUserIsOnPostsList();

        // When: El usuario selecciona un post para visualizarlo
        validatePost.whenUserSelectsPostToView(postTitle);

        // Then: El contenido del post deberían coincidir con los valores esperados
        validatePost.thenPostContentShouldMatch(postContent);

        //quitar/ Then: El usuario regresa al listado de posts
        validatePost.thenUserGoesBackToPostsList();
    });

    it('EP005 - Debería permitir al usuario editar un post existente', () => {
        // Given: El usuario está en la página de inicio de sesión
        login.givenUserIsOnLoginPage();

        // When: El usuario ingresa sus credenciales y envía el formulario
        login.whenUserLogsIn();

        // Then: El usuario debería ver el dashboard
        login.thenUserShouldSeeDashboard();

        // Given: El usuario está en la lista de posts
        editPost.givenUserIsOnPostsList();

        // When: El usuario selecciona un post para editar
        editPost.whenUserSelectsPostToEdit(postTitle);

        // When: El usuario edita el título y el contenido del post
        editPost.whenUserEditsPostDetails(newTitle, newContent);

        // When: El usuario actualiza el post
        editPost.whenUserUpdatesPost();

        // Then: El post debería estar visible en la lista de posts con el nuevo título
        editPost.thenPostShouldBeUpdated(newTitle);
    });

    it('EP006 - Debería permitir despublicar un post existente', () => {
        login.givenUserIsOnLoginPage();
        login.whenUserLogsIn();
        login.thenUserShouldSeeDashboard();

        // Given: El usuario está en la lista de posts
        unpublishPost.givenUserIsOnPostsList();

        // When: El usuario selecciona un post para despublicarlo
        unpublishPost.whenUserSelectsPostToUnpublish(newTitle);

        // When: El usuario despublica el post
        unpublishPost.whenUserUnpublishesPost();

        // Then: El post no debería estar visible en la lista de posts
        unpublishPost.thenPostShouldNotBeVisibleInPostsList(newTitle);
    });

    it('EP007 - Debería permitir al usuario eliminar un post existente', () => {
        // Given: El usuario está en la página de inicio de sesión
        login.givenUserIsOnLoginPage();
        login.whenUserLogsIn();
        login.thenUserShouldSeeDashboard();

        // Given: El usuario está en la lista de posts
        deletePost.givenUserIsOnPostsList();

        // When: El usuario selecciona un post para eliminar
        deletePost.whenUserSelectsPostToDelete(newTitle);

        // When: El usuario confirma la eliminación del post
        deletePost.whenUserConfirmsDeletion();

        // Then: El post no debería estar visible en la lista de posts
        deletePost.thenPostShouldNotBeVisibleInPostsList(newTitle);
    });
    
});