Feature: Crear un post con titulo y descripcion aleatoria

@user1 @web
Scenario: Hacer Login y Crear Post
  Given I open the Ghost login page
  And I wait for 2 seconds
  And I have data from "./generate-data/aprioriLogin.csv"
  And I wait for 2 seconds
  When I enter login email CSV "USERNAME1"
  And I wait for 3 seconds
  And I enter login password CSV "PASSWORD1"
  And I wait for 3 seconds
  And I submit login
  And I wait for 2 seconds
  Then I should have a nav-bar with functions
  And I wait for 2 seconds
  And I navigate to the posts page
  And I wait for 2 seconds
  When I create a new post with random title "hector" and description "eduard"
  Then I should see the new post in the post list with the name "hector"
