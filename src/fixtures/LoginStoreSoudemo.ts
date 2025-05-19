import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

export const test = base.extend<{
  loginStore: () => Promise<void>;
}>({
  loginStore: async ({ page }, use) => {
    await test.step('Ir a la página de login', async () => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();

        await test.step('Ingresar credenciales y hacer login', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        });

        await test.step('Verificar login exitoso', async () => {
        await page.waitForURL(/.*inventory.html/);
        });
    });
    

    await use(() => Promise.resolve());
  },
});