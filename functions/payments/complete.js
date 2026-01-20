export async function onRequestPost(context) {
  const body = await context.request.json();

  console.log("COMPLETE RECEIVED:", body);

  return new Response(
    JSON.stringify({ status: "completed" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" }
    }
  );
}
