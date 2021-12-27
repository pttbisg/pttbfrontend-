import { history } from "../../../history";
import axios from "axios";
import { appConfig, apiConfig } from "../../appConfig/app";

export const loginWithJWT = (user, callback = () => { }) => {
  let rootURL = apiConfig.rootUrl.replace("{0}", appConfig.appId).replace("{1}", appConfig.apiKey);

  rootURL += apiConfig.endpoint.auth.login;
  return dispatch => {
    axios
      .post(rootURL, {
        login: user.email,
        password: user.password
      })
      .then(response => {
        var loggedInUser;

        if (response.data) {
          loggedInUser = response.data;
          localStorage.setItem("user", JSON.stringify(loggedInUser));
          dispatch({
            type: "LOGIN_WITH_JWT",
            payload: { loggedInUser, loggedInWith: "jwt" }
          })

          history.push("/pages/inventory")
        }
      })
      .catch(error => {
        if (error.response) {
          // Request made and server responded
          callback(error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      })
  }
}

export const logoutWithJWT = (callback = () => { }) => {
  let rootURL = apiConfig.rootUrl.replace("{0}", appConfig.appId).replace("{1}", appConfig.apiKey);
  let loggedInUser = localStorage.getItem('user');
  if(loggedInUser) loggedInUser = JSON.parse(loggedInUser);

  rootURL += apiConfig.endpoint.auth.logout;
  return dispatch => {
    axios
      .get(rootURL, {
        headers: {
          'user-token': loggedInUser['user-token']
        }
      })
      .then(response => {
        if (response) {
          localStorage.removeItem("user");
          dispatch({ type: "LOGOUT_WITH_JWT", payload: {} })
          history.push("/pages/login")
        }
      })
      .catch(error => {
        if (error.response) {
          // Request made and server responded
          callback(error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      })
  }
}

export const changeRole = role => {
  return dispatch => dispatch({ type: "CHANGE_ROLE", userRole: role })
}
