const AppError = require("../utils/appError");

const uploadVideo = (req, res, next) => {
  const videosClient = req.app.locals.videosClient;
  videosClient.uploadVideo(
    { ...req.body, requestorRole: req.user.role },
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

const getVideo = (req, res, next) => {
  const videosClient = req.app.locals.videosClient;
  videosClient.getVideo({ id: req.params.id }, (error, response) => {
    if (error) {
      return next(
        new AppError(error.details || error.message, error.code || 500)
      );
    }
    const { status, data } = response;
    res.status(status).json(data);
  });
};

const updateVideo = (req, res, next) => {
  const videosClient = req.app.locals.videosClient;
  videosClient.updateVideo(
    { id: req.params.id, ...req.body, requestorRole: req.user.role },
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

const deleteVideo = (req, res, next) => {
  const videosClient = req.app.locals.videosClient;
  videosClient.deleteVideo(
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

const listVideos = (req, res, next) => {
  const videosClient = req.app.locals.videosClient;
  videosClient.listVideos(
    {
      page: req.query.page || 1,
      limit: req.query.limit || 10,
      title: req.query.title || "",
      genre: req.query.genre || "",
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
  uploadVideo,
  getVideo,
  updateVideo,
  deleteVideo,
  listVideos,
};
