const axios = require("axios");
const { authServiceUrl } = require("../config/env");
const AppError = require("./appError");

const injectHeadersHTTPMiddleware = async (req, res, next) => {
  const response = await getUserTokenInfo(req, res, next);
  if (!response) return;
  const { userId, userEmail, role } = response.data;
  if (!userEmail || !role) return;

  req.headers["x-user-id"] = userId;
  req.headers["x-user-email"] = userEmail;
  req.headers["x-user-role"] = role;

  next();
};

const injectHeadersGRPCMiddleware = async (req, res, next) => {
  const response = await getUserTokenInfo(req, res, next);
  if (!response) return;
  const { userId, userEmail, role } = response.data;

  const metadata = new grpc.Metadata();
  metadata.set("x-user-id", userId);
  metadata.set("x-user-email", userEmail);
  metadata.set("x-user-role", role);
  next();
};

const getUserTokenInfo = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  const { response } = await axios.post(`${authServiceUrl}/validate`, {
    token,
  });
  if (!response) {
    return next(
      new AppError("Something went wrong while validating token", 500)
    );
  }
  if (response.status === "fail") {
    return null;
  }

  req.user = {
    id: response.data.userId,
    email: response.data.userEmail,
    role: response.data.role,
  };

  return response.data.userId, response.data.userEmail, response.data.role;
};

module.exports = {
  injectHeadersHTTPMiddleware,
  injectHeadersGRPCMiddleware,
};
