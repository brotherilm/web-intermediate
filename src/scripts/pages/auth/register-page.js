import { registerPageStyles } from "./register-styles.js";
import RegisterPresenter from "./register-presenter.js";

export default class RegisterPage {
  #presenter;
  #formElements = {
    form: null,
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
    errorMessage: null,
    submitButton: null,
  };

  constructor() {
    this.#presenter = new RegisterPresenter(this);
  }

  async render() {
    return `
      <section class="creepy-container">
        <div class="header">
          <p class="warning-text">*create account*</p>
        </div>

        <h1 class="creepy-title">REGISTER ACCOUNT</h1>

        <div class="auth-form-container">
          <form id="registerForm" class="creepy-form">
            <div class="form-control">
              <label for="username" class="form-label">Username</label>
              <input id="username" name="username" placeholder="Choose a username" required>
            </div>

            <div class="form-control">
              <label for="email" class="form-label">Email</label>
              <input type="email" id="email" name="email" placeholder="Enter your email" required>
            </div>

            <div class="form-control">
              <label for="password" class="form-label">Password</label>
              <input type="password" id="password" name="password" placeholder="Create a password (min 8 characters)" required minlength="8">
            </div>

            <div class="form-control">
              <label for="confirm-password" class="form-label">Confirm Password</label>
              <input type="password" id="confirm-password" name="confirm-password" placeholder="Repeat your password" required minlength="8">
            </div>

            <button type="submit" class="btn">Register</button>

            <div class="auth-footer">
              <span>Already have an account? </span>
              <a href="#/login" class="auth-link">Login here</a>
            </div>
          </form>
          <div id="errorMessage" class="error-message"></div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    // Apply styles
    const styleElement = document.createElement("style");
    styleElement.textContent = registerPageStyles;
    document.head.appendChild(styleElement);

    // Cache form elements
    this.#formElements = {
      form: document.getElementById("registerForm"),
      username: document.getElementById("username"),
      email: document.getElementById("email"),
      password: document.getElementById("password"),
      confirmPassword: document.getElementById("confirm-password"),
      errorMessage: document.getElementById("errorMessage"),
      submitButton: document.querySelector(
        "#registerForm button[type='submit']"
      ),
    };

    // Set up event listeners
    this.#formElements.form.addEventListener("submit", async (e) => {
      e.preventDefault();
      await this.#presenter.handleRegister();
    });
  }

  getFormData() {
    return {
      username: this.#formElements.username.value,
      email: this.#formElements.email.value,
      password: this.#formElements.password.value,
      confirmPassword: this.#formElements.confirmPassword.value,
    };
  }

  showError(message) {
    this.#formElements.errorMessage.textContent = message;
    this.#formElements.errorMessage.style.display = "block";
    this.#formElements.errorMessage.className = "error-message";
  }

  showSuccess(message) {
    this.#formElements.errorMessage.textContent = message;
    this.#formElements.errorMessage.style.display = "block";
    this.#formElements.errorMessage.className = "success-message";
  }

  clearError() {
    this.#formElements.errorMessage.textContent = "";
    this.#formElements.errorMessage.style.display = "none";
  }

  setLoading(isLoading) {
    if (isLoading) {
      this.#formElements.submitButton.disabled = true;
      this.#formElements.submitButton.textContent = "Registering...";
    } else {
      this.#formElements.submitButton.disabled = false;
      this.#formElements.submitButton.textContent = "Register";
    }
  }

  navigateToLogin() {
    window.location.hash = "#/login";
  }
}
