import { register } from "../../data/api.js";

export default class RegisterPresenter {
  #view;
  #authService;

  constructor(view, authService = null) {
    this.#view = view;
    this.#authService = authService;
  }

  async handleRegister() {
    try {
      this.#view.clearError();
      const formData = this.#view.getFormData();

      // Validate form data
      if (!this.#validateFormData(formData)) {
        return;
      }

      // Show loading state
      this.#view.setLoading(true);

      // Call the register API
      const result = await register({
        name: formData.username,
        email: formData.email,
        password: formData.password,
      });

      // Hide loading state
      this.#view.setLoading(false);

      if (result.error) {
        this.#view.showError(
          result.data.message || "Registration failed. Please try again."
        );
        return;
      }

      this.#handleRegistrationSuccess();
    } catch (error) {
      this.#handleRegistrationError(error);
    }
  }

  #validateFormData(formData) {
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      this.#view.showError("All fields are required");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      this.#view.showError("Passwords do not match");
      return false;
    }

    if (formData.password.length < 8) {
      this.#view.showError("Password must be at least 8 characters long");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      this.#view.showError("Please enter a valid email address");
      return false;
    }

    return true;
  }

  #handleRegistrationSuccess() {
    this.#view.showSuccess("Registration successful! Redirecting to login...");

    setTimeout(() => {
      this.#view.navigateToLogin();
    }, 1500);
  }

  #handleRegistrationError(error) {
    this.#view.setLoading(false);
    console.error("Registration error:", error);
    this.#view.showError("An unexpected error occurred. Please try again.");
  }
}
