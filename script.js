const FREE_USER_KEY = "mohammedsahil2026";

document.getElementById("generate").addEventListener("click", async () => {
  const prompt = document.getElementById("prompt").value;
  const userKey = document.getElementById("userKey").value.trim();
  const output = document.getElementById("output");

  if(!prompt) {
    alert("Please enter a niche or topic!");
    return;
  }

  // Free user override
  if(userKey === FREE_USER_KEY) {
    output.innerHTML = `<p>🔥 Free content for testing: "${prompt}"</p>`;
    return;
  }

  // Otherwise, verify payment
  output.innerHTML = "<p>Checking payment...</p>";

  try {
    const response = await fetch("/.netlify/functions/verifyPayment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();

    if(data.status === "paid") {
      output.innerHTML = `<p>${data.result}</p>`;
    } else {
      output.innerHTML = "<p>💰 Please pay first to generate content.</p>";
    }
  } catch(err) {
    output.innerHTML = "<p>⚠ Something went wrong. Try again.</p>";
    console.error(err);
  }
});

// PayPal button
paypal.Buttons({
  createOrder: function(data, actions) {
    return actions.order.create({
      purchase_units: [{ amount: { value: '5.00' } }]
    });
  },
  onApprove: function(data, actions) {
    return actions.order.capture().then(function(details) {
      alert('Payment completed by ' + details.payer.name.given_name + " 🎉");
    });
  }
}).render('#paypal-button-container');
