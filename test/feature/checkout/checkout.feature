@checkout
Feature: As a user, I want to add product to cart

  @smoke
  Scenario: Add to cart, choose delivery, and proceed to payment
    When I search for "indomie mi instan ayam bawang 69g"
    Then I should see search result card "Indomie Mi Instan Ayam Bawang 69G" with price "Rp3.000"
    When I tap the search result card
    Then I should see the product detail page
    And the product name should be "Indomie Mi Instan Ayam Bawang 69G"
    And the product price should be "Rp3.000"
    When I tap "Tambah Keranjang"
    Then I should see subtotal item "Rp3.000"
    When I tap the cart icon
    Then I should see "Indomie Mi Instan Ayam Bawang 69G" in the cart with price "Rp3.000"
    When I choose delivery with "Instan"
    Then I should see the total pembayaran "Rp10.000"
    When I tap "Beli"
    Then I should be on the payment page
