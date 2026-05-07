import { Page } from '@playwright/test';

export class WikipediaPage {
  constructor(private page: Page) {}

  // Esperar a que cargue la página
  async waitForLoad() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(1500);
  }

  // Obtiene el texto del contenido de la pagina
  async getContent(): Promise<string> {
    return await this.page.locator('#mw-content-text').innerText();
  }

  // Hace captura de pantalla de la página
  async takeScreenshot(path: string) {
    await this.page.screenshot({ path, fullPage: true });
  }
}
