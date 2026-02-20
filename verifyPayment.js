const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  const { orderID, prompt } = JSON.parse(event.body);

  const PAYPAL_ACCESS_TOKEN = process.env.PAYPAL_ACCESS_TOKEN;

  if(!orderID) return { statusCode: 400, body: JSON.stringify({ status: "unpaid" }) };

  try {
    const response = await fetch(`https://api-m.paypal.com/v2/checkout/orders/${orderID}`, {
      headers: {
        "Authorization": `Bearer ${PAYPAL_ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    if(data.status === "COMPLETED") {
      return { statusCode: 200, body: JSON.stringify({ status: "paid", result: `🔥 Paid content for: "${prompt}"` }) };
    } else {
      return { statusCode: 400, body: JSON.stringify({ status: "unpaid" }) };
    }
  } catch(err) {
    return { statusCode: 500, body: JSON.stringify({ status: "error" }) };
  }
};
