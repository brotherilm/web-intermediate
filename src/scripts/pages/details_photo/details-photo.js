import DetailsPhotoPresenter from "./detail-photo-presenter.js";
import { getStoryDetail } from "../../data/api.js";
import { detailsPhotoStyles } from "./details-photo-styles.js";
import CONFIG from "../../config.js";

export default class DetailsPhoto {
  #presenter = null;

  constructor() {
    this.#presenter = new DetailsPhotoPresenter({
      view: this,
      model: { getStoryDetail },
    });

    const styleElement = document.createElement("style");
    styleElement.textContent = detailsPhotoStyles;
    document.head.appendChild(styleElement);
  }

  async render() {
    return `
      <section class="creepy-container">
        <div class="header">
          <p class="warning-text">*view details*</p>
          <a href="#/" class="back-btn">Back to gallery</a>
        </div>

        <h1 class="creepy-title">WITNESS THE DARKNESS</h1>

        <div class="details-container">
          <div class="loading-indicator">Loading horror details...</div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    await this.#presenter.init();
    this.setupBackButtonHandler();
  }

  setupBackButtonHandler() {
    const backButton = document.querySelector(".back-btn");
    if (backButton) {
      backButton.addEventListener("click", (e) => {
        e.preventDefault();

        if (document.startViewTransition) {
          document.startViewTransition(() => {
            window.location.hash = "#/";
          });
        } else {
          window.location.hash = "#/";
        }
      });
    }
  }

  showError(message) {
    const detailsContainer = document.querySelector(".details-container");
    if (detailsContainer) {
      detailsContainer.innerHTML = `
        <div class="error-message">
          <p>${message}</p>
          <a href="#/" class="back-btn">Back to gallery</a>
        </div>
      `;
    }
  }

  updateStoryDetails(story) {
    const detailsContainer = document.querySelector(".details-container");
    if (detailsContainer) {
      detailsContainer.innerHTML = `
        <div class="form-control">
          <label class="form-label">Name</label>
          <div class="input-container">
            <div class="detail-value">${story.name || "Unnamed Horror"}</div>
          </div>
        </div>

        <div class="form-control">
          <label class="form-label">Visual Evidence</label>
          <div class="image-slider-container">
            <img src="${story.photoUrl}" class="creepy-image" alt="${
        story.description || "Dark evidence"
      }"/>
          </div>
        </div>

        <div class="form-control">
          <label class="form-label">Description</label>
          <div class="input-container">
            <div class="detail-value">${
              story.description ||
              "The details of this horror remain unknown..."
            }</div>
          </div>
        </div>

        <div class="form-control">
          <label class="form-label">Location Coordinates</label>
          <div class="location-coords">
            <input type="text" placeholder="latitude" class="coord-input" value="${
              story.lat || ""
            }" readonly>
            <input type="text" placeholder="longitude" class="coord-input" value="${
              story.lon || ""
            }" readonly>
          </div>
        </div>

        <div class="form-control">
          <label class="form-label">Map Location</label>
          <div class="location-map-container">
            <div class="location-map" id="storyMap"></div>
          </div>
        </div>
      `;
    }
  }

  initializeMap(lat, lon) {
    try {
      if (!window.maplibregl) {
        console.error("MapLibre GL JS is not loaded");
        return;
      }

      const apiKey = CONFIG.MAP_SERVICE_API_KEY;
      const map = new maplibregl.Map({
        container: "storyMap",
        style: `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`,
        center: [lon, lat],
        zoom: 12,
      });

      map.addControl(new maplibregl.NavigationControl());

      new maplibregl.Marker()
        .setLngLat([lon, lat])
        .setPopup(
          new maplibregl.Popup({ offset: 25 }).setHTML(`
            <div style="font-family: Arial, sans-serif; padding: 5px;">
              <h4 style="margin: 0 0 5px 0;">Location</h4>
              <p style="margin: 0;">Lat: ${lat.toFixed(6)}</p>
              <p style="margin: 0;">Lon: ${lon.toFixed(6)}</p>
            </div>
          `)
        )
        .addTo(map);

      map.on("error", (e) => {
        console.error("Map error:", e);
        document.getElementById("storyMap").innerHTML =
          "Invalid Latitude or Longitude...";
      });
    } catch (error) {
      console.error("Error initializing map:", error);
      document.getElementById("storyMap").innerHTML =
        "Invalid Latitude or Longitude...";
    }
  }
}
