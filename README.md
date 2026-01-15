# Interior Design Selling Platform

A full-stack Next.js e-commerce platform for selling interior design products and furniture.

## Features

- 🏠 **Home Page** - Beautiful hero section with featured products
- 🛍️ **Product Catalog** - Browse products by category (Furniture, Decor, Lighting, Textiles, Accessories)
- 📦 **Product Details** - Detailed product pages with images and descriptions
- 🛒 **Shopping Cart** - Add, remove, and update quantities
- 💳 **Checkout** - Complete order placement with customer information
- ✅ **Order Confirmation** - Success page after order placement
- 📱 **Responsive Design** - Works on all devices

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **React Icons** - Beautiful icon library
- **CSS-in-JS** - Styled with Next.js styled-jsx

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── api/              # Backend API routes
│   │   ├── products/     # Product endpoints
│   │   └── orders/       # Order endpoints
│   ├── cart/             # Shopping cart page
│   ├── checkout/         # Checkout page
│   ├── order-success/    # Order confirmation page
│   ├── products/         # Product listing and detail pages
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/           # Reusable components
│   ├── Header.tsx        # Navigation header
│   └── ProductCard.tsx   # Product card component
├── lib/                  # Utility functions and data
│   └── data.ts          # Mock product data
└── types/               # TypeScript type definitions
    └── index.ts         # Product, Cart, Order types
```

## API Routes

### Products
- `GET /api/products` - Get all products
- `GET /api/products/[id]` - Get single product

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders` - Get all orders

## Features in Detail

### Shopping Cart
- Cart data is stored in browser localStorage
- Real-time cart count updates in header
- Add/remove items and update quantities

### Product Categories
- Furniture
- Decor
- Lighting
- Textiles
- Accessories

## Future Enhancements

- User authentication and accounts
- Product search functionality
- Product reviews and ratings
- Payment gateway integration
- Order tracking
- Admin dashboard
- Database integration (PostgreSQL/MongoDB)
- Image upload functionality
- Email notifications

## Build for Production

```bash
npm run build
npm start
```

## License

MIT
