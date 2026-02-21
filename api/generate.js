export default async function handler(req, res) {
  try {
    // Simulate PayPal order creation
    // In real implementation, integrate PayPal API here
    const orderID = "ORDER-" + Math.random().toString(36).substring(2, 12);
    res.status(200).json({ orderID });
  } catch (err) {
    console.error(err);
    res.status(500).json({ orderID: null });
  }
}
