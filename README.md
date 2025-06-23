
# 🎧 EsmeroSound

EsmeroSound es una plataforma web construida con **Next.js + TypeScript + TailwindCSS** que centraliza herramientas para administración, difusión de contenido radial, y generación de shows mediante AI. Esta app está preparada para ser desplegada fácilmente en **Vercel**, y puede adaptarse a otros servicios como Netlify, Railway o Render.

---

## 🚀 Características principales

### 🖥️ Frontend (Next.js App Router)
- Navegación basada en rutas de `/src/app` (Next 13+ App Router).
- Estilo moderno usando TailwindCSS.
- Multisecciones:
  - `/` — Página principal (landing).
  - `/contact`, `/equipo`, `/events`, `/noticias`, `/live-video`, `/podcasts`, etc.
- Layout global con `globals.css` y `layout.tsx`.

### 🛠️ Panel administrativo
Ruta protegida en `/admin` con páginas:
- `dashboard` — Panel principal.
- `news` — Crear y editar noticias.
- `team` — Gestión de miembros del equipo.
- `slideshow` — Gestor de banners o portadas.
- `settings`, `tools`, `web` — Módulos avanzados.

### 📡 Integración AI
En `/src/ai/` y `/src/ai/flows/`:
- Flujo de generación de descripciones de show: `generate-show-description.ts`.

### 📦 Configuración del proyecto
- `vercel.json` — Config listo para Vercel.
- `tailwind.config.ts`, `postcss.config.mjs`, `next.config.ts`
- Manifest para PWA (`public/manifest.json`)
- GitHub Actions para despliegue continuo (`.github/workflows/nextjs.yml`)

---

## 🧪 Requisitos

- Node.js 18+
- npm o yarn
- Cuenta en GitHub
- (opcional) Cuenta en Vercel

---

## ▶️ Instalación local

```bash
git clone https://github.com/TU_USUARIO/esmerosound.git
cd esmerosound
npm install
npm run dev
```

---

## ☁️ Despliegue con un clic

### Vercel (recomendado)

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/luisitoys12/esmerosound)

---

### Alternativas

#### Railway
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template)

#### Netlify
Para desplegar en Netlify, exporta el proyecto (modo estático):
```bash
npm run build
npm run export
```
Luego sube la carpeta `/out` a Netlify.

---

## 🧑‍💻 Estructura de carpetas

```
src/
├── app/
│   ├── admin/
│   ├── contact/
│   ├── equipo/
│   └── ...
├── ai/
│   ├── flows/
│   └── genkit.ts
public/
├── manifest.json
├── favicon.ico
...
```

---

## 📜 Licencia

MIT © EsmeroSound contributors
