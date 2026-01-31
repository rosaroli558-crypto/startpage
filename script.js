document.addEventListener("DOMContentLoaded", () => {

  /* ================= SHORTCUT DATA ================= */
  const defaultShortcuts = {
    g: "https://www.google.com",
    y: "https://www.youtube.com",
    q: "https://web.whatsapp.com",
    c: "https://chat.openai.com"
  };

  let shortcuts = JSON.parse(localStorage.getItem("shortcuts")) || defaultShortcuts;
  localStorage.setItem("shortcuts", JSON.stringify(shortcuts));

  /* ================= TOGGLE ================= */
  let shortcutEnabled = localStorage.getItem("shortcutEnabled") !== "false";
  const toggleIcon = document.getElementById("shortcutToggle");

  function renderToggle() {
    toggleIcon.textContent = shortcutEnabled ? "🟢" : "🔴";
  }

  function toggleShortcut() {
    shortcutEnabled = !shortcutEnabled;
    localStorage.setItem("shortcutEnabled", shortcutEnabled);
    renderToggle();
  }

  toggleIcon.addEventListener("click", toggleShortcut);

  /* ================= KEYBOARD ================= */
  document.addEventListener("keydown", (e) => {

    // CTRL + SHIFT + X
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "x") {
      e.preventDefault();
      toggleShortcut();
      return;
    }

    if (shortcutEnabled && e.ctrlKey) {
      const key = e.key.toLowerCase();
      if (shortcuts[key]) {
        e.preventDefault();
        window.open(shortcuts[key], "_blank");
      }
    }
  });

  /* ================= EDIT MODAL ================= */
  const editBtn = document.getElementById("editShortcutBtn");
  const modal = document.getElementById("editModal");
  const form = document.getElementById("shortcutForm");

  editBtn.addEventListener("click", () => {
    modal.style.display = "block";
    renderForm();
  });

  function renderForm() {
    form.innerHTML = "";

    Object.entries(shortcuts).forEach(([key, url]) => {
      form.insertAdjacentHTML("beforeend", `
        <div class="shortcut-row">
          <input class="key" value="${key}" disabled>
          <input class="url" data-key="${key}" value="${url}">
          <button data-del="${key}">🗑</button>
        </div>
      `);
    });

    form.insertAdjacentHTML("beforeend", `
      <button id="addShortcut" type="button">+ Tambah</button>
    `);
  }

  /* ================= EVENT DELEGATION (INI KUNCINYA) ================= */
  document.addEventListener("input", (e) => {
    if (e.target.classList.contains("url")) {
      const key = e.target.dataset.key;
      shortcuts[key] = e.target.value;
      localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
    }
  });

  document.addEventListener("click", (e) => {

    // hapus
    if (e.target.dataset.del) {
      delete shortcuts[e.target.dataset.del];
      localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
      renderForm();
    }

    // tambah
    if (e.target.id === "addShortcut") {
      const key = prompt("Key (1 huruf):");
      const url = prompt("URL:");

      if (!key || !url) return;

      shortcuts[key.toLowerCase()] = url;
      localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
      renderForm();
    }
  });

  renderToggle();
});
