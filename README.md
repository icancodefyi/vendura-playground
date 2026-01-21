# Vendura Playground

This app is built using Vendura.

It demonstrates:
- Cart creation
- Checkout
- Razorpay payments

## How to run locally

1. Clone this repo and install dependencies:
   ```sh
   pnpm install
   ```
2. Set up your `.env.local` with:
   ```env
   MONGO_URL=your-mongodb-uri
   RAZORPAY_KEY_ID=your-razorpay-key-id
   RAZORPAY_KEY_SECRET=your-razorpay-key-secret
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key-id
   ```
3. Build and start the app:
   ```sh
   pnpm dev
   ```

## What does Vendura handle for you?
- All backend logic for cart, order, and payment flows
- Database and payment integration via config
- API routes for cart, add item, checkout, and webhooks

## Flows implemented
- Create cart
- Add item to cart
- Checkout (creates order and Razorpay order)
- Pay with Razorpay (test mode)

## How to test Razorpay payments
- Use the test keys in your `.env.local`
- Add items and checkout, then pay with Razorpay’s test UI

---

For framework internals, see:
→ https://github.com/icancodefyi/vendura
