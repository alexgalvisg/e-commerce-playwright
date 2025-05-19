import { Locator, Page } from "@playwright/test";

export class ProductPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly productName: Locator;
  readonly productPrice: Locator;

    constructor(page: Page, productName: string) {
        this.page = page;
        const productId = productName.replace(/\s+/g, '-').toLowerCase();
        this.addToCartButton = page.locator(`[data-test="add-to-cart-${productId}"]`);
        this.removeButton = page.locator(`[data-test="remove-${productId}"]`);
        this.productName = page.getByText(productName);
    }


    async addToCart() {
        await this.addToCartButton.click();
    }
    async removeFromCart() {
        await this.removeButton.click();
    }
}