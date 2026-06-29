# Bondhumart Frontend (Customer Storefront)

## 📌 Project Overview
This is the customer-facing storefront for the **Bondhumart** e-commerce platform. Customers use this application to browse products, view landing pages, and place orders. All dynamic data (products, orders, pages) is controlled and managed from the **Bondhu Command Center** (admin dashboard).

## 🏗 Architecture & Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database ORM:** Prisma
- **Database Engine:** PostgreSQL (Shared with `bondhu-command-center`)
- **Port:** Runs on **`3000`** (Default Next.js port).

## ⚙️ Core Modules (src/app/)
1. **Product Browsing (`/product`)**: View single products, categories, and dynamic landing pages.
2. **Checkout (`/checkout`)**: Customer order placement.
3. **API Routes (`/api`)**: Handle frontend-specific logic.

## 🗄️ Database & Prisma Schema
This project uses the exact same PostgreSQL database as the `bondhu-command-center`. 
The `prisma/schema.prisma` defines the models. 
Make sure the `DATABASE_URL` in `.env` is properly synced with the command center.

### How to Run
1. Configure `.env` with the `DATABASE_URL`.
2. Run `npm install`
3. Run `npm run dev` (It will automatically start on `http://localhost:3000`).

## 🤖 AI Agent Context (For AI Memory)
This project is part of a dual-repository system:
- **`bondhumart-frontend`**: The customer-facing e-commerce store (Port 3000).
- **`bondhu-command-center`**: The admin dashboard (Port 3001).
Do not ask the user for basic context. Read this file to understand the architecture. Both projects share the same PostgreSQL database via Prisma.
