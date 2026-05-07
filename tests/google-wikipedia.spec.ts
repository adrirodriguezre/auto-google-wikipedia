import { test, expect } from '@playwright/test';

test.use({
  // Desactivar flags de automatización para evitar bloqueo de Google
  launchOptions: {
    args: ['--disable-blink-features=AutomationControlled'],
  },
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
});

test('Buscar automatización en Google y validar Wikipedia', async ({ page }) => {

  // Abrir Google
  await page.goto('https://www.google.com', {
    waitUntil: 'domcontentloaded'
  });

  // Espera inicial
  await page.waitForTimeout(2000);

  // Aceptar cookies si aparecen
  const acceptButton = page.locator('button:has-text("Aceptar todo"), button:has-text("Accept all")');

  if (await acceptButton.isVisible()) {
    await acceptButton.click();
    await page.waitForTimeout(1500);
  }

  // Localizar buscador
  const searchBox = page.locator('textarea[name="q"]');

  // Click buscador
  await searchBox.click();

  await page.waitForTimeout(1000);

  // Escribir lentamente en buscador
  await searchBox.pressSequentially('automatización', {
    delay: 150
  });

  // Espera antes de buscar
  await page.waitForTimeout(1200);

  // Enter
  await page.keyboard.press('Enter');

  // Esperar resultados
  await page.waitForSelector('a h3', {
    timeout: 15000
  });

  // Espera
  await page.waitForTimeout(2000);

  // Buscar resultado de Wikipedia
  const wikiLink = page.locator('a:has(h3)').filter({
    hasText: 'Wikipedia'
  }).first();

  await expect(wikiLink).toBeVisible();

  // Click link Wikipedia
  await wikiLink.click();

  // Esperar Wikipedia
  await page.waitForLoadState('domcontentloaded');

  await expect(page).toHaveURL(/wikipedia/);

  // Espera natural
  await page.waitForTimeout(1500);

  // Obtener contenido
  const content = await page.locator('#mw-content-text').innerText();

  // Validación
  expect(content).toContain('en 1785, convirtiéndose en el primer proceso industrial completamente automatizado');

  // Screenshot
  await page.screenshot({
    path: 'screenshots/wikipedia-automatizacion.png',
    fullPage: true
  });

});