// ================= GLOBAL DATA =================
const dayBg =
  "https://raw.githubusercontent.com/rosaroli558-crypto/bg-pikachu/main/bg-firefox-day.jpg";
const nightBg =
  "https://raw.githubusercontent.com/rosaroli558-crypto/bg-pikachu/main/bg-firefox-night.jpg";

// ================= THEME SYSTEM =================
function updateBackground() {
  const h = new Date().getHours();
  const isDay = h >= 6 && h < 18;
  const body = document.body;
  const searchEl = document.getElementById("search");
  
  body.style.backgroundImage = `url(${isDay ? dayBg : nightBg})`;

  if (isDay) {
    // --- TEMA SIANG ---
    body.style.color = "#333";
    document.getElementById("clock").style.color = "#222";
    
    // Warna Partikel SIANG (Orange gelap agar kontras di kuning)
    body.style.setProperty('--p-color', '#D35400'); 
    body.style.setProperty('--p-glow', 'rgba(211, 84, 0, 0.6)');

    if(searchEl) {
      searchEl.style.background = "rgba(0, 0, 0, 0.1)";
      searchEl.style.color = "#222";
    }
  } else {
    // --- TEMA MALAM ---
    body.style.color = "#ffffff";
    document.getElementById("clock").style.color = "#ffffff";
    
    // Warna Partikel MALAM (Cyan/Biru neon)
    body.style.setProperty('--p-color', '#00F2FF'); 
    body.style.setProperty('--p-glow', 'rgba(0, 242, 255, 0.8)');

    if(searchEl) {
      searchEl.style.background = "rgba(255, 255, 255, 0.2)";
      searchEl.style.color = "#fff";
    }
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
  container.innerHTML = "";

  for (let i = 0; i < num; i++) {
    const p = document.createElement("div");
    p.classList.add("particle");
    
    const size = Math.random() * 10 + 5;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}vw`;
    
    const delay = Math.random() * 10;
    const duration = Math.random() * 10 + 10;
    
    p.style.animation = `fly ${duration}s linear infinite ${delay}s`;
    
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
