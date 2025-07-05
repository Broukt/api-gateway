const express = require("express");
const monitoringService = require("../services/monitoringService");
const authMiddleware = require("../middlewares/authMiddleware");
const actionMiddleware = require("../middlewares/actionMiddleware");

const router = express.Router();

router.use(authMiddleware);
router.use(actionMiddleware);
router.get("/acciones", monitoringService.listActions);
router.get("/errores", monitoringService.listErrors);

module.exports = router;
