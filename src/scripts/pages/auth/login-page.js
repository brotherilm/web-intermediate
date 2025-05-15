import { loginPageStyles } from "./login-styles.js";
import LoginPresenter from "./login-presenter.js";

export default class LoginPage {
  #presenter;
  #formElements = {
    form: null,
    email: null,
    password: null,
    errorMessage: null,
    submitButton: null,
  };

  constructor() {
    this.#presenter = new LoginPresenter(this);
  }

  async render() {
    return `
      <section class="creepy-container">
        <div class="header">
          <p class="warning-text">*secure login*</p>
        </div>

        <h1 class="creepy-title">ACCOUNT LOGIN</h1>

        <div class="auth-form-container">
          <form id="loginForm" class="creepy-form">
            <div class="form-control">
              <label for="email" class="form-label">Email</label>
              <input id="email" name="email" type="email" placeholder="Enter your email" required>
            </div>

            <div class="form-control">
              <label for="password" class="form-label">Password</label>
              <input type="password" id="password" name="password" placeholder="Enter your password" required>
            </div>

            <button type="submit" class="btn">Login</button>

            <div class="auth-footer">
              <span>No account? </span>
              <a href="#/register" class="auth-link">Register here</a>
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
    styleElement.textContent = loginPageStyles;
    document.head.appendChild(styleElement);

    // Cache form elements
    this.#formElements = {
      form: document.getElementById("loginForm"),
      email: document.getElementById("email"),
      password: document.getElementById("password"),
      errorMessage: document.getElementById("errorMessage"),
      submitButton: document.querySelector("#loginForm button[type='submit']"),
    };

    // Set up event listeners
    this.#formElements.form.addEventListener("submit", async (e) => {
      e.preventDefault();
      await this.#presenter.handleLogin();
    });
  }

  getFormData() {
    return {
      email: this.#formElements.email.value,
      password: this.#formElements.password.value,
    };
  }

  showError(message) {
    this.#formElements.errorMessage.textContent = message;
    this.#formElements.errorMessage.style.display = "block";
    this.#formElements.errorMessage.className = "error-message";
  }

  clearError() {
    this.#formElements.errorMessage.textContent = "";
    this.#formElements.errorMessage.style.display = "none";
  }

  setLoading(isLoading) {
    if (isLoading) {
      this.#formElements.submitButton.disabled = true;
      this.#formElements.submitButton.textContent = "Logging in...";
    } else {
      this.#formElements.submitButton.disabled = false;
      this.#formElements.submitButton.textContent = "Login";
    }
  }

  navigateTo(path) {
    window.location.hash = path;
  }
}
