import UploadPresenter from "./upload-page-presenter.js";
import { uploadPageStyles } from "./upload-styles.js";
import { Camera } from "../../utils/camera.js";

export default class UploadPage {
  #presenter;
  #camera;
  #elements = {};

  constructor() {
    this.#elements = {};
  }

  async render() {
    return `
      <section class="creepy-container">
        <div class="header">
          <p class="warning-text">*upload your story*</p>
        </div>

        <h1 class="creepy-title">UPLOAD YOUR STORY</h1>
  
        <div class="upload-form-container">
          <form id="upload-form" class="creepy-form">
            <div class="form-control">
              <label for="description-input" class="form-label">Tell us your fears</label>
              <div class="input-container">
                <textarea
                  id="description-input"
                  name="description"
                  placeholder="Describe what lurks in these shadows. What do you see? What do you hear? What haunts you?"
                  required
                ></textarea>
              </div>
            </div>
  
            <div class="form-control">
              <label class="form-label">Share your Creepy Photo</label>
              <div id="photo-more-info">Upload the image that haunts your dreams.</div>
  
              <div class="documentation-container">
                <div class="documentation-buttons">
                  <button id="photo-input-button" class="btn btn-outline" type="button">
                    Choose Image
                  </button>
                  <button id="camera-toggle-button" class="btn btn-outline" type="button">
                    Open Camera
                  </button>
                  <input
                    id="photo-input"
                    name="photo"
                    type="file"
                    accept="image/*"
                    hidden="hidden"
                    aria-describedby="photo-more-info"
                  >
                </div>
                
                <div id="camera-container" style="display: none; margin-top: 20px; position: relative;">
                  <video id="camera-video" width="100%" autoplay></video>
                  <canvas id="camera-canvas" style="display: none;"></canvas>
                  <div style="display: flex; gap: 10px; margin-top: 10px;">
                    <button id="take-photo-button" class="btn" type="button">
                      Take Photo
                    </button>
                  </div>
                </div>
                
                <div id="photo-preview-container" class="photo-preview">
                  <img id="photo-preview" style="max-width: 100%; max-height: 300px; display: none;"/>
                </div>
              </div>
            </div>

            <div class="form-control">
              <div class="form-label">Mark where it happened</div>
              <div class="location-container">
                <div class="location-map-container">
                  <div id="map" class="location-map"></div>
                  <div id="map-loading-container"></div>
                </div>
                <div class="location-coords">
                  <input type="number" id="latitude-input" name="latitude" placeholder="Latitude" step="any">
                  <input type="number" id="longitude-input" name="longitude" placeholder="Longitude" step="any">
                </div>
              </div>
            </div>
  
            <div class="form-buttons">
              <span id="submit-button-container">
                <button class="btn" type="submit">Submit to the void</button>
              </span>
            </div>
          </form>
        </div>
      </section>
    `;
  }

  async afterRender() {
    // Apply styles
    const styleElement = document.createElement("style");
    styleElement.textContent = uploadPageStyles;
    document.head.appendChild(styleElement);

    // Initialize elements
    this.#initializeElements();

    // Initialize camera
    this.#camera = new Camera(
      this.#elements.videoElement,
      this.#elements.canvasElement
    );

    // Initialize presenter
    this.#presenter = new UploadPresenter({
      view: this,
      camera: this.#camera,
    });

    // Initialize the application
    await this.#presenter.initialize();
  }

  #initializeElements() {
    // Form elements
    this.#elements.uploadForm = document.getElementById("upload-form");
    this.#elements.photoInput = document.getElementById("photo-input");
    this.#elements.photoInputButton =
      document.getElementById("photo-input-button");
    this.#elements.cameraToggleButton = document.getElementById(
      "camera-toggle-button"
    );
    this.#elements.takePhotoButton =
      document.getElementById("take-photo-button");
    this.#elements.cameraContainer =
      document.getElementById("camera-container");
    this.#elements.videoElement = document.getElementById("camera-video");
    this.#elements.canvasElement = document.getElementById("camera-canvas");
    this.#elements.photoPreview = document.getElementById("photo-preview");
    this.#elements.descriptionInput =
      document.getElementById("description-input");
    this.#elements.latitudeInput = document.getElementById("latitude-input");
    this.#elements.longitudeInput = document.getElementById("longitude-input");
    this.#elements.mapLoadingContainer = document.getElementById(
      "map-loading-container"
    );
  }

  // Binding methods for event listeners
  bindPhotoInputButton(handler) {
    this.#elements.photoInputButton.addEventListener("click", handler);
  }

  bindPhotoInput(handler) {
    this.#elements.photoInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      handler(file);
    });
  }

  bindCameraToggle(handler) {
    this.#elements.cameraToggleButton.addEventListener("click", handler);
  }

  bindTakePhotoButton(handler) {
    this.#elements.takePhotoButton.addEventListener("click", handler);
  }

  bindFormSubmit(handler) {
    this.#elements.uploadForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = {
        description: this.#elements.descriptionInput.value,
        photoFile: this.#elements.photoInput.files[0],
        latitude: this.#elements.latitudeInput.value
          ? parseFloat(this.#elements.latitudeInput.value)
          : null,
        longitude: this.#elements.longitudeInput.value
          ? parseFloat(this.#elements.longitudeInput.value)
          : null,
      };

      handler(formData);
    });
  }

  bindLocationInputs(handler) {
    this.#elements.latitudeInput.addEventListener("change", handler);
    this.#elements.longitudeInput.addEventListener("change", handler);
  }

  // UI update methods
  clickPhotoInput() {
    this.#elements.photoInput.click();
  }

  resetPhotoInput() {
    this.#elements.photoInput.value = "";
  }

  showCameraContainer() {
    this.#elements.cameraContainer.style.display = "block";
  }

  hideCameraContainer() {
    this.#elements.cameraContainer.style.display = "none";
  }

  hidePhotoPreview() {
    this.#elements.photoPreview.style.display = "none";
  }

  updateCameraButtonText(text) {
    this.#elements.cameraToggleButton.textContent = text;
  }

  showPhotoPreview(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.#elements.photoPreview.src = e.target.result;
      this.#elements.photoPreview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }

  showAlert(message) {
    alert(message);
  }

  showMapLoading() {
    if (this.#elements.mapLoadingContainer) {
      this.#elements.mapLoadingContainer.innerHTML =
        "<div style=\"display: flex; justify-content: center; align-items: center; height: 100%; color: #9494c8; font-family: 'Special Elite', cursive;\">Loading haunted map locations...</div>";
    }
  }

  clearMapLoading() {
    if (this.#elements.mapLoadingContainer) {
      this.#elements.mapLoadingContainer.innerHTML = "";
    }
  }

  showMapError() {
    if (this.#elements.mapLoadingContainer) {
      this.#elements.mapLoadingContainer.innerHTML =
        "<div style=\"color: #9494c8; text-align: center; padding: 20px; font-family: 'Special Elite', cursive;\">Failed to load the map. Please try again later.</div>";
    }
  }

  getLocationValues() {
    return {
      latValue: this.#elements.latitudeInput.value,
      lngValue: this.#elements.longitudeInput.value,
    };
  }

  updateLocationInputs(lat, lng) {
    this.#elements.latitudeInput.value = lat;
    this.#elements.longitudeInput.value = lng;
  }
}
