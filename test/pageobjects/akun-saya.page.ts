import { $ } from '@wdio/globals';

class AkunSayaPage {
    private get titleAkunSaya() {
        return $('//android.widget.TextView[@text="Akun Saya"]');
    }

    private get txtPhone() {
        return $('//android.widget.TextView[@resource-id="com.indomaret.klikindomaret:id/e7q"]');
    }

    async validateOnAkunSaya(expectedPhone: string) {
        await this.titleAkunSaya.waitForDisplayed({ timeout: 15000 });
        await expect(this.titleAkunSaya).toBeDisplayed();

        await this.txtPhone.waitForDisplayed({ timeout: 10000 });
        const phoneText = await this.txtPhone.getText();
        await expect(phoneText).toBe(expectedPhone);
    }
}

export default new AkunSayaPage();
