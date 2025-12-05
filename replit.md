# Boutique - Elegant Fashion Store

## Overview
A modern, full-featured boutique e-commerce website built with Next.js 14, featuring a beautiful design with Tailwind CSS, MongoDB database integration, and nodemailer for contact form submissions.

## Project Architecture

### Tech Stack
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS with custom color palette
- **Database**: MongoDB with Mongoose ODM
- **Email**: Nodemailer for contact form
- **Carousel**: Swiper.js for hero slider

### Directory Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── categories/    # Categories API
│   │   ├── contact/       # Contact form API with nodemailer
│   │   ├── products/      # Products API
│   │   └── seed/          # Database seeding API
│   ├── about/             # About page
│   ├── category/[slug]/   # Dynamic category pages
│   ├── contact/           # Contact page with form
│   ├── shop/              # Shop page listing all products
│   └── page.tsx           # Home page with hero slider
├── components/            # React components
│   ├── Cart.tsx          # Shopping cart sidebar
│   ├── Footer.tsx        # Site footer
│   ├── Header.tsx        # Navigation with mega menu
│   ├── HeroSlider.tsx    # Homepage hero carousel
│   ├── ProductCard.tsx   # Individual product card
│   └── ProductGrid.tsx   # Product grid layout
├── context/              # React Context providers
│   └── CartContext.tsx   # Shopping cart state management
├── lib/                  # Utility functions and data
│   ├── data.ts          # Sample products/categories data
│   ├── models/          # Mongoose models
│   ├── mongodb.ts       # Database connection
│   └── nodemailer.ts    # Email configuration
└── types/               # TypeScript type definitions
```

## Features
1. **Home Page**: 100vh hero slider with 3 slides, featured products showcase
2. **Shop Page**: All products with category filtering and sorting
3. **Category Pages**: Dynamic pages filtered by product category
4. **Mega Menu**: Shop dropdown with category images and links
5. **Shopping Cart**: Add/remove products, quantity management
6. **About Page**: Company story and values
7. **Contact Page**: Form with nodemailer integration

## Environment Variables
Required for full functionality:
- `MONGODB_URI`: MongoDB connection string
- `SMTP_HOST`: Email server host
- `SMTP_PORT`: Email server port
- `SMTP_USER`: Email account username
- `SMTP_PASS`: Email account password/app password
- `ADMIN_EMAIL`: Email to receive contact form submissions

## Running the Project
```bash
npm run dev    # Development server on port 5000
npm run build  # Production build
npm start      # Production server
```

## Recent Changes
- December 5, 2025: Initial project setup with all core features

## User Preferences
- Clean, modern UI with pink/rose primary colors
- Responsive design for mobile and desktop
- Cart persists in localStorage
