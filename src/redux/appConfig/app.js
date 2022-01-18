export const appConfig = {
  appId: "DD6DAD5D-A3CF-7E93-FF87-447115BE9A00",
  apiKey: "BEF30287-04C0-444C-A266-629FA30A50C6",
};

export const apiConfig = {
  rootUrl: "https://api.backendless.com/{0}/{1}/",
  endpoint: {
    auth: {
      register:
        "https://kggnq2bkh5.execute-api.ap-southeast-1.amazonaws.com/dev/signup",
      login:
        "https://kggnq2bkh5.execute-api.ap-southeast-1.amazonaws.com/dev/login",
      logout:
        "https://kggnq2bkh5.execute-api.ap-southeast-1.amazonaws.com/dev/logout",
      updatePassword:
        "https://kggnq2bkh5.execute-api.ap-southeast-1.amazonaws.com/dev/updatePassword",
    },
    account: {
      updateProfile: "",
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
