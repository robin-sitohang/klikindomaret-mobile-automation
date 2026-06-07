import { Given, When, Then } from '@wdio/cucumber-framework';
import HomePage from '../pageobjects/home.page';
import ProductPage from '../pageobjects/product.page';
import CartPage from '../pageobjects/cart.page';

Given(/^I am on the product detail page for "([^"]*)"$/, async (productName: string) => {
    await HomePage.searchProduct(productName);
    await ProductPage.tapProduct(productName);
    await ProductPage.validateProductDetail();
});

When(/^I tap "Tambah Keranjang"$/, async () => {
    await ProductPage.tapAddToCart();
});

Then(/^I should see subtotal item "([^"]*)"$/, async (expectedSubtotal: string) => {
    await ProductPage.verifySubtotal(expectedSubtotal);
});

When(/^I open the cart$/, async () => {
    await HomePage.openCart();
});

When(/^I tap the cart icon$/, async () => {
    await ProductPage.tapCartIcon();
});

Then(/^I should see "([^"]*)" in the cart with price "([^"]*)"$/, async (productName: string, expectedPrice: string) => {
    await CartPage.validateCartPage();
    await CartPage.verifyProductInCart(productName, expectedPrice);
});

When(/^I choose delivery with "([^"]*)"$/, async (serviceType: string) => {
    await CartPage.chooseDelivery(serviceType);
    await CartPage.tapKonfirmasi();
});

When(/^I tap "Konfirmasi"$/, async () => {
    await CartPage.tapKonfirmasi();
});

Then(/^I should see the total pembayaran "([^"]*)"$/, async function (this: any, expectedTotal: string) {
    await CartPage.verifyTotalPembayaran(expectedTotal);
    this.totalPembayaran = expectedTotal;
});

When(/^I tap "Beli"$/, async function (this: any) {
    await CartPage.tapBeli();
});

Then(/^I should be on the payment page$/, async () => {
    await CartPage.validatePaymentPage();
});
