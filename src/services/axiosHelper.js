import axios from "axios";

axios.defaults.baseURL = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const tokenFromSession = sessionStorage.getItem("tokenFromSession");
  if (token || tokenFromSession) {
    /**
     * if token exists then we add the token to request header
     */
    config.headers["x-auth-token"] = token || tokenFromSession;
  }
  return config;
});
