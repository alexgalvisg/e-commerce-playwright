import { Locator, Page } from "@playwright/test";
import { ProductPage } from "./ProductPage";

export class ShoppingCartPage {
  readonly page: Page;
  readonly buttonCheckout: Locator;
  readonly buttonContinueShopping: Locator;
  readonly cartItems: Locator;
 

  constructor(page: Page) {
    this.page = page;
    this.buttonCheckout = page.locator('.btn_action.checkout_button');
    this.buttonContinueShopping = page.locator('.btn_secondary.back_button');
    this.cartItems = page.locator('.cart_item');
  }
  async getCartProducts(): Promise<ProductPage[]> {
    const count = await this.cartItems.count();
    const products: ProductPage[] = [];
    for (let i = 0; i < count; i++) {
      const name = await this.cartItems.nth(i).locator('.inventory_item_name').textContent();
      if (name) {
        products.push(new ProductPage(this.page, name.trim()));
      }
    }
    return products;
  }

  async goToCheckout() {
    await this.buttonCheckout.click();
  }
}
