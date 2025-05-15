// Perbaikan index.js untuk mencegah reload loop
// scripts/index.js
import App from "./pages/app.js";
import "../styles/style.css";
import "./utils/navbar.js";

// Mendaftarkan service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        console.log("Service worker registered:", reg);

        // Periksa apakah ada service worker yang menunggu untuk diaktifkan
        if (reg.waiting) {
          showUpdateNotification();
        }

        // Periksa jika ada service worker baru yang sedang diinstall
        reg.onupdatefound = () => {
          const newWorker = reg.installing;

          newWorker.onstatechange = () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              showUpdateNotification();
            }
          };
        };
      })
      .catch((err) => {
        console.error("Service worker registration failed:", err);
      });
  });

  // Gunakan flag dan timeout untuk mencegah loop refresh
  let refreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (refreshing) return;
    refreshing = true;

    // Gunakan timeout untuk memastikan controller telah sepenuhnya berubah
    // sebelum merefresh halaman
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  });
}

// Fungsi untuk menampilkan pemberitahuan update
function showUpdateNotification() {
  // Tampilkan notifikasi ke pengguna
  const updateBanner = document.createElement("div");
  updateBanner.style.position = "fixed";
  updateBanner.style.bottom = "0";
  updateBanner.style.left = "0";
  updateBanner.style.right = "0";
  updateBanner.style.backgroundColor = "#ff4444";
  updateBanner.style.color = "white";
  updateBanner.style.padding = "12px";
  updateBanner.style.textAlign = "center";
  updateBanner.style.zIndex = "9999";

  updateBanner.innerHTML = `
    Versi baru tersedia! 
    <button id="refresh-app" style="margin-left: 16px; padding: 6px 12px; background: white; color: black; border: none; border-radius: 4px; cursor: pointer;">
      Perbarui Sekarang
    </button>
  `;

  document.body.appendChild(updateBanner);

  document.getElementById("refresh-app").addEventListener("click", () => {
    if (navigator.serviceWorker.controller) {
      // Kirim pesan ke service worker untuk skipWaiting
      navigator.serviceWorker.controller.postMessage({ action: "skipWaiting" });

      // Hapus banner
      updateBanner.remove();
    }
  });
}

// Then initialize the app with the shell
const app = new App({
  content: document.getElementById("main-content"),
  drawerButton: document.getElementById("drawer-button"),
  navigationDrawer: document.getElementById("navigation-drawer"),
});

window.addEventListener("hashchange", () => {
  app.renderPage();
});

window.addEventListener("load", () => {
  app.renderPage();

  // Check if the app was launched from homescreen
  if (window.matchMedia("(display-mode: standalone)").matches) {
    console.log("App launched from homescreen");
    // You can add special handling for standalone mode here
  }
});
