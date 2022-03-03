import axios from "axios";
import { apiConfig } from "../../appConfig/app";

export const createReservation = (
  values,
  successCallback = () => {},
  errorCallback = () => {}
) => {
  let rootURL = apiConfig.endpoint.reservation.createReservation;
  const { id: userId, accessToken } = JSON.parse(localStorage.getItem("user"));

  return (dispatch) => {
    axios
      .post(
        rootURL,
        { ...values, userId },
        {
          headers: {
            accesstoken: accessToken, //the token is a variable which holds the token
          },
        }
      )
      .then((response) => {
        if (response.data) {
          successCallback(response.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          errorCallback(error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };
};
