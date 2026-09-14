# 🌿 Fabiha Organic

Handcrafted organic soaps, shampoo, toner, and lip balm — an e-commerce storefront with a dedicated owner's orders portal. Built with a plain **HTML/CSS/JavaScript frontend** and a **Node.js/Express backend**.

## 📁 Project Structure

```
.
├── frontend/                 # Static site (HTML, CSS, JavaScript)
│   ├── index.html            # Homepage
│   ├── products.html         # Product catalog
│   ├── about.html            # About page
│   ├── contact.html          # Contact form (POST /api/contact)
│   ├── order.html            # Checkout — fill details, copy order to clipboard
│   ├── success.html          # Order confirmation page
│   ├── orders.html           # Owner orders portal (password protected)
│   ├── 404.html
│   ├── css/
│   │   └── styles.css        # Full design system (organic green palette)
│   └── js/
│       ├── data.js           # Product catalog + shared API_BASE_URL
│       ├── components.js     # Injects navbar/footer/cart drawer
│       ├── cart.js           # Shopping cart state (localStorage)
│       ├── order.js          # Checkout logic
│       ├── orders.js         # Orders portal logic
│       └── contact.js        # Contact form logic
│
└── backend/                  # Node.js / Express API
    ├── server.js             # Express server + serves frontend
    ├── package.json
    ├── lib/
    │   └── token.js          # Signed session-token helpers
    ├── routes/
    │   ├── auth.js           # POST /api/auth
    │   ├── orders.js         # GET/POST /api/orders, PATCH /api/orders/:id
    │   └── contact.js        # POST /api/contact
    └── data/
        ├── orders.json       # Order "database" (JSON file)
        └── messages.json     # Contact messages
```

## 🚀 Running Locally

Prerequisites: [Node.js](https://nodejs.org/) 18+.

```bash
# 1. Install backend dependencies
cd backend
npm install

# 2. Configure environment (optional — defaults work out of the box)
copy .env.example .env
# edit bank details + ORDERS_PASSWORD

# 3. Start the server
npm start
```

Then open **http://localhost:3000**.

The backend serves both the API **and** the `frontend/` static files, so no separate step is needed.

## 🌐 Deployment

The live backend URL is set in `frontend/js/data.js`:

```js
var API_BASE_URL = "https://fabiha-organic-c7573xxte-creator66888.vercel.app";
```

> ⚠️ Vercel does not run a long-lived `node server.js` process. To deploy the backend
> on Vercel, export the Express `app` from a serverless entry point
> (e.g. `api/index.js`) with a `vercel.json` config. Until the backend is deployed,
> the live URL will return **403** on `/api/*`.

## 🔌 API Endpoints

| Method | Endpoint                  | Auth | Description                              |
|--------|---------------------------|------|------------------------------------------|
| POST   | `/api/auth`               | —    | Verify owner password → returns token    |
| GET    | `/api/orders`             | ✅   | List all orders (newest first)           |
| POST   | `/api/orders`             | —    | Create an order (public checkout)        |
| PATCH  | `/api/orders/:id`         | ✅   | Update order status (pending/paid/cancelled) |
| POST   | `/api/contact`            | —    | Save a contact message                   |
| GET    | `/api/config`             | —    | Public bank-transfer payment details     |
| GET    | `/api/health`             | —    | Health check                             |

## 🔐 Orders Portal

- URL: `/orders.html`
- Password: set via `ORDERS_PASSWORD` in `backend/.env` (defaults to `Karachi2103`)
- Login issues a signed token stored in the browser; sessions expire after 7 days.
- Orders can be marked `pending`, `paid`, or `cancelled`.

## 🛠️ Configuration (`backend/.env`)

| Variable           | Purpose                                        |
|--------------------|------------------------------------------------|
| `PORT`             | Server port (default `3000`)                   |
| `BANK_NAME`        | Bank name shown on checkout                    |
| `BANK_TITLE`       | Account holder name                            |
| `BANK_ACCOUNT`     | Account number                                 |
| `BANK_IBAN`        | IBAN                                           |
| `BANK_INSTRUCTIONS`| Payment instructions                           |
| `ORDERS_PASSWORD`  | Owner portal password                          |
| `AUTH_SECRET`      | Optional — signs owner session tokens          |

## 🛒 How an Order Works

1. Browse products and add to cart (stored in `localStorage`).
2. Go to **Place Your Order** and fill in personal details.
3. Press **Copy Order Details** — the order is saved to the backend and the
   formatted order (items, totals, bank payment info) is copied to the clipboard.
4. Paste and send the details to the store on WhatsApp/email to complete payment.
5. The owner reviews the order in the **Orders Portal**.

---
© Fabiha Organic. Crafted with care in Pakistan. 🌱