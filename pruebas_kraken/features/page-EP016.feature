Feature: Debería permitir eliminar una página existente

@user1 @web
Scenario: Debería permitir eliminar una página existente
  Given I open the Ghost login page
  And I wait for 2 seconds
  When I enter login email CSV "USERNAME1"
  And I wait for 3 seconds
  And I enter login password CSV "PASSWORD1"
  And I wait for 3 seconds
  And I submit login
  And I wait for 5 seconds

  Given I navigate to the pages page
  When I create a new page with title "My New Page 1" and content "This is the content of my first page"
  And I publish the page
  And I wait for 2 seconds

  Given I navigate to the pages page
  When I open the page with title "My New Page 1"
  And I delete the page
  And I wait for 3 seconds
  Then I should not see the page with title "My New Page 1" in the pages list