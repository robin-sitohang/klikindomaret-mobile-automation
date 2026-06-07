import { $ } from '@wdio/globals';

class ProductPage {
    private get productDetailPage() {
        return $('//android.widget.TextView[contains(@text, "Rp")]');
    }

    private get addToCartButton() {
        return $('//*[@resource-id="com.indomaret.klikindomaret:id/3s"][contains(@text, "Keranjang")]');
    }

    private productInResults(productName: string) {
        return $(`//*[@resource-id="com.indomaret.klikindomaret:id/2jl"]//*[@resource-id="com.indomaret.klikindomaret:id/a87" and contains(@text, "${productName}")]`);
    }

    async verifyProductInResults(productName: string) {
        const product = this.productInResults(productName);
        await product.waitForDisplayed({ timeout: 10000 });
        await expect(product).toBeDisplayed();
    }

    async validateSearchResultCard(productName: string, expectedPrice: string) {
        const card = $('//*[@resource-id="com.indomaret.klikindomaret:id/7fc"]');
        await card.waitForDisplayed({ timeout: 10000 });
        await expect(card).toBeDisplayed();

        const nameEl = $(`//*[@resource-id="com.indomaret.klikindomaret:id/gsu"][contains(@text, "${productName}")]`);
        await expect(nameEl).toBeDisplayed();

        const priceEl = $('//*[@resource-id="com.indomaret.klikindomaret:id/es"]');
        const actualPrice = await priceEl.getText();
        await expect(actualPrice).toContain(expectedPrice);
    }

    async tapSearchResultCard() {
        const card = $('//*[@resource-id="com.indomaret.klikindomaret:id/7fc"]');
        await card.waitForDisplayed({ timeout: 10000 });
        await card.click();
    }

    async tapProduct(productName: string) {
        const product = $(`//*[@resource-id="com.indomaret.klikindomaret:id/2jl"]//*[@text="${productName}" or contains(@text, "${productName}")]`);
        await product.waitForDisplayed({ timeout: 10000 });
        await product.click();
    }

    async validateProductDetail() {
        await this.productDetailPage.waitForDisplayed({ timeout: 10000 });
        await expect(this.productDetailPage).toBeDisplayed();
    }

    async verifyProductName(expectedName: string) {
        const nameEl = $(`//*[@resource-id="com.indomaret.klikindomaret:id/fa4"][contains(@text, "${expectedName}")]`);
        await nameEl.waitForDisplayed({ timeout: 10000 });
        await expect(nameEl).toBeDisplayed();
    }

    async verifyProductPrice(expectedPrice: string) {
        const priceEl = $('//*[@resource-id="com.indomaret.klikindomaret:id/es"]');
        await priceEl.waitForDisplayed({ timeout: 10000 });
        const actualPrice = await priceEl.getText();
        await expect(actualPrice).toContain(expectedPrice);
    }

    async tapAddToCart() {
        await this.addToCartButton.waitForDisplayed({ timeout: 10000 });
        await this.addToCartButton.click();
    }

    async verifySubtotal(expectedSubtotal: string) {
        const subtotal = $(`//android.widget.TextView[contains(@text, "${expectedSubtotal}")]`);
        await subtotal.waitForDisplayed({ timeout: 10000 });
        await expect(subtotal).toBeDisplayed();
    }

    async tapCartIcon() {
        const cartIcon = $('//*[@resource-id="com.indomaret.klikindomaret:id/1r2"]');
        await cartIcon.waitForDisplayed({ timeout: 10000 });
        await cartIcon.click();
    }
}

export default new ProductPage();
