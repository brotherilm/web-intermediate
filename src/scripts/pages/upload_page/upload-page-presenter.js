import { addStory } from "../../data/api.js";
import CONFIG from "../../config.js";

export default class UploadPresenter {
  #view;
  #camera;
  #map;
  #currentPhotoFile = null;
  #isCameraOpen = false;

  constructor({ view, camera }) {
    this.#view = view;
    this.#camera = camera;
  }

  async initialize() {
    await this.loadMapTilerResources();
    this.initializeListeners();
    await this.initializeMap();
  }

  initializeListeners() {
    this.#view.bindPhotoInputButton(this.handlePhotoInputClick.bind(this));
    this.#view.bindPhotoInput(this.handlePhotoChange.bind(this));

    this.#view.bindCameraToggle(this.handleCameraToggle.bind(this));
    this.#view.bindTakePhotoButton(this.handleTakePhoto.bind(this));

    this.#view.bindFormSubmit(this.handleFormSubmit.bind(this));

    this.#view.bindLocationInputs(this.updateMarkerFromInputs.bind(this));
  }

  handlePhotoInputClick() {
    this.#view.clickPhotoInput();
    if (this.#isCameraOpen) {
      this.#camera.stop();
      this.#view.hideCameraContainer();
      this.#view.updateCameraButtonText("Open Camera");
      this.#isCameraOpen = false;
    }
  }

  handlePhotoChange(file) {
    if (file) {
      this.#currentPhotoFile = file;
      this.#view.showPhotoPreview(file);
      if (this.#isCameraOpen) {
        this.#camera.stop();
        this.#view.hideCameraContainer();
        this.#view.updateCameraButtonText("Open Camera");
        this.#isCameraOpen = false;
      }
    }
  }

  async handleCameraToggle() {
    if (!this.#isCameraOpen) {
      // Open camera
      this.#view.resetPhotoInput();
      const success = await this.#camera.start();
      if (success) {
        this.#view.showCameraContainer();
        this.#view.hidePhotoPreview();
        this.#view.updateCameraButtonText("Close Camera");
        this.#isCameraOpen = true;
      } else {
        this.#view.showAlert("Could not access camera");
      }
    } else {
      // Close camera
      this.#camera.stop();
      this.#view.hideCameraContainer();
      this.#view.updateCameraButtonText("Open Camera");
      this.#isCameraOpen = false;
    }
  }

  async handleTakePhoto() {
    this.#currentPhotoFile = await this.#camera.takePhoto();
    if (this.#currentPhotoFile) {
      this.#view.showPhotoPreview(this.#currentPhotoFile);
      this.#camera.stop();
      this.#view.hideCameraContainer();
      this.#view.updateCameraButtonText("Open Camera");
      this.#isCameraOpen = false;
    }
  }

  async handleFormSubmit(formData) {
    const { description, photoFile, latitude, longitude } = formData;
    const photoToUpload = this.#currentPhotoFile || photoFile;

    if (!photoToUpload) {
      this.#view.showAlert("Please select or take a photo");
      return;
    }

    try {
      const response = await addStory({
        description,
        photo: photoToUpload,
        lat: latitude,
        lon: longitude,
      });

      if (!response.error) {
        this.#view.showAlert("Story uploaded successfully!");
        window.location.hash = "#/";
      } else {
        this.#view.showAlert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      this.#view.showAlert("An error occurred while uploading the story");
      console.error(error);
    } finally {
      if (this.#isCameraOpen) {
        this.#camera.stop();
      }
    }
  }

  loadMapTilerResources() {
    const mapTilerCSS = document.createElement("link");
    mapTilerCSS.rel = "stylesheet";
    mapTilerCSS.href =
      "https://cdn.maptiler.com/maplibre-gl-js/v2.4.0/maplibre-gl.css";
    document.head.appendChild(mapTilerCSS);

    return new Promise((resolve) => {
      const mapTilerScript = document.createElement("script");
      mapTilerScript.src =
        "https://cdn.maptiler.com/maplibre-gl-js/v2.4.0/maplibre-gl.js";
      mapTilerScript.onload = resolve;
      document.head.appendChild(mapTilerScript);

      const timeout = setTimeout(() => {
        console.warn("MapTiler script loading timed out");
        resolve();
      }, 10000);

      mapTilerScript.onload = () => {
        clearTimeout(timeout);
        resolve();
      };
    });
  }

  async initializeMap() {
    if (typeof maplibregl === "undefined") {
      await new Promise((resolve) => {
        const checkMapTiler = setInterval(() => {
          if (typeof maplibregl !== "undefined") {
            clearInterval(checkMapTiler);
            resolve();
          }
        }, 100);
      });
    }

    this.#view.showMapLoading();

    const apiKey = CONFIG.MAP_SERVICE_API_KEY;

    const { latValue, lngValue } = this.#view.getLocationValues();
    const initialLat = latValue ? parseFloat(latValue) : -6.175389;
    const initialLng = lngValue ? parseFloat(lngValue) : 106.827139;

    const mapStyle = "streets";

    try {
      const map = new maplibregl.Map({
        container: "map",
        style: `https://api.maptiler.com/maps/${mapStyle}/style.json?key=${apiKey}`,
        center: [initialLng, initialLat],
        zoom: 13,
        attributionControl: false,
      });

      map.on("load", () => {
        this.#view.clearMapLoading();
      });

      map.addControl(
        new maplibregl.AttributionControl({
          compact: true,
          customAttribution:
            '<span style="color: #333">Mark the location</span>',
        })
      );

      map.addControl(new maplibregl.NavigationControl(), "top-right");

      const markerEl = document.createElement("div");
      markerEl.className = "custom-marker";
      markerEl.innerHTML = `
  <svg width="30" height="45" viewBox="0 0 30 45" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 0C6.71573 0 0 6.71573 0 15C0 23.2843 15 45 15 45C15 45 30 23.2843 30 15C30 6.71573 23.2843 0 15 0Z" fill="#E74C3C" />
    <circle cx="15" cy="15" r="7" fill="white" />
  </svg>
`;
      markerEl.style.width = "30px";
      markerEl.style.height = "45px";
      markerEl.style.cursor = "pointer";

      markerEl.style.filter = "drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.5))";

      // Add custom marker for the current position
      const marker = new maplibregl.Marker({
        element: markerEl,
        draggable: true,
        anchor: "bottom",
      })
        .setLngLat([initialLng, initialLat])
        .addTo(map);

      this.#map = map;
      this.marker = marker;

      marker.on("dragend", () => {
        const lngLat = marker.getLngLat();
        this.#view.updateLocationInputs(
          lngLat.lat.toFixed(6),
          lngLat.lng.toFixed(6)
        );
      });

      map.on("click", (e) => {
        const { lng, lat } = e.lngLat;
        marker.setLngLat([lng, lat]);
        this.#view.updateLocationInputs(lat.toFixed(6), lng.toFixed(6));
      });
    } catch (error) {
      console.error("Error initializing map:", error);
      this.#view.showMapError();
    }
  }

  updateMarkerFromInputs() {
    const { latValue, lngValue } = this.#view.getLocationValues();
    const lat = latValue ? parseFloat(latValue) : null;
    const lng = lngValue ? parseFloat(lngValue) : null;

    if (
      lat !== null &&
      lng !== null &&
      !isNaN(lat) &&
      !isNaN(lng) &&
      this.marker &&
      this.#map
    ) {
      this.marker.setLngLat([lng, lat]);
      this.#map.flyTo({
        center: [lng, lat],
        zoom: 13,
      });
    } else if (this.marker) {
      this.marker.remove();
    }
  }
}
