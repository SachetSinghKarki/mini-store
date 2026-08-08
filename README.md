# 🛍️ Mini Store

A modern full-stack e-commerce application built with **Next.js**, **tRPC**, **Prisma**, **PostgreSQL**, **AWS S3**, and **Stripe**.

Mini Store provides a clean shopping experience with product management, media uploads, persistent cart functionality, and secure Stripe checkout — while keeping the application fully type-safe from the database to the frontend.

## ✨ Features

* 🛒 **Shopping Cart**

  * Add and remove products
  * Update quantities
  * Persistent cart state with Zustand

* 📦 **Product Management**

  * Create and browse products
  * Product detail pages
  * Product media support
  * Image/video uploads

* ☁️ **AWS S3 Storage**

  * Secure media storage using Amazon S3
  * Presigned URLs for uploads
  * Supports product media without storing files directly in the application

* 💳 **Stripe Payments**

  * Secure Stripe Checkout
  * Order creation after successful payment
  * Stripe webhook integration
  * Payment status tracking

* 🗄️ **PostgreSQL + Prisma**

  * PostgreSQL database hosted on Neon
  * Prisma ORM
  * Prisma PostgreSQL adapter
  * Type-safe database queries

* 🔌 **tRPC API**

  * End-to-end type safety
  * Server-side procedures
  * TanStack React Query integration
  * No manually maintained REST API types

* ⚡ **Next.js App Router**

  * Server Components
  * Dynamic routes
  * API routes
  * Server-side data fetching

* 🎨 **Modern UI**

  * Responsive interface
  * Tailwind CSS
  * shadcn/ui components
  * Lucide icons
  * Toast notifications with Sonner

---

## 🧰 Tech Stack

| Technology               | Purpose                    |
| ------------------------ | -------------------------- |
| **Next.js 16**           | Full-stack React framework |
| **React 19**             | UI                         |
| **TypeScript**           | Type safety                |
| **tRPC**                 | Type-safe API layer        |
| **TanStack React Query** | Server-state management    |
| **Prisma 7**             | ORM                        |
| **PostgreSQL**           | Database                   |
| **Neon**                 | PostgreSQL hosting         |
| **AWS S3**               | Product media storage      |
| **Stripe**               | Payments                   |
| **Zustand**              | Client-side cart state     |
| **Tailwind CSS**         | Styling                    |
| **shadcn/ui**            | UI components              |
| **Zod**                  | Validation                 |
| **Vercel**               | Deployment                 |

---

## 🏗️ Architecture

```text
                         ┌──────────────────────┐
                         │      Next.js App     │
                         │     App Router       │
                         └──────────┬───────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
              ▼                     ▼                     ▼
       ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
       │    tRPC     │       │   Zustand   │       │   Stripe    │
       │    API      │       │    Cart     │       │  Checkout   │
       └──────┬──────┘       └─────────────┘       └──────┬──────┘
              │                                            │
              ▼                                            ▼
       ┌─────────────┐                              ┌─────────────┐
       │   Prisma    │                              │   Webhook   │
       │   ORM       │                              │    Route    │
       └──────┬──────┘                              └─────────────┘
              │
              ▼
       ┌─────────────┐
       │ PostgreSQL  │
       │    Neon     │
       └─────────────┘

              Product Media
                    │
                    ▼
             ┌─────────────┐
             │   AWS S3    │
             └─────────────┘
```

---

## 📁 Project Structure

```text
mini-store/
│
├── app/
│   ├── api/
│   │   ├── stripe/
│   │   │   └── webhook/
│   │   │       └── route.ts
│   │   ├── trpc/
│   │   │   └── [trpc]/
│   │   └── upload/
│   │
│   ├── products/
│   │   ├── [id]/
│   │   └── create/
│   │
│   ├── cart/
│   ├── success/
│   ├── story/
│   └── page.tsx
│
├── modules/
│   ├── cart/
│   ├── checkout/
│   └── products/
│
├── lib/
│   ├── prisma.ts
│   └── ...
│
├── trpc/
│   ├── client.ts
│   ├── context.ts
│   ├── init.ts
│   ├── provider.tsx
│   ├── query-client.ts
│   ├── router.ts
│   └── server.ts
│
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── ...
│
├── app/generated/
│   └── prisma/
│
├── components/
│   └── ui/
│
├── public/
│
├── prisma.config.ts
├── package.json
└── README.md
```

---

## 🗃️ Database Schema

