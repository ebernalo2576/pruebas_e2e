Feature: Debería permitir al usuario editar una página existente

@user1 @web
Scenario: Debería permitir al usuario editar una página existente
  Given I open the Ghost login page
  And I wait for 2 seconds
  When I enter login email CSV "USERNAME1"
  And I wait for 3 seconds
  And I enter login password CSV "PASSWORD1"
  And I wait for 3 seconds
  And I submit login
  And I wait for 5 seconds

  Given I navigate to the pages page
  And I enter to create a new page
  And I enter page details "My New Page 1" "This is the content of my first page"
  And I publish the page
  And I wait for 2 seconds

  Given I navigate to the pages page
  When I open the page with title "My New Page 1"
  And I edit the page title to "Updated Page Title" and content "Updated content of the page"
  And I edit the page
  And I navigate to the pages page
  Then I should see the page "Updated Page Title" in the pages list
