const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const loadClients = require("./clients/grpcClients");
const authRouter = require("./routes/authRoutes");
const usersRouter = require("./routes/usersRoutes");

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

app.use("/auth", authRouter);
app.use("/usuarios", usersRouter);

module.exports = app;