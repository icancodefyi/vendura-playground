import { createApiHandler } from "@vendura/next";
import { createCart } from "vendura-core";
import { saveCart } from "@vendura/mongodb";
import { venduraConfig } from "@/vendura.config";

export const POST = createApiHandler(async () => {
  try {
    const cart = createCart();
    (cart.total as any).currency = venduraConfig.payment.currency;
    await saveCart(cart);
    return new Response(JSON.stringify(cart), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
