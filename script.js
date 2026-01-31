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

// ===== SHORTCUT DATA =====
const defaultShortcuts = {
  g: "https://www.google.com",
  y: "https://www.youtube.com",
  q: "https://web.whatsapp.com",
  c: "https://chat.openai.com"
};

let shortcuts =
  JSON.parse(localStorage.getItem("shortcuts")) || defaultShortcuts;

let shortcutEnabled =
  localStorage.getItem("shortcutEnabled") !== "false";

// ===== ELEMENT =====
const toggleIcon = document.getElementById("shortcutToggle");
const shortcutBox = document.querySelector(".shortcuts");
const editBtn = document.getElementById("editShortcut");

// ===== TOGGLE =====
function toggleShortcut() {
  shortcutEnabled = !shortcutEnabled;
  toggleIcon.textContent = shortcutEnabled ? "🟢" : "🔴";
  localStorage.setItem("shortcutEnabled", shortcutEnabled);
}

toggleIcon.addEventListener("click", toggleShortcut);

// ===== KEYBOARD =====
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.shiftKey && e.key === "x") {
    toggleShortcut();
    return;
  }

  if (shortcutEnabled && e.ctrlKey && shortcuts[e.key]) {
    window.open(shortcuts[e.key], "_blank");
  }

  if (e.key === "Alt") shortcutBox.style.opacity = "1";
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Alt") shortcutBox.style.opacity = "0";
});

// ===== EDIT SHORTCUT =====
const editor = document.getElementById("shortcutEditor");
const shortcutList = document.getElementById("shortcutList");
const closeEditor = document.getElementById("closeEditor");
const addBtn = document.getElementById("addShortcut");

// buka editor
editBtn.addEventListener("click", () => {
  renderShortcutEditor();
  editor.classList.remove("hidden");
});

// tutup editor
closeEditor.addEventListener("click", () => {
  editor.classList.add("hidden");
});

// render list
function renderShortcutEditor() {
  shortcutList.innerHTML = "";

  Object.keys(shortcuts).forEach((key) => {
    const row = document.createElement("div");
    row.className = "shortcut-row";

    row.innerHTML = `
      <input value="${key}" disabled />
      <input value="${shortcuts[key]}" />
      <button data-key="${key}">🗑️</button>
    `;

    // update URL
    row.querySelectorAll("input")[1].addEventListener("change", (e) => {
      shortcuts[key] = e.target.value;
      saveShortcuts();
    });

    // delete
    row.querySelector("button").addEventListener("click", () => {
      delete shortcuts[key];
      saveShortcuts();
      renderShortcutEditor();
    });

    shortcutList.appendChild(row);
  });
}

// tambah shortcut
addBtn.addEventListener("click", () => {
  const key = prompt("Key (1 huruf)");
  const url = prompt("URL");

  if (!key || !url) return;

  shortcuts[key.toLowerCase()] = url;
  saveShortcuts();
  renderShortcutEditor();
});

// save
function saveShortcuts() {
  localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
}

// ===== INIT =====
updateBackground();
updateGreeting();
updateClock();
toggleIcon.textContent = shortcutEnabled ? "🟢" : "🔴";

setInterval(updateClock, 1000);
setInterval(updateGreeting, 60000);
setInterval(updateBackground, 60000);
