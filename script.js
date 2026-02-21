const topicInput = document.getElementById('topic');
const generateBtn = document.getElementById('generateBtn');
const demoBtn = document.getElementById('demoBtn');
const output = document.getElementById('output');
const copyBtn = document.getElementById('copyBtn');
const freeCode = document.getElementById('freeCode');

let freeAccess = false;

// hidden admin code
freeCode.addEventListener('click', () => {
  const code = prompt("Enter admin code:");
  if(code === 'sahil599') freeAccess = true;
});

// Generate content
generateBtn.addEventListener('click', async () => {
  if(!topicInput.value) { alert('Enter topic'); return; }

  if(!freeAccess) {
    alert('Please pay $1 to generate content');
    return;
  }

  output.textContent = 'Generating...';
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic: topicInput.value })
  });
  const data = await res.json();
  output.textContent = data.content;
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
