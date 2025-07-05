const AppError = require("../utils/appError");

const createBill = async (req, res, next) => {
  const billingClient = req.app.locals.billingClient;
  billingClient.createBill(
    {
      userId: req.body.userId,
      amount: req.body.amount,
      status: req.body.status,
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

const getBill = async (req, res, next) => {
  const billingClient = req.app.locals.billingClient;
  billingClient.getBill(
    {
      id: req.params.id,
      requestorId: req.user.id,
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
const updateBill = async (req, res, next) => {
  const billingClient = req.app.locals.billingClient;
  billingClient.updateBill(
    {
      id: req.params.id,
      status: req.body.status,
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

const deleteBill = async (req, res, next) => {
  const billingClient = req.app.locals.billingClient;
  billingClient.deleteBill(
    { id: req.params.id, requestorRole: req.user.role },
    (error, response) => {
      if (error) {
        return next(
          new AppError(error.details || error.message, error.code || 500)
        );
      }
      const { status } = response;
      res.status(status);
    }
  );
};
const listBills = async (req, res, next) => {
  const billingClient = req.app.locals.billingClient;
  billingClient.listBills(
    {
      statusFilter: req.query.statusFilter || "",
      requestorId: req.user.id,
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
  createBill,
  getBill,
  updateBill,
  deleteBill,
  listBills,
};
