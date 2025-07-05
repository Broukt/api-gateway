const AppError = require("../utils/appError");

const listActions = async (req, res, next) => {
  const monitoringClient = req.app.locals.monitoringClient;
  monitoringClient.listActions(
    {
      requestorRole: req.user.role,
    },
    (error, response) => {
      if (error) {
        return next(
          new AppError(error.details || error.message, error.code || 500)
        );
      }
      const { status, data } = response;
      res.status(status).json(data);
    }
  );
};

const listErrors = async (req, res, next) => {
  const monitoringClient = req.app.locals.monitoringClient;
  monitoringClient.listErrors(
    {
      requestorRole: req.user.role,
    },
    (error, response) => {
      if (error) {
        return next(
          new AppError(error.details || error.message, error.code || 500)
        );
      }
      const { status, data } = response;
      res.status(status).json(data);
    }
  );
};

module.exports = {
  listActions,
  listErrors,
};
