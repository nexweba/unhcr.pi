export async function onRequestPost(context) {
  const { paymentId } = await context.request.json();

  return new Response(
    JSON.stringify({
      status: "approved",
      paymentId: paymentId
    }),
    {
      headers: { "Content-Type": "application/json" },
      status: 200
    }
  );
}
