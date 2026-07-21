# Poly Oil HR

A full-stack web platform combining a public-facing **React** front-end with a **Node.js/Express** back-end API, using **MongoDB** for data storage and **Supabase** for additional backend services.

---

## 🏗️ Project Structure

This is a monorepo with two main folders:

```
Poly-Oil-HR/
├── Front/     # React + TypeScript + Vite front-end
└── Back/      # Node.js + Express back-end API
```

## 🛠️ Tech Stack

### Frontend (`Front/`)

| Category | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Routing | `react-router-dom` |
| Styling | Tailwind CSS |
| Internationalization | `i18next`, `react-i18next`, `i18next-browser-languagedetector`, `country-flag-icons` |
| Icons | `lucide-react` |
| SEO | `react-helmet-async` + custom sitemap generation script |
| Backend-as-a-Service | `@supabase/supabase-js` |
| Image Processing | `@imgly/background-removal` |
| E2E Testing | Playwright (`@playwright/test`) |
| Load Testing | k6 |
| Linting | ESLint + `typescript-eslint` |

### Backend (`Back/`)

| Category | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express 4 |
| Database | MongoDB (via `mongoose`) |
| Authentication | `jsonwebtoken`, `bcryptjs`, `cookie-parser` |
| Email | `nodemailer`, `resend` |
| HTTP Client | `axios` |
| Environment Config | `dotenv` |
| Dev Tooling | `nodemon` |

## ✨ Features (inferred from dependencies)

- 🌍 Multi-language front-end (with flag-based language switcher)
- 🔐 Authentication & session handling with JWT and hashed passwords
- 📧 Transactional email sending (welcome emails, notifications, password resets, etc.)
- 🗺️ Automatic sitemap generation for SEO (`postbuild` / `generate:sitemap` scripts)
- 🖼️ Client-side image background removal
- ☁️ Supabase integration alongside a custom Express/MongoDB API
- ✅ End-to-end testing with Playwright, including headed and UI modes

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm
- A MongoDB instance (local or Atlas)
- A Supabase project (URL + anon key)

### 1. Clone the repository

```bash
git clone https://github.com/eyanft/Poly-Oil-HR.git
cd Poly-Oil-HR
```

### 2. Backend setup (`Back/`)

```bash
cd Back
npm install
```

Create a `.env` file in `Back/` with the required variables, for example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODEMAILER_EMAIL=your_email
NODEMAILER_PASSWORD=your_email_password
RESEND_API_KEY=your_resend_api_key
```

Run the backend:

```bash
npm start        # production
npm run dev       # development (with nodemon auto-reload)
```

### 3. Frontend setup (`Front/`)

```bash
cd Front
npm install
```

Create a `.env` file in `Front/` with your Supabase credentials and API base URL, for example:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_BASE_URL=http://localhost:5000
```

Run the frontend:

```bash
npm run dev        # start dev server
npm run build       # production build (also generates sitemap via postbuild)
npm run preview      # preview the production build
```

## 🧪 Testing

From the `Front/` folder:

```bash
npm run typecheck        # TypeScript type checking
npm run lint              # ESLint
npm run test:e2e           # Playwright end-to-end tests
npm run test:e2e:headed     # Playwright tests in headed mode
npm run test:e2e:ui          # Playwright test UI
```

## 🗺️ SEO / Sitemap

The frontend includes a sitemap generation script (`scripts/generate-sitemap.js`), automatically run after every build (`postbuild`), and can also be run manually:

```bash
npm run generate:sitemap
```

A Google Search Console verification file (`google6cc643a7bfdff8fd.html`) is included at the repository root.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

No license currently specified. Add your preferred license (MIT, Apache 2.0, etc.) here.

## 👤 Author

[Eya Naffeti](https://github.com/eyanft) — [Poly-Oil-HR repository](https://github.com/eyanft/Poly-Oil-HR)
