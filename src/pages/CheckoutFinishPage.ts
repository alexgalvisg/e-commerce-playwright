import { Locator, Page } from "@playwright/test";

export class CheckoutFinishPage {
    readonly page: Page;
    readonly itemTotal: Locator;

    constructor(page: Page) {
        this.page = page;
        this.itemTotal = page.locator('.summary_subtotal_label');
    }
 
    async getItemTotal() {
        return await this.itemTotal.textContent();
    }

}