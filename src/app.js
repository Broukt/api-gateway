const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const loadClients = require("./clients/grpcClients");
const usersRouter = require("./routes/usersRoutes");
const authRouter = require("./routes/authRoutes");
const billingRouter = require("./routes/billingRoutes");
const videosRouter = require("./routes/videosRoutes");
const monitoringRouter = require("./routes/monitoringRoutes");
const playlistsRouter = require("./routes/playlistsRoutes");
const socialInteractionsRouter = require("./routes/socialInteractionsRoutes");
const globalErrorMiddleware = require("./middlewares/globalErrorMiddleware");

dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(compression());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the API",
  });
});

loadClients(app);

app.use("/usuarios", usersRouter);
app.use("/auth", authRouter);
app.use("/facturas", billingRouter);
app.use("/videos", videosRouter);
app.use("/monitoreo", monitoringRouter);
app.use("/listas-reproduccion", playlistsRouter);
app.use("/interacciones", socialInteractionsRouter);

app.use(globalErrorMiddleware);

module.exports = app;
