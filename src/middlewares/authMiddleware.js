const axios = require("axios");
const { authServiceUrl } = require("../config/env");
const AppError = require("../utils/appError");

const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const authMiddleware = async (req, res, next) => {
  const token = extractToken(req);
  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "No token provided, please log in",
    });
  }
  let response;
  try {
    response = await axios.post(
      `${authServiceUrl}/validate`,
      { token },
      { validateStatus: () => true }
    );
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "An error occurred while validating the token",
    });
  }
  if (response.data.status === "fail") {
    return res.status(response.status).json({
      status: response.data.status,
      message: response.data.msg || "Invalid token",
    });
  }
  req.user = response.data.user;
  console.log("Authenticated user:", req.user);
  next();
};

module.exports = authMiddleware;
