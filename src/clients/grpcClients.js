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

const videosProto = loadProto("videos");
app.locals.videosClient = new videosProto.VideoService(
  process.env.VIDEOS_SERVICE_URL,
  credentials.createInsecure()
);

const billsProto = loadProto("bills");
app.locals.billsClient = new billsProto.BillingService(
  process.env.BILLING_SERVICE_URL,
  credentials.createInsecure()
);

const socialInteractionsProto = loadProto("interactions");
app.locals.interactionsClient = new socialInteractionsProto.SocialInteractionService(
  process.env.INTERACTIONS_SERVICE_URL,
  credentials.createInsecure()
);

const monitoringProto = loadProto("monitoring");
app.locals.monitoringClient = new monitoringProto.MonitoringService(
  process.env.MONITORING_SERVICE_URL,
  credentials.createInsecure()
);

module.exports = loadClients;
