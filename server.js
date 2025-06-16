const app = require("./src/app");
const dotenv = require("dotenv");
const { port, serverUrl } = require("./src/config/env");

dotenv.config();

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1); // Exit the process to avoid running in an unstable state
});

const server = app.listen(port, () => {
  console.log(`Server running on ${serverUrl}:${port}`);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(() => {
    process.exit(1); // Exit the process to avoid running in an unstable state
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("Process terminated");
  });
});
