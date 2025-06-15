const { loadProto } = require("../utils/loadProto.js");
const { credentials } = require("@grpc/grpc-js");
const dotenv = require("dotenv");

dotenv.config();

const loadClients = (app) => {
  const usersProto = loadProto("users");
  app.locals.usersClient = new usersProto.UserService(
    process.env.USERS_SERVICE_URL,
    credentials.createInsecure()
  );

  const playlistsProto = loadProto("playlists");
  app.locals.playlistsClient = new playlistsProto.PlaylistService(
    process.env.PLAYLISTS_SERVICE_URL,
    credentials.createInsecure()
  );
};

module.exports = loadClients;
