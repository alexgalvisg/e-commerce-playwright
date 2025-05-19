import { Locator, Page  } from "@playwright/test";
import { ProductPage } from "./ProductPage";

export class HomePage {
  readonly page: Page;
  readonly product: ProductPage;
  readonly buttonCart: Locator;

  
  constructor(page: Page, productName: string) {
    this.page = page;
    this.product = new ProductPage(page, productName);
    this.buttonCart = page.locator('.shopping_cart_link');
  }

    async goToCart() {
        await this.buttonCart.click();
    }
}