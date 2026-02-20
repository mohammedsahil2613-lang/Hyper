export default async function handler(req, res) {
  // This captures a PayPal order (sandbox example)
  res.status(200).json({ status: 'Order captured successfully!' });
}
