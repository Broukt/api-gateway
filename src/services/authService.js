const authServiceClient = require("../clients/authServiceClient");
const AppError = require("../utils/appError");

const register = (req, res, next) => {
  const { name, lastName, email, password, confirmPassword, role } = req.body;
  authServiceClient
    .post("/register", {
      name,
      lastName,
      email,
      password,
      confirmPassword,
      role,
    }, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "x-user-id": req.headers["x-user-id"],
        "x-user-email": req.headers["x-user-email"],
        "x-user-role": req.headers["x-user-role"],
      },
    })
    .then((response) => {
      res.status(response.status).json(response.data);
    })
    .catch((error) => {
      const { response } = error;
      if (response) {
        return res.status(response.status).json(response.data);
      }

      return next(
        new AppError(
          error?.details ?? "An error occurred during registration",
          error.code ?? 500
        )
      );
    });
};

const login = (req, res, next) => {
  console.log("Logging in user with data:", req.body);
  const { email, password } = req.body;

  authServiceClient
    .post("/login", {
      email,
      password,
    })
    .then((response) => {
      res.status(response.status).json(response.data);
    })
    .catch((error) => {
      const { response } = error;
      if (response) {
        return res.status(response.status).json(response.data);
      }

      return next(
        new AppError(
          error?.details ?? "An error occurred during login",
          error.code ?? 500
        )
      );
    });
};

const changePassword = (req, res, next) => {
  const { id } = req.params;
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  authServiceClient
    .patch(
      `/usuarios/${id}`,
      {
        currentPassword,
        newPassword,
        confirmNewPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "x-user-id": req.headers["x-user-id"],
          "x-user-email": req.headers["x-user-email"],
          "x-user-role": req.headers["x-user-role"],
        },
      }
    )
    .then((response) => {
      res.status(response.status).json(response.data);
    })
    .catch((error) => {
      const { response } = error;
      if (response) {
        return res.status(response.status).json(response.data);
      }

      return next(
        new AppError(
          error?.details ?? "An error occurred while changing password",
          error.code ?? 500
        )
      );
    });
};

const logout = (req, res, next) => {
  const token = req.headers.authorization;

  authServiceClient
    .post(
      "/logout",
      {},
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
          "Accept": "application/json",
          "x-user-id": req.headers["x-user-id"],
          "x-user-email": req.headers["x-user-email"],
          "x-user-role": req.headers["x-user-role"],
        },
      }
    )
    .then((response) => {
      res.status(response.status).json(response.data);
    })
    .catch((error) => {
      const { response } = error;
      if (response) {
        return res.status(response.status).json(response.data);
      }

      return next(
        new AppError(
          error?.details ?? "An error occurred during logout",
          error.code ?? 500
        )
      );
    });
};

const authService = {
  register,
  login,
  changePassword,
  logout,
};

module.exports = authService;
