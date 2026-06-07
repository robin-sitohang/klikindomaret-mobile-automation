@login
Feature: As a user, I want to login with valid credentials
   
  @smoke
  Scenario: Login with valid credentials
    Given I am on the login page
    When I login with valid credentials
    And I dismiss the biometric prompt
    Then I should see my phone number on the Akun Saya page
