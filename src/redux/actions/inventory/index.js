import axios from "axios";
import { apiConfig } from "../../appConfig/app";

export const getInventoryData = (user, callback = () => {}) => {
  let rootURL = apiConfig.endpoint.inventory.getInventory;
  console.log(`{
        userToken: ${user["user-token"]},
        userObjectID: ${user.objectId}
    }`);

  return (dispatch) => {
    axios
      .post(rootURL, {
        // userToken: user["user-token"],
        userObjectID: user.objectId,
      })
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          callback(response.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          callback(error.response.data);
          console.log(error.response.data);
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

export const inventoryByUser = (callback = () => {}) => {
  let rootURL = apiConfig.endpoint.inventory.inventoryByUser;

  return (dispatch) => {
    axios
      .get(rootURL, {
        headers: {
          accesstoken: JSON.parse(localStorage.getItem("user")).accessToken, //the token is a variable which holds the token
        },
      })
      .then((response) => {
        if (response.data) {
          callback(response.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          callback(error.response.data);
          console.log(error.response.data);
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
