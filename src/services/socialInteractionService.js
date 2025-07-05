const AppError = require("../utils/appError");

const giveLike = (req, res, next) => {
  const socialInteractionsClient = req.app.locals.socialInteractionsClient;
  socialInteractionsClient.giveLike(
    { videoId: req.params.id },
    (error, response) => {
      if (error) {
        throw new AppError(error.details || error.message, error.code || 500);
      }
      const { status } = response;
      res.status(status).send();
    }
  );
};

const giveComment = (req, res, next) => {
  const socialInteractionsClient = req.app.locals.socialInteractionsClient;
  socialInteractionsClient.giveComment(
    { videoId: req.params.id, comment: req.body.comment },
    (error, response) => {
      if (error) {
        throw new AppError(error.details || error.message, error.code || 500);
      }
      const { status } = response;
      res.status(status).send();
    }
  );
};

const listCommentsLikes = (req, res, next) => {
  const socialInteractionsClient = req.app.locals.socialInteractionsClient;
  socialInteractionsClient.listCommentsLikes(
    { videoId: req.params.id },
    (error, response) => {
      if (error) {
        throw new AppError(error.details || error.message, error.code || 500);
      }
      const { status, data } = response;
      res.status(status).json(data);
    }
  );
};

module.exports = {
  giveLike,
  giveComment,
  listCommentsLikes,
};
