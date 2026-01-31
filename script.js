document.addEventListener("DOMContentLoaded", () => {

  /* ================= BACKGROUND ================= */
  const dayBg =
    "https://raw.githubusercontent.com/rosaroli558-crypto/bg-pikachu/main/bg-firefox-day.jpg";
  const nightBg =
    "https://raw.githubusercontent.com/rosaroli558-crypto/bg-pikachu/main/bg-firefox-night.jpg";

  function updateBackground() {
    const hour = new Date().getHours();
    document.body.style.backgroundImage =
      hour >= 6 && hour < 18 ? `url(${dayBg})` : `url(${nightBg})`;
  }

  /* ================= CLOCK ================= */
  const clockEl = document.getElementById("clock");
  function updateClock() {
    if (clockEl) {
      clockEl.textContent = new Date().toLocaleTimeString();
    }
  }

  /* ================= GREETING ================= */
  const greetingEl = document.getElementById("greeting");
  function updateGreeting() {
    if (!greetingEl) return;

    const hour = new Date().getHours();
    let text = "Saatnya Kita Kerja...";

    if (hour < 12) text = "Belum Tidur?";
    else if (hour < 18) text = "Udah Bangun Nih";

    greetingEl.textContent = text;
  }

  /* ================= SHORTCUT DATA ================= */
  const defaultShortcuts = {
    g: "https://www.google.com",
    y: "https://www.youtube.com",
    q: "https://web.whatsapp.com",
    c: "https://chat.openai.com",
  };

  function loadShortcuts() {
    try {
      const saved = JSON.parse(localStorage.getItem("shortcuts"));
      return saved || defaultShortcuts;
    } catch {
      return defaultShortcuts;
    }
  }

  let shortcuts = loadShortcuts();
  localStorage.setItem("shortcuts", JSON.stringify(shortcuts));

  /* ================= SHORTCUT TOGGLE ================= */
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

  /* ================= KEYBOARD HANDLER ================= */
  document.addEventListener("keydown", (e) => {

    // CTRL + SHIFT + X → ON/OFF shortcut
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "x") {
      e.preventDefault();
      toggleShortcut();
      return;
    }

    // CTRL + key → buka shortcut
    if (shortcutEnabled && e.ctrlKey) {
      const key = e.key.toLowerCase();
      if (shortcuts[key]) {
        e.preventDefault();
        window.open(shortcuts[key], "_blank");
      }
    }

    // ALT → tampilkan daftar shortcut
    if (e.key === "Alt" && shortcutBox) {
      shortcutBox.style.opacity = "1";
    }
  });

  document.addEventListener("keyup", (e) => {
    if (e.key === "Alt" && shortcutBox) {
      shortcutBox.style.opacity = "0";
    }
  });

  /* ================= EDIT SHORTCUT ================= */
  const editBtn = document.getElementById("editShortcutBtn");
  const editModal = document.getElementById("editModal");
  const form = document.getElementById("shortcutForm");

  if (editBtn && editModal) {
    editBtn.addEventListener("click", () => {
      editModal.style.display = "block";
      renderForm();
    });
  }

  function renderForm() {
    if (!form) return;
    form.innerHTML = "";

    Object.entries(shortcuts).forEach(([key, url]) => {
      const row = document.createElement("div");
      row.className = "shortcut-row";

      row.innerHTML = `
        <input type="text" value="${key}" disabled>
        <input type="url" value="${url}" data-key="${key}">
        <button type="button" data-del="${key}">🗑</button>
      `;

      form.appendChild(row);
    });

    // tombol tambah
    const addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.textContent = "+ Tambah";
    addBtn.onclick = addShortcut;
    form.appendChild(addBtn);
  }

  function addShortcut() {
    const key = prompt("Key shortcut (1 huruf):");
    const url = prompt("URL:");

    if (!key || !url) return;

    shortcuts[key.toLowerCase()] = url;
    saveShortcuts();
    renderForm();
  }

  form?.addEventListener("input", (e) => {
    if (e.target.dataset.key) {
      shortcuts[e.target.dataset.key] = e.target.value;
      saveShortcuts();
    }
  });

  form?.addEventListener("click", (e) => {
    if (e.target.dataset.del) {
      delete shortcuts[e.target.dataset.del];
      saveShortcuts();
      renderForm();
    }
  });

  function saveShortcuts() {
    localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
  }

  /* ================= INIT ================= */
  renderToggle();
  updateBackground();
  updateGreeting();
  updateClock();

  setInterval(updateClock, 1000);
  setInterval(updateGreeting, 60000);
  setInterval(updateBackground, 60000);
});
