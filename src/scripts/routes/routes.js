// routes/routes.js
import HomePage from "../pages/home/home-page";
import UploadPage from "../pages/upload_page/upload_page";
import DetailsPhoto from "../pages/details_photo/details-photo";
import LoginPage from "../pages/auth/login-page";
import RegisterPage from "../pages/auth/register-page";
import { checkAuth, checkUnauth } from "../utils/auth";

const createProtectedRoute = (PageClass) => {
  return {
    page: new PageClass(),
    check: checkAuth,
  };
};

const createUnauthenticatedRoute = (PageClass) => {
  return {
    page: new PageClass(),
    check: checkUnauth,
  };
};

const routes = {
  "/": createProtectedRoute(HomePage),
  "/upload_page": createProtectedRoute(UploadPage),
  "/details_photo/:id": createProtectedRoute(DetailsPhoto),
  "/login": createUnauthenticatedRoute(LoginPage),
  "/register": createUnauthenticatedRoute(RegisterPage),
};

export default routes;
