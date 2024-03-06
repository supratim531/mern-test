import axios from "axios";

const domain = "http://localhost:8000";

const baseURL = `${domain}/api/v1`;

const authorizedAxios = token => axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${token}`
  }
});

const unauthorizedAxios = axios.create({
  baseURL: baseURL
});

export {
  domain,
  authorizedAxios,
  unauthorizedAxios
};
