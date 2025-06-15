const AppError = require("../utils/appError");
const permissions = require("../config/permissions");

const authMiddleware = (req, res, next) => {
  const routeKey = `${req.method} ${req.route.path}`;
  const allowed = permissions[routeKey] || [];
  if (allowed.includes("*")) return next();
  const role = req.user?.role || "guest";
  if (!allowed.includes(role)) {
    return next(
      new AppError("You do not have permission to access this resource", 403)
    );
  }
  next();
};

module.exports = authMiddleware;
