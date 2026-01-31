// ===== BACKGROUND =====
const dayBg =
  "https://raw.githubusercontent.com/rosaroli558-crypto/bg-pikachu/main/bg-firefox-day.jpg";
const nightBg =
  "https://raw.githubusercontent.com/rosaroli558-crypto/bg-pikachu/main/bg-firefox-night.jpg";

function updateBackground() {
  const hour = new Date().getHours();
  document.body.style.backgroundImage =
    hour >= 6 && hour < 18 ? `url(${dayBg})` : `url(${nightBg})`;
}

// ===== CLOCK =====
function updateClock() {
  const clock = document.getElementById("clock");
  if (!clock) return;
  clock.textContent = new Date().toLocaleTimeString();
}

// ===== GREETING =====
function updateGreeting() {
  const greeting = document.getElementById("greeting");
  if (!greeting) return;

  const hour = new Date().getHours();
  let text = "Saatnya Kita Kerja...";

  if (hour < 12) text = "Belum Tidur?";
  else if (hour < 18) text = "Udah Bangun Nih";

  greeting.textContent = text;
}

// ===== SHORTCUTS =====
const defaultShortcuts = {
  g: "https://www.google.com",
  y: "https://www.youtube.com",
  q: "https://web.whatsapp.com",
  c: "https://chat.openai.com",
};

// load shortcuts
function loadShortcuts() {
  const saved = localStorage.getItem("shortcuts");
  return saved ? JSON.parse(saved) : defaultShortcuts;
}

let shortcuts = loadShortcuts();
localStorage.setItem("shortcuts", JSON.stringify(shortcuts));

// ===== SHORTCUT TOGGLE =====
let shortcutEnabled = localStorage.getItem("shortcutEnabled");
shortcutEnabled = shortcutEnabled !== "false"; // default ON

const toggleIcon = document.getElementById("shortcutToggle");
const shortcutBox = document.querySelector(".shortcuts");

function updateToggleIcon() {
  if (!toggleIcon) return;
  toggleIcon.textContent = shortcutEnabled ? "🟢" : "🔴";
}

function toggleShortcut() {
  shortcutEnabled = !shortcutEnabled;
  localStorage.setItem("shortcutEnabled", shortcutEnabled);
  updateToggleIcon();
}

// click toggle icon
if (toggleIcon) {
  toggleIcon.addEventListener("click", toggleShortcut);
}

// ===== KEYBOARD HANDLER =====
document.addEventListener("keydown", (e) => {
  // TOGGLE ON / OFF → Ctrl + Shift + X
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "x") {
    e.preventDefault();
    toggleShortcut();
    return;
  }

  // kalau shortcut OFF, STOP
  if (!shortcutEnabled) return;

  // buka shortcut → Ctrl + key
  const key = e.key.toLowerCase();
  if (e.ctrlKey && shortcuts[key]) {
    e.preventDefault();
    window.open(shortcuts[key], "_blank");
  }

  // tampilkan daftar shortcut
  if (e.key === "Alt" && shortcutBox) {
    shortcutBox.style.opacity = "1";
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Alt" && shortcutBox) {
    shortcutBox.style.opacity = "0";
  }
});

// ===== INIT =====
updateBackground();
updateGreeting();
updateClock();
updateToggleIcon();

setInterval(updateClock, 1000);
setInterval(updateGreeting, 60000);
setInterval(updateBackground, 60000);
