document.addEventListener("DOMContentLoaded", function () {
  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      console.log("Logout clicked");
    });
  }

  const mainContent = document.getElementById("main-content");
  const skipLink = document.querySelector(".skip-to-content");

  skipLink.addEventListener("click", function (e) {
    e.preventDefault();
    mainContent.focus();

    mainContent.scrollIntoView();
  });
});
