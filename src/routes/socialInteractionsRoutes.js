const express = require("express");
const socialInteractionsService = require("../services/socialInteractionService");
const authMiddleware = require("../middlewares/authMiddleware");
const actionMiddleware = require("../middlewares/actionMiddleware");

const router = express.Router();

router.use(authMiddleware);
router.use(actionMiddleware);
router.post("/:id/likes", socialInteractionsService.giveLike);
router.post("/:id/comentarios", socialInteractionsService.giveComment);
router.get("/:id", socialInteractionsService.listCommentsLikes);

module.exports = router;
