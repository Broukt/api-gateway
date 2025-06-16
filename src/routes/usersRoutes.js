const express = require("express");
const usersService = require("../services/userService");
const {
  injectHeadersHTTPMiddleware,
} = require("../middlewares/injectHeadersMiddlewares");

const router = express.Router();

router.use(injectHeadersHTTPMiddleware);
router.get("/", usersService.listUsers);
router.get("/:id", usersService.getUser);
router.patch("/:id", usersService.updateUser);
router.delete("/:id", usersService.deleteUser);

module.exports = router;