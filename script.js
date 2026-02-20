// Simple AI content simulation
document.getElementById('generateBtn').addEventListener('click', () => {
  const input = document.getElementById('contentInput').value;
  if (!input) return alert('Enter a prompt!');
  document.getElementById('output').innerText = `Generated content for: "${input}"\n\nYour AI-generated content goes here...`;
});

// PayPal Button integration
paypal.Buttons({
  style: {
    shape: 'rect',
    color: 'blue',
    layout: 'vertical',
    label: 'pay'
  },
  createOrder: function(data, actions) {
    return actions.order.create({
      purchase_units: [{
        amount: { value: '10.00' } // set your price here
      }]
    });
  },
  onApprove: function(data, actions) {
    return actions.order.capture().then(function(details) {
      alert('Transaction completed by ' + details.payer.name.given_name + '!');
    });
  }
}).render('#paypal-button-container');
