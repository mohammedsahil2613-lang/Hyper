// --- script.js ---
const topicInput = document.getElementById('topicInput');
const generateBtn = document.getElementById('generateBtn');
const demoBtn = document.getElementById('demoBtn');
const output = document.getElementById('output');
const copyBtn = document.getElementById('copyBtn');
const freeCode = document.getElementById('freeCode');
const paypalBtn = document.getElementById('paypalBtn');

let freeAccess = false;

// Admin free code
freeCode.addEventListener('click', () => {
  const code = prompt("Enter admin code:");
  if(code === 'sahil599') {
    freeAccess = true;
    alert('Admin code accepted! Free access unlocked.');
  } else {
    alert('Wrong code');
  }
});

// Generate content
generateBtn.addEventListener('click', async () => {
  if(!topicInput.value) { alert('Enter topic'); return; }

  if(!freeAccess) {
    alert('Please pay $1 to generate content');
    return;
  }

  output.textContent = 'Generating...';
  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: topicInput.value })
    });
    const data = await res.json();
    output.textContent = data.content || 'No content returned';
  } catch(err) {
    output.textContent = 'Error generating content';
    console.error(err);
  }
});

// Demo content
demoBtn.addEventListener('click', () => {
  output.textContent = 'This is a demo futuristic content for clients.';
});

// Copy content
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(output.textContent);
  alert('Copied!');
});

// PayPal payment for clients
paypalBtn.addEventListener('click', async () => {
  try {
    const res = await fetch('/api/create-order', { method: 'POST' });
    const data = await res.json();
    if(data.id) {
      // Redirect client to PayPal checkout page
      window.location.href = `https://www.sandbox.paypal.com/checkoutnow?token=${data.id}`;
    } else {
      alert('Failed to create PayPal order');
    }
  } catch(err) {
    console.error(err);
    alert('Error processing payment');
  }
});
