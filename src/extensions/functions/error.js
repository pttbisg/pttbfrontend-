import { clearUserLocal } from "./localStorage";
import { redirectToLoginPage } from "./window";

export const APIErrorHandler = ({ status, message }) => {
  if (status === 401 || message === "JWT expired") {
    clearUserLocal();
    redirectToLoginPage();

    return false;
  }

  return true;
};
