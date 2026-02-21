export default async function handler(req, res) {
  try {
    // Generate a fake order ID for payment
    const orderID = "ORDER-" + Math.random().toString(36).substring(2, 12);
    res.status(200).json({ orderID });
  } catch (err) {
    console.error(err);
    res.status(500).json({ orderID: null });
  }
}
