import { test, expect } from '@playwright/test';
import { GooglePage } from '../pages/GooglePage';
import { WikipediaPage } from '../pages/WikipediaPage';

test.use({
  launchOptions: {
    args: ['--disable-blink-features=AutomationControlled'],
  },
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
});

test('Buscar automatización en Google y validar Wikipedia', async ({ page }) => {
  const googlePage = new GooglePage(page);
  const wikipediaPage = new WikipediaPage(page);

  await googlePage.navigate();
  await googlePage.acceptCookiesIfVisible();
  await googlePage.search('automatización');
  await googlePage.clickWikipediaResult();

  await wikipediaPage.waitForLoad();
  await expect(page).toHaveURL(/wikipedia/);

  const content = await wikipediaPage.getContent();
  expect(content).toContain('en 1785, convirtiéndose en el primer proceso industrial completamente automatizado');

  await wikipediaPage.takeScreenshot('screenshots/wikipedia-automatizacion.png');
});