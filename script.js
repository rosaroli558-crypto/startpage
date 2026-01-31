// ===== SHORTCUTS =====
const defaultShortcuts = {
  g: "https://www.google.com",
  y: "https://www.youtube.com",
  q: "https://web.whatsapp.com",
  c: "https://chat.openai.com"
};

function loadShortcuts() {
  const saved = localStorage.getItem("shortcuts");
  return saved ? JSON.parse(saved) : defaultShortcuts;
}

let shortcuts = loadShortcuts();
localStorage.setItem("shortcuts", JSON.stringify(shortcuts));

// ambil status toggle dari localStorage
let shortcutEnabled = localStorage.getItem("shortcutEnabled") !== "false";

const toggleIcon = document.getElementById("shortcutToggle");
const shortcutBox = document.querySelector(".shortcuts");

function toggleShortcut() {
  shortcutEnabled = !shortcutEnabled;
  toggleIcon.textContent = shortcutEnabled ? "🟢" : "🔴";
  localStorage.setItem("shortcutEnabled", shortcutEnabled);
}

// set icon awal sesuai status
toggleIcon.textContent = shortcutEnabled ? "🟢" : "🔴";

// klik icon
toggleIcon.addEventListener("click", toggleShortcut);

// keyboard handler (SATU SAJA)
document.addEventListener("keydown", (e) => {
  // toggle shortcut
  if (e.ctrlKey && e.shiftKey && e.key === "x") {
    toggleShortcut();
    return;
  }

  // buka shortcut
  if (shortcutEnabled && e.ctrlKey && shortcuts[e.key]) {
    window.open(shortcuts[e.key], "_blank");
  }

  // tampilkan info shortcut
  if (e.key === "Alt") {
    shortcutBox.style.opacity = "1";
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Alt") {
    shortcutBox.style.opacity = "0";
  }
});
