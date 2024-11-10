Feature: Debería permitir ver una página existente en la lista de páginas

@user1 @web
Scenario: Debería permitir ver una página existente en la lista de páginas
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
  Then I should see the page title "My New Page 1" and content "This is the content of my first page"