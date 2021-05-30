import { history } from "../../../history"
import axios from "axios"
import { apiConfig, appConfig } from "../../appConfig/app";

export const signupWithJWT = (email, password, callback = () => { }) => {
  let rootURL = apiConfig.rootUrl.replace("{0}", appConfig.appId).replace("{1}", appConfig.apiKey);
  rootURL += apiConfig.endpoint.auth.register;

  return dispatch => {
    axios
      .post(rootURL, {
        email: email,
        password: password
      })
      .then(response => {
        if(response.data){
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