The application uses PostgreSQL with Prisma.

### Product

```text
Product
├── id
├── name
├── description
├── price
├── createdAt
├── updatedAt
└── media[]
```

### ProductMedia

Stores references to product media stored in S3.

```text
ProductMedia
├── id
├── key
├── type
└── productId
```

Supported media types:

```text
IMAGE
VIDEO
```

### Order

```text
Order
├── id
├── stripeSessionId
├── total
├── status
├── createdAt
└── items[]
```

Order statuses:

```text
PENDING
PAID
FAILED
CANCELLED
```

### OrderItem

Connects products with orders and stores the purchased quantity and price.

---

## ☁️ AWS S3 Media Flow

Product media is stored in Amazon S3 rather than inside the application server.

```text
User
 │
 │ Selects media
 ▼
Next.js
 │
 │ Request signed URL
 ▼
S3 Presigned URL
 │
 │ Upload directly
 ▼
Amazon S3
 │
 │
 ▼
S3 Object Key
 │
 ▼
PostgreSQL
(ProductMedia)
```

This keeps large media files out of the application server and allows S3 to handle file storage efficiently.

---

## 💳 Stripe Payment Flow

The checkout process uses Stripe Checkout and webhooks.

```text
Customer
   │
   ▼
Cart
   │
   ▼
Checkout
   │
   ▼
Stripe Checkout
   │
   ├───────────────┐
   │               │
   ▼               ▼
Success         Webhook
   │               │
   │               ▼
   │          Verify Event
   │               │
   │               ▼
   │          Create/Update
   │             Order
   │
   ▼
Success Page
```

The production webhook endpoint is:

```text
https://mini-store-gules.vercel.app/api/stripe/webhook
```

---

## 🔐 Environment Variables

Create a `.env` file locally:

```env
DATABASE_URL="your-neon-postgresql-url"

AWS_REGION="your-aws-region"
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_S3_BUCKET_NAME="your-bucket-name"

STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
```

> Never commit your `.env` file or expose secret keys publicly.

For Vercel deployments, add the same variables through the project's **Environment Variables** settings.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/SachetSinghKarki/mini-store.git

cd mini-store
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create:

```text
.env
```

and add the required variables.

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Run database migrations

```bash
npx prisma migrate dev
```

### 6. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🏭 Production Build

The project generates Prisma Client automatically before the Next.js production build:

```bash
npm run build
```

which runs:

```text
prisma generate && next build
```

Start the production server with:

```bash
npm start
```

---

## 🔄 Development Workflow

A typical development workflow looks like:

```text
1. Update Prisma schema
          ↓
2. Create migration
          ↓
3. Generate Prisma Client
          ↓
4. Build tRPC procedures
          ↓
5. Connect frontend with React Query
          ↓
6. Test locally
          ↓
7. Push to GitHub
          ↓
8. Deploy to Vercel
```

---

## 🌐 Deployment

The application is deployed using Vercel.

**Live application:**

https://mini-store-gules.vercel.app

### Production webhook

Stripe should send webhook events to:

```text
https://mini-store-gules.vercel.app/api/stripe/webhook
```

Make sure the production environment contains the required Stripe, database, and AWS credentials.

---

## 🧪 Available Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint

# Generate Prisma Client
npx prisma generate

# Create a migration
npx prisma migrate dev

# Check migration status
npx prisma migrate status
```

---

## 🧠 What This Project Demonstrates

Mini Store was built to explore and demonstrate modern full-stack development concepts including:

* Next.js App Router
* Server and Client Components
* tRPC
* TanStack React Query
* Prisma ORM
* PostgreSQL
* Prisma PostgreSQL Adapter
* AWS S3 and presigned URLs
* Stripe Checkout
* Stripe webhooks
* Zustand state management
* Type-safe API design
* Database migrations
* Environment variable management
* Vercel deployment
* Production build configuration

---

## 📌 Future Improvements

Potential additions include:

* [ ] User authentication
* [ ] Admin dashboard
* [ ] Product editing and deletion
* [ ] Product categories
* [ ] Search and filtering
* [ ] Pagination
* [ ] Order history
* [ ] Customer accounts
* [ ] Inventory management
* [ ] Product reviews
* [ ] Email order confirmations
* [ ] Improved payment failure handling
* [ ] Automated testing

---

## 👩‍💻 Author

**Sachet Singh Karki**

Built with curiosity, TypeScript, and a lot of debugging. ☕
