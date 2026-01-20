export async function onRequestPost(context) {
  const { paymentId, txid } = await context.request.json();

  return new Response(
    JSON.stringify({
      status: "completed",
      paymentId: paymentId,
      txid: txid
    }),
    {
      headers: { "Content-Type": "application/json" },
      status: 200
    }
  );
}
