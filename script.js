const FREE_USER_KEY = "mohammedsahil2026";

const keyInput = document.getElementById("keyInput");
const promptInput = document.getElementById("promptInput");
const generateBtn = document.getElementById("generateBtn");
const output = document.getElementById("output");
const paypalBtn = document.getElementById("paypalBtn");

generateBtn.addEventListener("click", async () => {
  const userKey = keyInput.value.trim();
  const prompt = promptInput.value.trim();

  if (!prompt) {
    output.innerHTML = "<p>⚠ Please enter a topic!</p>";
    return;
  }

  output.innerHTML = "<p>Generating futuristic content...</p>";

  try {
    let response;
    
    // Free key uses OpenAI API too, but you can limit usage
    if (userKey === FREE_USER_KEY) {
      response = await fetch("/.netlify/functions/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
    } else {
      // Paid key flow
      response = await fetch("/.netlify/functions/verifyPayment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
    }

    const data = await response.json();
    output.innerHTML = `<div class="output-card">✨ ${data.result}</div>`;
  } catch(err) {
    console.error(err);
    output.innerHTML = "<p>⚠ Something went wrong.</p>";
  }
});

// PayPal demo button (replace with your real integration)
paypalBtn.addEventListener("click", () => {
  alert("Redirect to PayPal flow (demo)!");
});
