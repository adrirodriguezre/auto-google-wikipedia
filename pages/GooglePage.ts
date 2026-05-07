import { Page } from '@playwright/test';

export class GooglePage {
  constructor(private page: Page) {}

  // Ir a la página de Google
  async navigate() {
    await this.page.goto('https://www.google.com', { waitUntil: 'domcontentloaded' });
    await this.page.waitForTimeout(2000);
  }

  // Aceptar cookies
  async acceptCookiesIfVisible() {
    const acceptButton = this.page.locator('button:has-text("Aceptar todo"), button:has-text("Accept all")');
    if (await acceptButton.isVisible()) {
      await acceptButton.click();
      await this.page.waitForTimeout(1500);
    }
  }

  // Escribir en el buscador y pulsar enter
  async search(query: string) {
    const searchBox = this.page.locator('textarea[name="q"]');
    await searchBox.click();
    await this.page.waitForTimeout(1000);
    await searchBox.pressSequentially(query, { delay: 150 });
    await this.page.waitForTimeout(1200);
    await this.page.keyboard.press('Enter');
    await this.page.waitForSelector('a h3', { timeout: 15000 });
    await this.page.waitForTimeout(2000);
  }

  // Clickar en el resultado de Wikipedia
  async clickWikipediaResult() {
    const wikiLink = this.page.locator('a:has(h3)').filter({ hasText: 'Wikipedia' }).first();
    await wikiLink.click();
  }
}
