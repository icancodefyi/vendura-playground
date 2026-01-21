import { getClient } from "@vendura/mongodb";
import { venduraConfig } from "@/vendura.config";

export async function GET() {
  try {
    // Optionally use venduraConfig.db.mongoUrl for custom client logic
    const client = await getClient();
    await client.db().command({ ping: 1 });
    return new Response(JSON.stringify({ status: "mongo ok" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
