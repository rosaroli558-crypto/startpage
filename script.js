// ================== BACKGROUND ==================
const dayBg =
  "https://raw.githubusercontent.com/rosaroli558-crypto/bg-pikachu/main/bg-firefox-day.jpg";
const nightBg =
  "https://raw.githubusercontent.com/rosaroli558-crypto/bg-pikachu/main/bg-firefox-night.jpg";

function updateBackground() {
  const hour = new Date().getHours();
  document.body.style.backgroundImage =
    hour >= 6 && hour < 18 ? `url(${dayBg})` : `url(${nightBg})`;
}

// ================== CLOCK ==================
function updateClock() {
  const clock = document.getElementById("clock");
  if (clock) {
    clock.textContent = new Date().toLocaleTimeString();
  }
}

// ================== GREETING ==================
function updateGreeting() {
  const greeting = document.getElementById("greeting");
  if (!greeting) return;

  const hour = new Date().getHours();
  let text = "Saatnya Kita Kerja...";

  if (hour < 12) text = "Belum Tidur?";
  else if (hour < 18) text = "Udah Bangun Nih";

  greeting.textContent = text;
}

// ================== SHORTCUT DATA ==================
const defaultShortcuts = {
  g: "https://www.google.com",
  y: "https://www.youtube.com",
  q: "https://web.whatsapp.com",
  c: "https://chat.openai.com",
};

function loadShortcuts() {
  const saved = localStorage.getItem("shortcuts");
  return saved ? JSON.parse(saved) : defaultShortcuts;
}

function saveShortcuts(data) {
  localStorage.setItem("shortcuts", JSON.stringify(data));
}

let shortcuts = loadShortcuts();
saveShortcuts(shortcuts);

// ================== SHORTCUT TOGGLE ==================
const toggleIcon = document
