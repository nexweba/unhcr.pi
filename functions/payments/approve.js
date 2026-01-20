export async function onRequestPost(context) {
  const body = await context.request.json();

  console.log("APPROVE RECEIVED:", body);

  return new Response(
    JSON.stringify({ status: "approved" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" }
    }
  );
}
