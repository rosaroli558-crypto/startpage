document.addEventListener("DOMContentLoaded", () => {

  // ================= BACKGROUND =================
  const dayBg =
    "https://raw.githubusercontent.com/rosaroli558-crypto/bg-pikachu/main/bg-firefox-day.jpg";
  const nightBg =
    "https://raw.githubusercontent.com/rosaroli558-crypto/bg-pikachu/main/bg-firefox-night.jpg";

  function updateBackground() {
    const hour = new Date().getHours();
    document.body.style.backgroundImage =
      hour >= 6 && hour < 18 ? `url(${dayBg})` : `url(${nightBg})`;
  }

  // ================= CLOCK =================
  const clockEl = document.getElementById("clock");
  function updateClock() {
    if (clockEl) {
      clockEl.textContent = new Date().toLocaleTimeString();
    }
  }

  // ================= GREETING =================
  const greetingEl = document.getElementById("greeting");
  function updateGreeting() {
    if (!greetingEl) return;

    const hour = new Date().getHours();
    let text = "Saatnya Kita Kerja...";

    if (hour < 12) text = "Belum Tidur?";
    else if (hour < 18) text = "Udah Bangun Nih";

    greetingEl.textContent = text;
  }

  // ================= SHORTCUT DATA =================
  const defaultShortcuts = {
    g: "https://www.google.com",
    y: "https://www.youtube.com",
    q: "https://web.whatsapp.com",
    c: "https://chat.openai.com",
  };

  function loadShortcuts() {
    try {
      const data = JSON.parse(localStorage.getItem("shortcuts"));
      return data || defaultShortcuts;
    } catch {
      return defaultShortcuts;
    }
  }

  let shortcuts = loadShortcuts();
  localStorage.setItem("shortcuts", JSON.stringify(shortcuts));

  // ================= SHORTCUT TOGGLE =================
  const toggleIcon = document.getElementById("shortcutToggle");
  const shortcutBox = document.querySelector(".shortcuts");

  let shortcutEnabled =
    localStorage.getItem("shortcutEnabled") !== "false";

  function renderToggle() {
    if (toggleIcon) {
      toggleIcon.textContent = shortcutEnabled ? "🟢" : "🔴";
    }
  }

  function toggleShortcut() {
    shortcutEnabled = !shortcutEnabled;
    localStorage.setItem("shortcutEnabled", shortcutEnabled);
    renderToggle();
  }

  if (toggleIcon) {
    toggleIcon.addEventListener("click", toggleShortcut);
  }

  // ================= KEYBOARD HANDLER =================
  document.addEventListener("keydown", (e) => {

    // 🔥 CTRL + SHIFT + X (TOGGLE)
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "x") {
      e.preventDefault();
      toggleShortcut();
      return;
    }

    // 🔥 CTRL + KEY SHORTCUT
    if (shortcutEnabled && e.ctrlKey) {
      const key = e.key.toLowerCase();
      if (shortcuts[key]) {
        e.preventDefault();
        window.open(shortcuts[key], "_blank");
      }
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

  // ================= INIT =================
  renderToggle();
  updateBackground();
  updateGreeting();
  updateClock();

  setInterval(updateClock, 1000);
  setInterval(updateGreeting, 60000);
  setInterval(updateBackground, 60000);
});
