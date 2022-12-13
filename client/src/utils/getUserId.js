import Auth from "./auth";
import decode from "jwt-decode";

export const getUserId = () => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  const user = token && decode(token);
  const userId = token && user.data._id;

  return userId;
};
