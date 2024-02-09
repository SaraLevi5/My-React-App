import axios from "axios";

axios.defaults.baseURL = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const tokenFromSession = sessionStorage.getItem("tokenFromSession");
  if (token || tokenFromSession) {
    config.headers["x-auth-token"] = token || tokenFromSession;
  }
  return config;
});
