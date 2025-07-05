const { monitoringServiceUrl } = require("../config/env");
const axios = require("axios");

const sendErrorDev = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    msg: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      msg: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      msg: "Something went wrong!",
    });
  }
};

module.exports = async (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  const userId = req.user ? req.user.id : null;
  const userEmail = req.user ? req.user.email : null;
  const e = err.message || "Unknown error";

  const monitoringClient = req.app.locals.monitoringClient;
  monitoringClient.createError(
    {
      userId,
      userEmail,
      error: e,
    },
    (error, response) => {
      if (error) {
        console.error("Errorrrrrr failed:", error);
        return;
      }
      const { status } = response;
      console.log("Error logged with status:", status);
    }
  );

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    const error = { ...err };
    error.message = err.message;

    sendErrorProd(error, req, res);
  }
};
