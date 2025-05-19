import { Page, Browser, expect } from "@playwright/test";
import { test } from '../../fixtures/LoginStoreSoudemo';
import { HomePage } from "../../pages/HomePage";
import { ShoppingCartPage } from "../../pages/ShoppingCartPage";
import { CheckoutFormPage } from "../../pages/CheckoutFormPage";
import { CheckoutFinishPage } from "../../pages/CheckoutFinishPage";


let browser: Browser;
let page: Page;

test.describe('Compra de productos en tienda', () => {
    
    test('Comprar un producto', async ({page, loginStore}) => {
        const productName = 'Sauce Labs Onesie';
        const priceProductAdded = '$7.99';
        const homePage = new HomePage(page, productName);

        await test.step('Login en tienda', async () => {
            await loginStore();
        })

        await test.step(`Agrego el producto ${productName} al carrito`, async () => {
            await homePage.product.addToCart();
            await expect(homePage.buttonCart,'verificar que se agrego producto al carro').toHaveText('1');
        })

        await test.step('Ir al carrito para verificar compra', async () => {
            const shoppingCartPage = new ShoppingCartPage(page);
            await homePage.goToCart();

            await expect(page).toHaveURL(/.*cart.html/);
            await expect(shoppingCartPage.cartItems, 'verificar que el producto se agrego al carrito').toHaveCount(1);
            
            const cartProducts = await shoppingCartPage.getCartProducts();
            const productNamecheck = await cartProducts[0].productName.textContent();

            expect(productNamecheck).toBe(productName);

            await shoppingCartPage.goToCheckout();
            await expect(page).toHaveURL(/.*checkout-step-one.html/);
        })

        await test.step('Hacer checkout y finalizar compra', async () => {    
            const checkoutFormPage = new CheckoutFormPage(page);
            await checkoutFormPage.fillCheckoutForm('Juan', 'Pérez', '12345');
            await checkoutFormPage.clickContinue();
            await expect(page).toHaveURL(/.*checkout-step-two.html/);

            const checkoutFinishPage = new CheckoutFinishPage(page);
            const itemTotalCheckout = await checkoutFinishPage.getItemTotal();

            expect(itemTotalCheckout).toContain(priceProductAdded);
        })
    });

    // crear un test para comprar 2 productos
    test('Comprar dos productos', async ({page, loginStore}) => {
        const productName1 = 'Sauce Labs Onesie';
        const productName2 = 'Sauce Labs Bike Light';
        const priceProductAdded = '$17.98';
        const homePage = new HomePage(page, productName1);

        await test.step('Login en tienda', async () => {
            await loginStore();
        })

        await test.step(`Agrego el producto ${productName1} al carrito`, async () => {
            await homePage.product.addToCart();
            await expect(homePage.buttonCart,'verificar que se agrego producto al carro').toHaveText('1');
        })

        await test.step(`Agrego el producto ${productName2} al carrito`, async () => {
            const productPage2 = new HomePage(page, productName2);
            await productPage2.product.addToCart();
            await expect(homePage.buttonCart,'verificar que se agrego producto al carro').toHaveText('2');
        })

        await test.step('Ir al carrito para verificar compra', async () => {
            const shoppingCartPage = new ShoppingCartPage(page);
            await homePage.goToCart();

            await expect(page).toHaveURL(/.*cart.html/);
            await expect(shoppingCartPage.cartItems, 'verificar que el producto se agrego al carrito').toHaveCount(2);
            
            const cartProducts = await shoppingCartPage.getCartProducts();
            const productNamecheck1 = await cartProducts[0].productName.textContent();
            const productNamecheck2 = await cartProducts[1].productName.textContent();

            expect(productNamecheck1).toBe(productName1);
            expect(productNamecheck2).toBe(productName2);

            await shoppingCartPage.goToCheckout();
            await expect(page).toHaveURL(/.*checkout-step-one.html/);
        })

        await test.step('Hacer checkout y finalizar compra', async () => {    
            const checkoutFormPage = new CheckoutFormPage(page);
            await checkoutFormPage.fillCheckoutForm('Juan', 'Pérez', '12345');
            await checkoutFormPage.clickContinue();
            await expect(page).toHaveURL(/.*checkout-step-two.html/);

            const checkoutFinishPage = new CheckoutFinishPage(page);
            const itemTotalCheckout = await checkoutFinishPage.getItemTotal();

            expect(itemTotalCheckout).toContain(priceProductAdded);
        })
    });
});



