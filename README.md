# Automatización Web

Proyecto en TypeScript con Playwright para automatizar las webs de google y de wikipedia.

---

## Estructura del proyecto

```
auto-google-wikipedia/
├── node_modules/
├── screenshots/          
├── test-results/                 # Se genera después de ejectuar el test
├── tests/
│   └── google-wikipedia.spec.ts  # Tests
├── package-lock.json             
├── package.json                  # Dependencias del proyecto
└── playwright.config.ts          # Configuración playwright
```

---

## 1. Instalar Node.js

Descargar e instalar Node.js desde nodejs.org (versión LTS recomendada)


## 2. Clonar el proyecto

### Opción A — Con Git

**Linux:**
```bash
sudo apt install git
git clone <url-del-repositorio>
cd proyecto
```

**Windows:**
1. Descarga Git desde [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Instálalo y abre `Git Bash`
3. Ejecuta:
```bash
git clone <url-del-repositorio>
cd proyecto
```

### Opción B — Sin Git

Descarga el proyecto como ZIP desde el repositorio, descomprímelo y accede a la carpeta desde la terminal.

---

## 3. Instalar dependencias

Desde la raíz del proyecto:

```bash
npm install
```
---

## 4. Instalar navegadores de Playwright

```bash
npx playwright install
```

## 4. Ejecutar los tests

```bash
npx playwright test
```

El test generará un json como resultado para saber si ha pasado o no y si pasa correctamente generará una captura de pantalla de la página de wikipedia dentro de la carpeta screenshots.

---
