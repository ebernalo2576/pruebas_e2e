Feature: Hacer Login with properties.json data

@user1 @web
Scenario: Hacer Login
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
  Then I should have a nav-bar with functions
