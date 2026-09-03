# JiyanTech — Digital Systems Engineering

Official website for JiyanTech, built as a high-performance **Node.js + Express + EJS** server-rendered multi-page application with **Tailwind CSS**.

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Application
```bash
# Production start
npm start

# Development mode (with auto-reload on file changes)
npm run dev
```

The application will be running at [http://localhost:8080](http://localhost:8080).

---

## Styles & CSS Workflow

Tailwind CSS styles and animations are compiled to `public/css/style.css`.

```bash
# Build minified CSS bundle
npm run build:css

# Watch for CSS changes during development
npm run watch:css
```

---

## Project Structure

```text
jiyantech/
├── data/                  # Dynamic data modules (services, projects, metrics, etc.)
├── public/                # Static assets served by Express
│   ├── css/               # Compiled Tailwind CSS and input CSS
│   └── js/                # Client-side interactions (tabs, filters, forms)
├── views/                 # EJS view templates
│   ├── partials/          # Reusable components (head, navbar, footer, logo)
│   │   ├── sections/      # Hero, services, approach, work, about, cta sections
│   │   └── visuals/       # 3D transforms and SVG diagram visuals
│   ├── index.ejs          # Home page
│   ├── services.ejs       # Services & lifecycle page
│   ├── approach.ejs       # Engineering philosophy & quality gates
│   ├── work.ejs           # Case studies with category filtering
│   ├── about.ejs          # Company background & tech stack
│   ├── contact.ejs        # Contact inquiry form
│   └── 404.ejs            # Branded not-found page
├── server.js              # Express server & route handlers
├── tailwind.config.js     # Tailwind CSS configuration
└── package.json           # Node.js dependencies & scripts
```
