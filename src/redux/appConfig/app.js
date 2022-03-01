export const appConfig = {
  appId: "DD6DAD5D-A3CF-7E93-FF87-447115BE9A00",
  apiKey: "BEF30287-04C0-444C-A266-629FA30A50C6",
};

const {
  REACT_APP_USER_REGISTER_ENDPOINT,
  REACT_APP_USER_LOGIN_ENDPOINT,
  REACT_APP_USER_LOGOUT_ENDPOINT,
  REACT_APP_USER_UPDATE_PASSWORD_ENDPOINT,
  REACT_APP_USER_GET_PROFILES_ENDPOINT,
  REACT_APP_USER_UPDATE_PROFILES_ENDPOINT,
  REACT_APP_USER_INVENTORY_ENDPOINT,
  REACT_APP_USER_CONVERSATIONS_ENDPOINT,
} = process.env;

export const apiConfig = {
  rootUrl: "https://api.backendless.com/{0}/{1}/",
  endpoint: {
    auth: {
      register: REACT_APP_USER_REGISTER_ENDPOINT,
      login: REACT_APP_USER_LOGIN_ENDPOINT,
      logout: REACT_APP_USER_LOGOUT_ENDPOINT,
      updatePassword: REACT_APP_USER_UPDATE_PASSWORD_ENDPOINT,
    },
    client: {
      getProfiles: REACT_APP_USER_GET_PROFILES_ENDPOINT,
      updateProfiles: REACT_APP_USER_UPDATE_PROFILES_ENDPOINT,
    },
    inventory: {
      getInventory:
        "https://5jg6n0m1tg.execute-api.us-west-2.amazonaws.com/dev/inventory", //'https://enho23tk41op09s.m.pipedream.net',
      inventoryByUser: REACT_APP_USER_INVENTORY_ENDPOINT,
    },
    conversations: {
      getConversations: REACT_APP_USER_CONVERSATIONS_ENDPOINT,
    },
  },
};
