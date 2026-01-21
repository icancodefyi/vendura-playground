import { createApiHandler } from "@vendura/next";
import { createOrder } from "vendura-core";
import { getCart, saveOrder } from "@vendura/mongodb";
import { createRazorpayOrder } from "@vendura/razorpay";
import { venduraConfig } from "@/vendura.config";

export const POST = createApiHandler(async (req) => {
  try {
    const { cartId } = await req.json();
    if (!cartId) {
      return new Response(
        JSON.stringify({ error: "cartId is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const cart = await getCart(cartId);
    if (!cart) {
      return new Response(
        JSON.stringify({ error: "Cart not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    // Always recalculate total from items
    const totalAmount = cart.items.reduce((sum, item) => {
      const price = typeof item.price === "number" ? item.price : 0;
      const quantity = typeof item.quantity === "number" ? item.quantity : 0;
      return sum + price * quantity;
    }, 0);
    const total = {
      amount: totalAmount,
      currency: venduraConfig.payment.currency,
    };
    const order = createOrder({ ...cart, total });
    await saveOrder(order);
    try {
      const razorpay = await createRazorpayOrder(order);
      return new Response(JSON.stringify({ order, razorpay }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } catch (error: any) {
      return new Response(
        JSON.stringify({ order, razorpayError: error?.message || error }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
