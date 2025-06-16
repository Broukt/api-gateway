const express = require("express");
const authService = require("../services/authService");
const {
  injectHeadersHTTPMiddleware,
} = require("../middlewares/injectHeadersMiddlewares");

const router = express.Router();

router.use(injectHeadersHTTPMiddleware);
router.post("/register", authService.register);
router.post("/login", authService.login);
router.patch("/usuarios/:id", authService.changePassword);
router.post("/logout", authService.logout);

module.exports = router;
