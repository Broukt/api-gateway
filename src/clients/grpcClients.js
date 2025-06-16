const { loadProto } = require("../utils/loadProto.js");
const { credentials } = require("@grpc/grpc-js");
const { usersServiceUrl, playlistsServiceUrl } = require("../config/env.js");

const loadClients = (app) => {
  const usersProto = loadProto("users");
  app.locals.usersClient = new usersProto.Users(
    usersServiceUrl,
    credentials.createInsecure()
  );

  const playlistsProto = loadProto("playlists");
  app.locals.playlistsClient = new playlistsProto.Playlists(
    playlistsServiceUrl,
    credentials.createInsecure()
  );
};

module.exports = loadClients;
