# DocGuard — HeroUI Redesign

Modern redesign of DocGuard using **HeroUI v3**, **React 19**, **Tailwind CSS v4**, and **Vite**.  
Deploys to **Cloudflare Pages** in one command.

---

## Tech Stack

| Layer      | Technology                    |
|------------|-------------------------------|
| UI Library | HeroUI v3 (`@heroui/react`)   |
| Styling    | Tailwind CSS v4               |
| Framework  | React 19 + Vite 6             |
| Fonts      | Syne (headings) + DM Sans     |
| Deployment | Cloudflare Pages via Wrangler |

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
```

Visit `http://localhost:5173`

---

## Build & Deploy to Cloudflare Pages

```bash
# Build production bundle
npm run build

# Deploy to Cloudflare Pages (requires wrangler login)
npx wrangler login
npm run deploy
```

Or connect the repo to Cloudflare Pages dashboard for automatic deployments on push.

---

## Project Structure

```
docguard-heroui/
├── src/
│   ├── App.jsx        # Main component — all sections
│   ├── main.jsx       # React entry point
│   └── index.css      # Global styles + HeroUI + Tailwind imports
├── index.html
├── vite.config.js
├── wrangler.toml      # Cloudflare Pages config
└── package.json
```

---

## HeroUI Components Used

- `Navbar`, `NavbarBrand`, `NavbarContent`, `NavbarItem`, `NavbarMenu`, `NavbarMenuItem`, `NavbarMenuToggle`
- `Button`
- `Card`, `CardHeader`, `CardBody`, `CardFooter`
- `Chip`
- `Input`, `Textarea`, `Select`, `SelectItem`
- `Divider`, `Link`

---

## Customization

- **Colors**: Edit the Tailwind utility classes in `App.jsx` (search for `#0072f5`, `#00c8ff`)
- **Fonts**: Update Google Fonts import in `index.css`
- **Content**: All data arrays are at the top of `App.jsx` for easy editing
- **HeroUI Theme**: Add a `HeroUIProvider` with custom theme in `main.jsx` if needed
