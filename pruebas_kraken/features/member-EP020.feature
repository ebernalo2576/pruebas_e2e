Feature: Debería permitir eliminar un miembro existente (edited)

@user1 @web
Scenario: Debería permitir eliminar un miembro existente (edited)
  Given I open the Ghost login page
  And I wait for 2 seconds
  When I enter login email CSV "USERNAME1"
  And I wait for 3 seconds
  And I enter login password CSV "PASSWORD1"
  And I wait for 3 seconds
  And I submit login
  And I wait for 5 seconds

  Given I go back to the pages members page
  When I open the member with title "Updated member name"
  And I delete the member
  Then I should not see the member "Updated member name" in the members list