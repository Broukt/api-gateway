const { loadProto } = require("../utils/loadProto.js");
const { credentials } = require("@grpc/grpc-js");
const {
  billingServiceUrl,
  videosServiceUrl,
  socialInteractionsServiceUrl,
  monitoringServiceUrl,
} = require("../config/env.js");

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

  const billsProto = loadProto("bills");
  app.locals.billingClient = new billsProto.Billing(
    billingServiceUrl,
    credentials.createInsecure()
  );

  const videosProto = loadProto("videos");
  app.locals.videosClient = new videosProto.Videos(
    videosServiceUrl,
    credentials.createInsecure()
  );

  const socialInteractionsProto = loadProto("socialInteractions");
  app.locals.socialInteractionsClient =
    new socialInteractionsProto.SocialInteractions(
      socialInteractionsServiceUrl,
      credentials.createInsecure()
    );

  const monitoringProto = loadProto("monitoring");
  app.locals.monitoringClient = new monitoringProto.Monitoring(
    monitoringServiceUrl,
    credentials.createInsecure()
  );
};

module.exports = loadClients;
