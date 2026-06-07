import { Given, When, Then } from '@wdio/cucumber-framework';
import LoginPage from '../pageobjects/login.page';
import HomePage from '../pageobjects/home.page';
import AkunSayaPage from '../pageobjects/akun-saya.page';

Given(/^I am on the login page$/, async () => {
    await HomePage.navigateToAkun();
    await LoginPage.navigateToLogin();
});

When(/^I login with valid credentials$/, async () => {
    const email = process.env.EMAIL as string;
    const password = process.env.PASSWORD as string;

    if (!email || !password) {
        throw new Error('EMAIL and PASSWORD must be set in .env file');
    }

    await LoginPage.login(email, password);
});

When(/^I dismiss the biometric prompt$/, async () => {
    await LoginPage.dismissBiometric();
    await LoginPage.waitForOTP(60000);
});

Then(/^I should see my phone number on the Akun Saya page$/, async () => {
    const phone = process.env.EMAIL as string;

    if (!phone) {
        throw new Error('EMAIL must be set in .env file');
    }

    await AkunSayaPage.validateOnAkunSaya(phone);
});

Given(/^I am logged in to Klik Indomaret$/, async () => {
    const email = process.env.EMAIL as string;
    const password = process.env.PASSWORD as string;

    if (!email || !password) {
        throw new Error('EMAIL and PASSWORD must be set in .env file');
    }

    await HomePage.navigateToAkun();
    await LoginPage.navigateToLogin();
    await LoginPage.login(email, password);
    await LoginPage.waitForOTP(60000);
});
