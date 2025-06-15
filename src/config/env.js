require("dotenv").config();

module.exports = {
  port: process.env.PORT || 50051,
  serverUrl: process.env.SERVER_URL || "0.0.0.0",
  authServiceUrl: process.env.AUTH_SERVICE_URL || "http://localhost:4000",
  usersServiceUrl: process.env.USERS_SERVICE_URL || "localhost:50051",
  playlistsServiceUrl: process.env.PLAYLISTS_SERVICE_URL || "localhost:50052",
};
