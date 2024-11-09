Feature: Hacer con usuario y password incorrecto

@user1 @web
Scenario: Hacer Login con usuario y password incorrecto
  Given I open the Ghost login page
  And I wait for 2 seconds
  And I have data from "./generate-data/aprioriLogin.csv"
  And I wait for 2 seconds
  When I enter login email CSV "f1@gmail.com"
  And I wait for 3 seconds
  And I enter login password CSV "123456"
  And I wait for 3 seconds
  And I submit login
  And I wait for 5 seconds
  Then I should have a error message present
