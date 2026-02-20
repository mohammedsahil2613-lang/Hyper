const FREE_USER_KEY = "mohammedsahil2026";

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

    // ---- FREE KEY LOGIC ----
    if(userKey === FREE_USER_KEY) {
      // Call your existing serverless function (generate.js)
      response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
    } else {
      // ---- PAID FLOW (no changes) ----
      response = await fetch("/api/verifyPayment", {
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
const generateBtn = document.getElementById('generateBtn');
const topicInput = document.getElementById('topicInput');
const output = document.getElementById('output');

generateBtn.addEventListener('click', async () => {
  const topic = topicInput.value;
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic })
  });
  const data = await response.json();
  output.innerText = data.content; // <- shows the AI text
});
