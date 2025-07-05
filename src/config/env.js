require("dotenv").config();

module.exports = {
  port: process.env.PORT || 50051,
  serverUrl: process.env.SERVER_URL || "0.0.0.0",
  authServiceUrl: process.env.AUTH_SERVICE_URL || "http://localhost:4000",
  usersServiceUrl: process.env.USERS_SERVICE_URL || "localhost:50051",
  playlistsServiceUrl: process.env.PLAYLISTS_SERVICE_URL || "localhost:50052",
  billingServiceUrl: process.env.BILLING_SERVICE_URL || "localhost:50054",
  videosServiceUrl: process.env.VIDEOS_SERVICE_URL || "localhost:50055",
  monitoringServiceUrl: process.env.MONITORING_SERVICE_URL || "localhost:50056",
  socialInteractionsServiceUrl:
    process.env.SOCIAL_INTERACTIONS_SERVICE_URL || "localhost:50057",
};
