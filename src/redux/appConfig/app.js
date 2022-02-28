export const appConfig = {
  appId: "DD6DAD5D-A3CF-7E93-FF87-447115BE9A00",
  apiKey: "BEF30287-04C0-444C-A266-629FA30A50C6",
};

export const apiConfig = {
  rootUrl: "https://api.backendless.com/{0}/{1}/",
  endpoint: {
    auth: {
      register: "http://localhost:3001/dev/signup",
      login: "http://localhost:3001/dev/login",
      logout: "http://localhost:3001/dev/logout",
      updatePassword: "http://localhost:3001/dev/updatePassword",
    },
    client: {
      getProfiles: "http://localhost:3001/dev/getProfiles",
      updateProfiles: "http://localhost:3001/dev/updateProfiles",
    },
    inventory: {
      getInventory:
        "https://5jg6n0m1tg.execute-api.us-west-2.amazonaws.com/dev/inventory", //'https://enho23tk41op09s.m.pipedream.net'
    },
    conversations: {
      getConversations:
        "https://9qmbuwhd14.execute-api.ap-southeast-1.amazonaws.com/dev/conversations",
    },
  },
};
