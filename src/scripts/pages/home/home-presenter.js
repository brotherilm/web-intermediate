export default class HomePresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async initialGallery() {
    this.#view.showLoading();

    try {
      const storiesResponse = await this.#model.getStories();

      if (
        !storiesResponse.error &&
        storiesResponse.data &&
        storiesResponse.data.listStory
      ) {
        this.#view.populateGallery(storiesResponse.data.listStory);
      } else {
        console.error("Failed to load stories:", storiesResponse.error);
        this.#view.populateFallbackGallery();
      }
    } catch (error) {
      console.error("initialGallery: error:", error);
      this.#view.populateGalleryError(error.message);
    } finally {
      this.#view.hideLoading();
    }
  }
}
