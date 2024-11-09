Feature: Debería mostrar los posts creados en la lista de posts

@user1 @web
Scenario: Crear y publicar varios posts y verificar su visibilidad en la lista
  Given I open the Ghost login page
  And I wait for 2 seconds
  And I have data from "./generate-data/aprioriLogin.csv"
  And I wait for 2 seconds
  When I enter login email CSV "USERNAME1"
  And I wait for 3 seconds
  And I enter login password CSV "PASSWORD1"
  And I wait for 3 seconds
  And I submit login
  And I wait for 5 seconds
  Given I am on the posts list page
  When I create a new post with title "My New Post 1" and content "This is the content of my first post"
  And I publish the post
  And I wait for 2 seconds
  When I create a new post with title "My New Post 2" and content "This is the content of my second post"
  And I publish the post
  Then I should see all posts in the posts list with titles:
    | My New Post 1 |
    | My New Post 2 |
