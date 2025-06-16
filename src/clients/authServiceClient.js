const axios = require("axios");
const { authServiceUrl } = require("../config/env");

const authServiceClient = axios.create({
  baseURL: authServiceUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

module.exports = authServiceClient;
