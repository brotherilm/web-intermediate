import HomePresenter from "./home-presenter.js";
import { getStories } from "../../data/api.js";
import { homePageStyles } from "./home-styles.js";

export default class HomePage {
  #presenter = null;

  constructor() {
    this.#presenter = new HomePresenter({
      view: this,
      model: { getStories },
    });
  }

  async render() {
    return `
      <section class="creepy-container id="main-content tabindex="-1"">
        <div class="header">
          <p class="warning-text">*Click on the photo*</p>
          <a href="#/upload_page" class="upload-btn">Upload Photo</a>
        </div>

        <h1 class="creepy-title">THIS PHOTOS COMES FROM NOWHERE</h1>

        <div id="gallery" class="gallery">
          <div class="loading-indicator">Loading photos...</div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    // Apply CSS styles
    const styleElement = document.createElement("style");
    styleElement.textContent = homePageStyles;
    document.head.appendChild(styleElement);

    // Initialize data
    await this.#presenter.initialGallery();

    // Add click handlers for photos
    this.setupPhotoClickHandlers();
  }

  setupPhotoClickHandlers() {
    const gallery = document.getElementById("gallery");
    if (gallery) {
      gallery.addEventListener("click", (e) => {
        const photoLink = e.target.closest(".photo-container");
        if (!photoLink) return;

        e.preventDefault();

        const href = photoLink.getAttribute("href");

        // Handle transition
        if (document.startViewTransition) {
          document.startViewTransition(() => {
            window.location.hash = href;
          });
        } else {
          window.location.hash = href;
        }
      });
    }
  }

  showLoading() {
    const gallery = document.getElementById("gallery");
    if (gallery) {
      gallery.innerHTML =
        '<div class="loading-indicator">Loading photos...</div>';
    }
  }

  hideLoading() {
    const loadingIndicator = document.querySelector(".loading-indicator");
    if (loadingIndicator) {
      loadingIndicator.remove();
    }
  }

  populateGallery(stories) {
    const gallery = document.getElementById("gallery");
    if (!gallery) return;

    if (!stories || stories.length === 0) {
      gallery.innerHTML =
        '<div class="empty-gallery">No photos available</div>';
      return;
    }

    const photosHtml = stories
      .map((story, i) => {
        const truncatedDesc =
          story.description.length > 100
            ? story.description.substring(0, 100) + "..."
            : story.description;

        const createdDate = new Date(story.createdAt);
        const formattedDate = createdDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });

        return `
          <div class="photo-item">
            <a href="#/details_photo/${story.id}" class="photo-container">
              <img src="${story.photoUrl}" alt="image-${i + 1}" />
            </a>
            <div class="photo-info">
              <h3 class="photo-name">${story.name}</h3>
              <p class="photo-description">${truncatedDesc}</p>
              <div class="photo-date">${formattedDate}</div>
            </div>
          </div>
        `;
      })
      .join("");

    gallery.innerHTML = photosHtml;
  }

  populateGalleryError(errorMessage) {
    const gallery = document.getElementById("gallery");
    if (gallery) {
      gallery.innerHTML = `
        <div class="error-container">
          <p class="error-message">${
            errorMessage || "Failed to load photos"
          }</p>
          <button id="retry-button" class="retry-button">Try Again</button>
        </div>
      `;

      const retryButton = document.getElementById("retry-button");
      if (retryButton) {
        retryButton.addEventListener("click", () => {
          this.#presenter.initialGallery();
        });
      }
    }
  }

  populateFallbackGallery() {
    const gallery = document.getElementById("gallery");
    if (gallery) {
      gallery.innerHTML = `
      <div class="offline-message">
        <p>You are currently offline.</p>
        <p>Please check your internet connection and try again.</p>
      </div>
    `;
    }
  }
}
