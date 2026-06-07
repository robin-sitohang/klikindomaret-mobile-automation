import { $ } from '@wdio/globals';

class CartPage {
    private get cartPageIndicator() {
        return $('//android.widget.TextView[@text="Keranjang Belanja" or @text="Keranjang"]');
    }

    private get deliveryCard() {
        return $('//*[@resource-id="com.indomaret.klikindomaret:id/7fc"]');
    }

    private get btnKonfirmasi() {
        return $('//*[@resource-id="com.indomaret.klikindomaret:id/did"][@text="Konfirmasi"]');
    }

    private get totalPembayaranValue() {
        return $('//*[@resource-id="com.indomaret.klikindomaret:id/7hn"]');
    }

    private get btnBeli() {
        return $('//*[@resource-id="com.indomaret.klikindomaret:id/frj"]');
    }

    async validateCartPage() {
        await this.cartPageIndicator.waitForDisplayed({ timeout: 10000 });
        await expect(this.cartPageIndicator).toBeDisplayed();
    }

    async verifyProductInCart(productName: string, expectedPrice: string) {
        const product = $(`//android.widget.TextView[@text="${productName}" or contains(@text, "${productName}")]`);
        await product.waitForDisplayed({ timeout: 10000 });
        await expect(product).toBeDisplayed();

        const price = $(`//android.widget.TextView[contains(@text, "${expectedPrice}")]`);
        await expect(price).toBeDisplayed();
    }

    async chooseDelivery(serviceType: string) {
        await this.deliveryCard.waitForDisplayed({ timeout: 10000 });
        await this.deliveryCard.click();
        await driver.pause(1000);

        const serviceEl = $(`//*[@resource-id="com.indomaret.klikindomaret:id/ffp"][contains(@text, "${serviceType}")]`);
        await serviceEl.waitForDisplayed({ timeout: 10000 });
        await serviceEl.click();
        await driver.pause(500);
    }

    async tapKonfirmasi() {
        await this.btnKonfirmasi.waitForDisplayed({ timeout: 10000 });
        await this.btnKonfirmasi.click();
    }

    async getTotalPembayaran() {
        await this.totalPembayaranValue.waitForDisplayed({ timeout: 15000 });
        return await this.totalPembayaranValue.getText();
    }

    async verifyTotalPembayaran(expectedTotal: string) {
        await this.totalPembayaranValue.waitForDisplayed({ timeout: 10000 });
        const actualTotal = await this.totalPembayaranValue.getText();
        await expect(actualTotal).toContain(expectedTotal);
    }

    async tapBeli() {
        await this.btnBeli.waitForDisplayed({ timeout: 10000 });
        await this.btnBeli.click();
    }

    async validatePaymentPage() {
        const paymentIndicator = $('//android.widget.TextView[@text="Pembayaran" or @text="Metode Pembayaran" or contains(@text, "Pembayaran")]');
        await paymentIndicator.waitForDisplayed({ timeout: 15000 });
        await expect(paymentIndicator).toBeDisplayed();
    }
}

export default new CartPage();
