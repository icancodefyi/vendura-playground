import { createWebhookHandler } from "@vendura/next";
import { handleRazorpayWebhook } from "@vendura/webhooks";
import { venduraConfig } from "@/vendura.config";


export const POST = createWebhookHandler(async ({ body, headers }) => {
  try {
    const signature = headers.get("x-razorpay-signature");
    if (!signature) {
      return new Response(
        JSON.stringify({ error: "NO_SIGNATURE" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    // Use venduraConfig.security.webhookSecret if needed in handleRazorpayWebhook
    await handleRazorpayWebhook(body, signature /*, venduraConfig.security.webhookSecret */);
    return new Response(JSON.stringify({ success: true }), {
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
