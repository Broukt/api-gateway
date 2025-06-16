const axios = require("axios");
const { authServiceUrl } = require("../config/env");
const AppError = require("../utils/appError");

const injectHeadersHTTPMiddleware = async (req, res, next) => {
  const response = await getUserTokenInfo(req, res, next);
  console.log(response);
  if (!response) {
    req.headers["x-user-id"] = "";
    req.headers["x-user-email"] = "";
    req.headers["x-user-role"] = "";
    console.log("No user info found, headers set to empty strings");
    return next();
  }
  const { userId, userEmail, role } = response;

  req.headers["x-user-id"] = userId;
  req.headers["x-user-email"] = userEmail;
  req.headers["x-user-role"] = role;

  console.log("Headers injected:", {
    "x-user-id": userId,
    "x-user-email": userEmail,
    "x-user-role": role,
  });
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
  let response;
  try {
    // this returns the HTTP response object, does NOT throw on 2xx only
    response = await axios.post(
      `${authServiceUrl}/validate`,
      { token },
      // optional: let you handle 401 in code rather than via throw
      { validateStatus: () => true }
    );
  } catch (err) {
    return next(new AppError("Auth service unavailable", 502));
  }
  if (response.data.status === "fail") {
    console.log("Auth service returned fail status:", response.data);
    return null;
  }

  req.user = {
    id: response.data.userId,
    email: response.data.userEmail,
    role: response.data.role,
  };

  return {
    userId: response.data.userId,
    userEmail: response.data.userEmail,
    role: response.data.role,
  };
};

module.exports = {
  injectHeadersHTTPMiddleware,
};
