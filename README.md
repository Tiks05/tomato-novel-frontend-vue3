# CMS-frontend · Content Management System Frontend

[![Vue 3](https://img.shields.io/badge/Vue-3.x-green)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)](https://www.typescriptlang.org/)
[![Element Plus](https://img.shields.io/badge/UI-Element_Plus-orange)](https://element-plus.org/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> 🌟 **CMS-frontend** is a Vue3 + TypeScript-powered frontend for an article management system. Styled to emulate the Tomato Novel platform, it supports user registration/login, article browsing, nested comments, author tools, and multi-role navigation. Designed to work seamlessly with [`CMS-backend`](https://github.com/Tiks05/CMS-backend).

---

## 🚀 Features

- 🌐 Vue 3 Composition API with TypeScript support
- 💅 UI built with Element Plus and custom SCSS themes
- 📖 Reader/Author/Admin multi-role views
- 🔐 JWT-based login & user state management via Pinia
- 🧭 Dynamic routing with nested pages (Home / Article / Workspace / Writer)
- 💬 Fully-featured comment system (nested, reply, pagination)
- 🖼️ Avatar upload, book cover upload, banner management
- 📦 Modular API structure using Axios and centralized request handler

---

## 🧱 Tech Stack

| Layer         | Tech                         |
| ------------- | ---------------------------- |
| Framework     | Vue 3                        |
| Language      | TypeScript                   |
| UI Library    | Element Plus                 |
| State Manager | Pinia                        |
| Router        | Vue Router 4                 |
| API Layer     | Axios (via utils/request.ts) |
| CSS Tools     | SCSS + CSS Modules           |
| Icons         | Iconify / SVGs               |

---

## 📁 Project Structure

CMS-frontend/
├── src/
│ ├── apis/ # Encapsulated API modules
│ ├── assets/ # Static resources (icons, images, styles)
│ ├── components/ # Global reusable components
│ ├── composables/ # Custom Vue hooks
│ ├── router/ # Route definitions
│ ├── stores/ # Pinia state management
│ ├── styles/ # SCSS and Element Plus themes
│ ├── utils/ # Utilities (request, qrcode)
│ └── views/ # Pages (Home, Auth, Library, Workspace, Writer)
├── public/
├── index.html
├── tsconfig.json
├── vite.config.ts
└── README.md

---

## 🔧 Setup

### 1. Install dependencies

```bash
pnpm install
```

### 2. Run the development server

```bash
pnpm run dev
```

### 3. Build for production

```bash
pnpm run build
```

### 4. Preview production build locally

```bash
pnpm run preview
```

---

## 🌐 Pages Overview

- `/` — Home page with banners, rankings, news
- `/library` — Book browsing with filters by reader type & genre
- `/book/:id` — Book detail with chapters and comments
- `/workspace` — User dashboard (application, book list)
- `/workspace/writer` — Author dashboard (books, chapters, stats)
- `/auth` — Login / Register page

---

## 🔐 Authentication

- JWT token is stored in `localStorage`
- `@/composables/useUserStore.ts` provides user info/reactivity
- Login required routes are protected via route guards

---

## 📡 API Integration

- Centralized Axios instance: `src/utils/request.ts`
- API modules: `src/apis/*.ts`
- All requests are asynchronous and token-aware

---

## 📄 License

MIT License © 2025 [Tiks](https://github.com/Tiks05)

---

## 🙌 Acknowledgements

- Inspired by [Tomato Novel UI](https://fanqienovel.com/)
- Developed for UI/UX design coursework with full backend integration
