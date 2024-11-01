import axios from "axios";

console.log("API URL:", process.env.REACT_APP_API_URL);

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("JWT");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    let csrfToken = localStorage.getItem("CSRF");
    if (!csrfToken) {
      try {
        const resp = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/csrf-token`,
          { withCredentials: true }
        );
        csrfToken = resp.data.token;
        localStorage.setItem("CSRF", csrfToken);
      } catch (e) {
        console.error("Failed to get CSRF token", e);
      }
    }
    if (csrfToken) {
      config.headers["X-XSRF-TOKEN"] = csrfToken;
    }
    console.log("X-XSRF-TOKEN" + csrfToken);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
