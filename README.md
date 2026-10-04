# Panjabi Shop

A bilingual (English / বাংলা) e-commerce storefront for panjabis, built with Next.js (App Router), TypeScript and Tailwind CSS.

## Features

- Home, shop (category filter, search, size filter, sort), product detail with size guide
- Cart and checkout with Inside / Outside Dhaka delivery fees
- Cash on delivery, bKash and Nagad (with transaction ID) payment options
- Order confirmation, order tracking and a demo account area with OTP-style sign-in
- EN / বাংলা toggle, including Bangla numerals
- Cart, language and orders saved in the browser (localStorage)

This is a frontend-only demo: products live in `src/lib/data.ts`, and orders, tracking and sign-in are mocked in the browser.

## Getting started

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm start       # serve the production build
npm run lint
```

## Project structure

- `src/app/` — routes (`/`, `/shop`, `/product/[id]`, `/cart`, `/checkout`, `/track`, `/account`, `/credits`)
- `src/components/` — header, footer, product card, size guide modal, toast and page views
- `src/lib/data.ts` — catalogue, translations and demo data
- `src/lib/store.ts` — client state (cart, language, orders) persisted to localStorage
- `src/lib/photos.ts` — product photos and their licence credits

## Photo credits

Demo product photos are openly licensed (CC0, CC BY, CC BY-SA) images from Wikimedia Commons, Flickr and rawpixel. Full attribution is on the `/credits` page and in `src/lib/photos.ts`. Products without a photo show a colour placeholder.
