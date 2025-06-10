const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const authServiceClient = axios.create({
  baseURL: process.env.AUTH_SERVICE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

module.exports = authServiceClient;
