const USER = "user";

export const clearUserLocal = () => {
  return localStorage.removeItem(USER);
};
