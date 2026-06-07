import { $ } from '@wdio/globals';

class HomePage {
    private get searchCard() {
        return $('//*[@resource-id="com.indomaret.klikindomaret:id/30c"]');
    }

    private get tabBeranda() {
        return $('//*[@resource-id="com.indomaret.klikindomaret:id/ckr" and @clickable="true"]');
    }

    private get tabKeranjang() {
        return $('//*[@resource-id="com.indomaret.klikindomaret:id/1tf" and @clickable="true"]');
    }

    private get tabAkun() {
        return $('//android.view.ViewGroup[@resource-id="com.indomaret.klikindomaret:id/ac4"]');
    }

    async navigateToAkun() {
        await this.tabAkun.waitForDisplayed({ timeout: 10000 });
        await this.tabAkun.click();
        await driver.pause(1000);
    }

    async validateOnBeranda() {
        await this.tabBeranda.waitForDisplayed({ timeout: 15000 });
        await expect(this.tabBeranda).toBeDisplayed();
    }

    async openSearch() {
        await this.searchCard.waitForDisplayed({ timeout: 10000 });
        await this.searchCard.click();
    }

    async searchProduct(keyword: string) {
        await this.openSearch();
        const searchInput = $('//*[@resource-id="com.indomaret.klikindomaret:id/aas"]//android.widget.EditText');
        await searchInput.waitForDisplayed({ timeout: 10000 });
        await searchInput.setValue(keyword);
        await driver.pause(1000);

        const firstSuggestion = $(`//*[@resource-id="com.indomaret.klikindomaret:id/a87" and @text="${keyword}"]`);
        if (await firstSuggestion.isDisplayed()) {
            await firstSuggestion.click();
        } else {
            await driver.pressKeyCode(66);
        }
    }

    async openCart() {
        await this.tabKeranjang.waitForDisplayed({ timeout: 10000 });
        await this.tabKeranjang.click();
    }
}

export default new HomePage();
