// ================= GLOBAL DATA =================
const dayBg =
  "https://raw.githubusercontent.com/rosaroli558-crypto/bg-pikachu/main/bg-firefox-day.jpg";
const nightBg =
  "https://raw.githubusercontent.com/rosaroli558-crypto/bg-pikachu/main/bg-firefox-night.jpg";

// ================= THEME SYSTEM =================
function updateBackground() {
  const h = new Date().getHours();
  const isDay = h >= 6 && h < 18;
  const searchEl = document.getElementById("search");
  
  if (!searchEl) return; // Prevent errors if DOM isn't ready

  // Ganti Gambar
  document.body.style.backgroundImage = `url(${isDay ? dayBg : nightBg})`;

  if (isDay) {
    // TEMA SIANG
    document.body.style.color = "#333"; 
    document.getElementById("clock").style.color = "#222";
    
    // Update Input Search
    searchEl.style.background = "rgba(0, 0, 0, 0.08)";
    searchEl.style.color = "#222";
    searchEl.style.setProperty("--placeholder-color", "#555");
  } else {
    // TEMA MALAM
    document.body.style.color = "#ffffff";
    document.getElementById("clock").style.color = "#ffffff";
    
    // Update Input Search
    searchEl.style.background = "rgba(255, 255, 255, 0.2)";
    searchEl.style.color = "#fff";
    searchEl.style.setProperty("--placeholder-color", "#eee");
  }
}

// ================= CLOCK & GREETING =================
function updateClock() {
  const el = document.getElementById("clock");
  if (!el) return;
  el.textContent = new Date().toLocaleTimeString();
}

function updateGreeting() {
  const h = new Date().getHours();
  let t = "Saatnya Kita Kerja";
  if (h < 9) t = "Tidur Ron Jan Maksain";
  else if (h < 16) t = "Santai Nih, Ngapain Ya?";
  
  const el = document.getElementById("greeting");
  if (!el) return;
  el.textContent = t;
}

// ================= Serch gan... =================
const searchInput = document.getElementById("search");
if (searchInput) {
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const query = searchInput.value.trim();
      if (!query) return;

      const url = "https://www.google.com/search?q=" + encodeURIComponent(query);
      window.open(url, "_blank");
      searchInput.value = "";
    }
  });
}

// ================= SHORTCUT DATA & SYSTEM =================
const defaultShortcuts = {
  g: "https://www.google.com",
  y: "https://www.youtube.com",
  q: "https://web.whatsapp.com",
  c: "https://chat.openai.com",
  v: "https://music.youtube.com"
};

let shortcuts =
  JSON.parse(localStorage.getItem("shortcuts")) || defaultShortcuts;
localStorage.setItem("shortcuts", JSON.stringify(shortcuts));

// Toggle
let shortcutEnabled =
  localStorage.getItem("shortcutEnabled") !== "false";

const toggleIcon = document.getElementById("shortcutToggle");
if (toggleIcon) {
  function renderToggle() {
    toggleIcon.textContent = shortcutEnabled ? "🟢" : "🔴";
  }
  
  function toggleShortcut() {
    shortcutEnabled = !shortcutEnabled;
    localStorage.setItem("shortcutEnabled", shortcutEnabled);
    renderToggle();
  }
  
  toggleIcon.onclick = toggleShortcut;
}

// Keyboard
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "x") {
    e.preventDefault();
    if (typeof toggleShortcut === 'function') toggleShortcut();
    return;
  }

  if (shortcutEnabled && e.ctrlKey) {
    const k = e.key.toLowerCase();
    if (shortcuts[k]) {
      e.preventDefault();
      window.open(shortcuts[k], "_blank");
    }
  }

  if (e.key === "Alt") {
    const shortcutsEl = document.querySelector(".shortcuts");
    if (shortcutsEl) shortcutsEl.style.opacity = 1;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Alt") {
    const shortcutsEl = document.querySelector(".shortcuts");
    if (shortcutsEl) shortcutsEl.style.opacity = 0;
  }
});

// ================= EDIT MODAL =================
const modal = document.getElementById("editModal");
const form = document.getElementById("shortcutForm");
const editBtn = document.getElementById("editShortcutBtn");

if (modal && form && editBtn) {
  editBtn.onclick = () => {
    modal.style.display = "block";
    renderForm();
  };

  function closeModal() {
    modal.style.display = "none";
  }

  function renderForm() {
    form.innerHTML = "";

    for (const k in shortcuts) {
      form.innerHTML += `
        <div class="shortcut-row">
          <input value="${k}" disabled>
          <input data-key="${k}" value="${shortcuts[k]}">
          <button data-del="${k}">🗑</button>
        </div>
      `;
    }

    form.innerHTML += `<button id="add">+ Tambah</button>`;
  }

  // EVENT DELEGATION
  document.addEventListener("input", (e) => {
    if (e.target.dataset.key) {
      shortcuts[e.target.dataset.key] = e.target.value;
      localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.dataset.del) {
      delete shortcuts[e.target.dataset.del];
      localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
      renderForm();
    }

    if (e.target.id === "add") {
      const k = prompt("Key (1 huruf)");
      const u = prompt("URL");
      if (!k || !u) return;
      shortcuts[k.toLowerCase()] = u;
      localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
      renderForm();
    }
  });
}

// ================= PARTICLES SYSTEM =================
function createParticles(num) {
  const container = document.querySelector(".particles");
  if (!container) return;

  // Bersihin containernya dulu biar gak numpuk
  container.innerHTML = "";

  for (let i = 0; i < num; i++) {
    const p = document.createElement("div");
    p.classList.add("particle");
    
    // Ukuran acak (3px - 8px)
    const size = Math.random() * 5 + 3;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}vw`; // Pakai VW biar rata
    
    // Delay dan durasi terbang acak (biar estetik)
    const delay = Math.random() * 10; // 0-10 detik
    const duration = Math.random() * 10 + 10; // 10-20 detik
    
    // Gabungin animasi CSS 'fly' dengan durasi dan delay acak
    p.style.animation = `fly ${duration}s linear infinite ${delay}s`;
    
    // Warna kuning serbuk Pikachu (cerah)
    p.style.background = "#FFDF66"; 
    p.style.boxShadow = "0 0 10px rgba(255, 223, 102, 0.8)";
    
    container.appendChild(p);
  }
}

// ================= INIT =================
// Panggil fungsi segera setelah script di-load
updateBackground();
updateGreeting();
updateClock();
if (typeof renderToggle === 'function') renderToggle();
createParticles(30); // 30 Partikel

// Interval update
setInterval(updateClock, 1000);
setInterval(updateGreeting, 60000);
setInterval(updateBackground, 60000); // Sinkronkan gambar + warna

// Pastikan z-index partikel tidak ketutup background body
window.addEventListener("load", () => {
  document.body.style.zIndex = "0";
});
