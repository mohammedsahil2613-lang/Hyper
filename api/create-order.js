export default async function handler(req, res) {
  // This creates a PayPal order (sandbox example)
  res.status(200).json({ orderID: 'SAMPLE_ORDER_ID' });
}
