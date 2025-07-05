const express = require("express");
const videosService = require("../services/videoService");
const authMiddleware = require("../middlewares/authMiddleware");
const actionMiddleware = require("../middlewares/actionMiddleware");

const router = express.Router();

router.get("/", actionMiddleware, videosService.listVideos);
router.use(authMiddleware);
router.use(actionMiddleware);
router.post("/", videosService.uploadVideo);
router
  .route("/:id")
  .get(videosService.getVideo)
  .patch(videosService.updateVideo)
  .delete(videosService.deleteVideo);

module.exports = router;
