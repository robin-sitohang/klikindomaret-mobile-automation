import { When, Then } from '@wdio/cucumber-framework';
import HomePage from '../pageobjects/home.page';
import ProductPage from '../pageobjects/product.page';

When(/^I search for "([^"]*)"$/, async (keyword: string) => {
    await HomePage.searchProduct(keyword);
});

Then(/^I should see "([^"]*)" in search results$/, async (productName: string) => {
    await ProductPage.verifyProductInResults(productName);
});

Then(/^I should see search result card "([^"]*)" with price "([^"]*)"$/, async (productName: string, expectedPrice: string) => {
    await ProductPage.validateSearchResultCard(productName, expectedPrice);
});

When(/^I tap the search result card$/, async () => {
    await ProductPage.tapSearchResultCard();
});

When(/^I tap on "([^"]*)"$/, async (productName: string) => {
    await ProductPage.tapProduct(productName);
});

Then(/^I should see the product detail page$/, async () => {
    await ProductPage.validateProductDetail();
});

Then(/^the product name should be "([^"]*)"$/, async (expectedName: string) => {
    await ProductPage.verifyProductName(expectedName);
});

Then(/^the product price should be "([^"]*)"$/, async (expectedPrice: string) => {
    await ProductPage.verifyProductPrice(expectedPrice);
});
