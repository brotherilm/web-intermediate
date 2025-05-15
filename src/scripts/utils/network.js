const NetworkStatus = {
  // Initialize the network status notification system
  init() {
    this.createNotificationElement();
    this.setupEventListeners();

    // Check initial status
    if (!navigator.onLine) {
      this.showOfflineNotification();
    }

    // Listen for messages from service worker
    this.listenForServiceWorkerMessages();
  },

  // Create the notification element that will be shown when offline
  createNotificationElement() {
    this.offlineNotification = document.createElement("div");
    this.offlineNotification.id = "offline-notification";
    this.offlineNotification.textContent = "Network Error: You are offline";
    this.offlineNotification.style.display = "none";
    this.offlineNotification.style.position = "fixed";
    this.offlineNotification.style.top = "16px";
    this.offlineNotification.style.left = "16px"; // Diubah ke pojok kiri atas
    this.offlineNotification.style.backgroundColor = "#ff4444";
    this.offlineNotification.style.color = "white";
    this.offlineNotification.style.padding = "12px 16px";
    this.offlineNotification.style.borderRadius = "4px";
    this.offlineNotification.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
    this.offlineNotification.style.zIndex = "10000";

    // Add to document when DOM is ready
    if (document.body) {
      document.body.appendChild(this.offlineNotification);
    } else {
      window.addEventListener("DOMContentLoaded", () => {
        document.body.appendChild(this.offlineNotification);
      });
    }
  },

  // Set up event listeners for online/offline events
  setupEventListeners() {
    window.addEventListener("online", () => {
      this.hideOfflineNotification();
    });

    window.addEventListener("offline", () => {
      this.showOfflineNotification();
    });
  },

  // Show the offline notification - tetap tampil selama offline
  showOfflineNotification() {
    this.offlineNotification.style.display = "block";
    // Tidak ada auto-fade atau timeout, notifikasi tetap tampil
  },

  // Hide the offline notification
  hideOfflineNotification() {
    this.offlineNotification.style.display = "none";
  },

  // Listen for messages from the service worker
  listenForServiceWorkerMessages() {
    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data && event.data.type === "NETWORK_ERROR") {
        this.showOfflineNotification();
      }
    });
  },
};

export default NetworkStatus;
