export default async function handler(req, res) {
  res.status(200).json({ status: 'Payment verified (sandbox)' });
}
export default async function handler(req, res) {
  res.status(200).json({ content: 'AI content generated successfully!' });
}
export default async function handler(req, res) {
  // This creates a PayPal order (sandbox example)
  res.status(200).json({ orderID: 'SAMPLE_ORDER_ID' });
}
export default async function handler(req, res) {
  // This captures a PayPal order (sandbox example)
  res.status(200).json({ status: 'Order captured successfully!' });
}
