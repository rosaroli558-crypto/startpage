// ===== BACKGROUND =====
const dayBg = "https://raw.githubusercontent.com/rosaroli558-crypto/bg-pikachu/main/bg-firefox-day.jpg";
const nightBg = "https://raw.githubusercontent.com/rosaroli558-crypto/bg-pikachu/main/bg-firefox-night.jpg";

function updateBackground() {
  const hour = new Date().getHours();
  document.body.style.backgroundImage =
    hour >= 6 && hour < 18 ? `url(${dayBg})` : `url(${nightBg})`;
}

// ===== CLOCK =====
function updateClock() {
  document.getElementById("clock").textContent =
    new Date().toLocaleTimeString();
}

// ===== GREETING =====
function updateGreeting() {
  const hour = new Date().getHours();
  let text = "Saatnya Kita Kerja...";

  if (hour < 12) text = "Belum Tidur?";
  else if (hour < 18) text = "Udah Bangun Nih";

  document.getElementById("greeting").textContent = text;
}

// ===== SHORTCUTS =====
const shortcuts = {
  g: "https://www.google.com",
  y: "https://www.youtube.com",
  q: "https://web.whatsapp.com",
  c: "https://chat.openai.com"
};

let shortcutEnabled = true;
const toggleIcon = document.getElementById("shortcutToggle");
const shortcutBox = document.querySelector(".shortcuts");

function toggleShortcut() {
  shortcutEnabled = !shortcutEnabled;
  toggleIcon.textContent = shortcutEnabled ? "🟢" : "🔴";
}

toggleIcon.addEventListener("click", toggleShortcut);

document.addEventListener("keydown", (e) => {
  if (!shortcutEnabled) return;

  if (e.ctrlKey && shortcuts[e.key]) {
    window.open(shortcuts[e.key], "_blank");
  }

  if (e.ctrlKey && e.shiftKey && e.key === "x") {
    toggleShortcut();
  }

  if (e.key === "Shift") {
    shortcutBox.style.opacity = "1";
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Alt") shortcutBox.style.opacity = "0";
});

// ===== INIT =====
updateBackground();
updateGreeting();
updateClock();

setInterval(updateClock, 1000);
setInterval(updateGreeting, 60000);
setInterval(updateBackground, 60000);
