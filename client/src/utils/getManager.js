import Auth from "./auth";
import decode from "jwt-decode";

export const getManagerStatus = () => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  const user = token && decode(token);
  const isManager = token && user.data.isManager;

  return isManager;
};
