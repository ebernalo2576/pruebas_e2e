Feature: Debería permitir al usuario editar un miembro existente

@user1 @web
Scenario: Debería permitir al usuario editar un miembro existente
  Given I open the Ghost login page
  And I wait for 2 seconds
  When I enter login email CSV "USERNAME1"
  And I wait for 3 seconds
  And I enter login password CSV "PASSWORD1"
  And I wait for 3 seconds
  And I submit login
  And I wait for 5 seconds

  Given I am on the members list page

  When I enter member title "My New member" and email "h3@gmail.com"
  Then I publish the member
  Then I go back to the pages members page
  Then I should see the member with email "My New member" in the members list

  Given I go back to the pages members page
  When I open the member with title "My New member"
  And I edit the member name to "Updated member name"
  And I update the member
  Then I should see the member "Updated member name" in the members list
