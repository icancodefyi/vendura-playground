import { createApiHandler } from "@vendura/next";
import { addItem } from "vendura-core";
import { getCart, saveCart } from "@vendura/mongodb";
import { venduraConfig } from "@/vendura.config";

export const POST = createApiHandler(async (req) => {
  try {
    const { cartId, item } = await req.json();
    if (!cartId || !item) {
      return new Response(
        JSON.stringify({ error: "cartId and item are required" }),
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
    addItem(cart, item);
    (cart.total as any).currency = venduraConfig.payment.currency;
    await saveCart(cart);
    return new Response(JSON.stringify(cart), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
