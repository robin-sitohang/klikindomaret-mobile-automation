import { $ } from '@wdio/globals';

class LoginPage {
    private get inputPhone() {
        return $('//android.widget.EditText[@text="Masukkan Nomor Handphone atau Email"]');
    }

    private get btnLanjut() {
        return $('//*[@resource-id="com.indomaret.klikindomaret:id/5mp"]');
    }

    private get inputPassword() {
        return $('//android.widget.EditText[@text="Kata Sandi"]');
    }

    private get btnMasuk() {
        return $('//android.widget.TextView[@text="Masuk"]');
    }

    async validateOnLoginPage() {
        await this.inputPhone.waitForDisplayed({ timeout: 15000 });
        await expect(this.inputPhone).toBeDisplayed();
    }

    async enterPhone(phone: string) {
        await this.inputPhone.waitForDisplayed({ timeout: 15000 });
        await this.inputPhone.clearValue();
        await this.inputPhone.setValue(phone);
    }

    async tapLanjut() {
        await this.btnLanjut.waitForDisplayed({ timeout: 10000 });
        await this.btnLanjut.click();
    }

    async enterPassword(password: string) {
        await this.inputPassword.waitForDisplayed({ timeout: 10000 });
        await this.inputPassword.clearValue();
        await this.inputPassword.setValue(password);
    }

    async tapMasuk() {
        await this.btnMasuk.waitForDisplayed({ timeout: 10000 });
        await this.btnMasuk.click();
    }

    async login(phone: string, password: string) {
        await this.enterPhone(phone);
        await this.tapLanjut();
        await this.enterPassword(password);
        await this.tapMasuk();
    }

    async waitForOTP(seconds = 60) {
        console.log(`[LOGIN] Waiting ${seconds}s for manual OTP input...`);
        await driver.pause(seconds * 1000);
        console.log('[LOGIN] OTP timeout done.');
    }

    async dismissBiometric() {
        const btnNantiSaja = $('//*[@resource-id="com.indomaret.klikindomaret:id/9t1"]');
        try {
            await btnNantiSaja.waitForDisplayed({ timeout: 10000 });
            await btnNantiSaja.click();
        } catch {
            console.log('[BIOMETRIC] Biometric prompt not shown, skipping.');
        }
    }

    async navigateToLogin() {
        const btnMasukDaftar = $('//*[@resource-id="com.indomaret.klikindomaret:id/did"]');
        await btnMasukDaftar.waitForDisplayed({ timeout: 10000 });
        await btnMasukDaftar.click();
        await driver.pause(1000);
        await this.validateOnLoginPage();
    }
}

export default new LoginPage();
