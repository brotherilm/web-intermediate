export default class DetailsPhotoPresenter {
  #view;
  #model;
  #storyId;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async init() {
    this.#loadMapboxScript();
    await this.#loadStoryDetails();
  }

  #loadMapboxScript() {
    const mapTilerStylesheet = document.createElement("link");
    mapTilerStylesheet.rel = "stylesheet";
    mapTilerStylesheet.href =
      "https://cdn.maptiler.com/maplibre-gl-js/v2.4.0/maplibre-gl.css";
    document.head.appendChild(mapTilerStylesheet);

    const mapTilerScript = document.createElement("script");
    mapTilerScript.src =
      "https://cdn.maptiler.com/maplibre-gl-js/v2.4.0/maplibre-gl.js";
    document.head.appendChild(mapTilerScript);
  }

  async #loadStoryDetails() {
    this.#storyId = this.#getStoryIdFromUrl();
    if (!this.#storyId) {
      this.#view.showError("No story ID found");
      return;
    }

    try {
      const detailsResponse = await this.#model.getStoryDetail(this.#storyId);

      if (detailsResponse.error || !detailsResponse.data.story) {
        this.#view.showError(
          detailsResponse.data.message || "Failed to load story details"
        );
        return;
      }

      const story = detailsResponse.data.story;
      this.#view.updateStoryDetails(story);

      if (story.lat && story.lon) {
        this.#waitForMapboxToLoad(
          parseFloat(story.lat),
          parseFloat(story.lon),
          10
        );
      }
    } catch (error) {
      this.#view.showError("An unexpected error occurred");
      console.error("Error loading story details:", error);
    }
  }

  #getStoryIdFromUrl() {
    const url = window.location.hash;
    const idMatch = url.match(/#\/details_photo\/([^\/]+)/);
    return idMatch?.[1];
  }

  #waitForMapboxToLoad(lat, lon, retriesLeft) {
    if (retriesLeft <= 0) {
      console.error("MapTiler failed to load");
      return;
    }

    if (window.maplibregl) {
      this.#view.initializeMap(lat, lon);
    } else {
      setTimeout(() => {
        this.#waitForMapboxToLoad(lat, lon, retriesLeft - 1);
      }, 500);
    }
  }
}
