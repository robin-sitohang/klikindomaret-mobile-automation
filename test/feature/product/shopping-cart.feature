@product
Feature: As a user, I want to add product to cart and verify cart badge

  Background:
    Given I am logged in to Klik Indomaret

  @smoke
  Scenario: Search product, view detail, add to cart, and verify cart badge
    When I search for "indomie mi instan ayam bawang 69g"
    Then I should see search result card "Indomie Mi Instan Ayam Bawang 69G" with price "Rp3.000"
    When I tap the search result card
    Then I should see the product detail page
    And the product name should be "Indomie Mi Instan Ayam Bawang 69G"
    And the product price should be "Rp3.000"
    When I tap "Tambah Keranjang"
    Then I should see subtotal item "Rp3.000"
