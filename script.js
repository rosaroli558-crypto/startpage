/* ===== DATA ===== */
const dayBg   = "https://raw.githubusercontent.com/rosaroli558-crypto/bg-pikachu/main/bg-firefox-day.jpg";
const nightBg = "https://raw.githubusercontent.com/rosaroli558-crypto/bg-pikachu/main/bg-firefox-night.jpg";

const shortcuts = {
  g: "https://www.google.com",
  y: "https://www.youtube.com",
  q: "https://web.whatsapp.com",
  c: "https://chat.openai.com"
};

let shortcutEnabled = true;
const toggleIcon = document.getElementById("shortcutToggle");
const shortcutBox = document.querySelector(".shortcuts");

/* ===== FUNGSI ===== */
function toggleShortcut() {
  shortcutEnabled = !shortcutEnabled;
  toggleIcon.textContent = shortcutEnabled ? "🟢" : "🔴";
}

function updateGreetingAndBg() {
  const hour = new Date().getHours();
  let greeting = "";
  let bg = "";

  if (hour < 12) {
    greeting = "Belum Tidur?";
    bg = nightBg;
  } else if (hour < 18) {
    greeting = "Udah Bangun Nih";
    bg = dayBg;
  } else {
    greeting = "Saatnya Kita Kerja...";
    bg = nightBg;
  }

  document.getElementById("greeting").textContent = greeting;
  document.body.style.backgroundImage = `url(${bg})`;
}

function updateClock() {
  document.getElementById("clock").textContent =
    new Date().toLocaleTimeString();
}

/* ===== EVENT ===== */
// klik ikon
toggleIcon.addEventListener("click", toggleShortcut);

// shortcut web
document.addEventListener("keydown", (e) => {
  if (!shortcutEnabled) return;
  if (e.ctrlKey && shortcuts[e.key]) {
    window.open(shortcuts[e.key], "_blank");
  }
});

// toggle keyboard
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "x") {
    e.preventDefault();
    toggleShortcut();
  }
});

// tooltip Alt
document.addEventListener("keydown", (e) => {
  if (e.key === "Shift") shortcutBox.style.opacity = "1";
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Shift") shortcutBox.style.opacity = "0";
});

/* ===== INIT ===== */
updateGreetingAndBg();
updateClock();
setInterval(updateClock, 1000);
setInterval(updateGreetingAndBg, 60000);
