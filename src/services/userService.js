const grpc = require("@grpc/grpc-js");

const getUser = async (req, res, next) => {
  const usersClient = req.app.locals.usersClient;
  const metadata = new grpc.Metadata();
  metadata.set("x-user-id", req.headers["x-user-id"]);
  metadata.set("x-user-email", req.headers["x-user-email"]);
  metadata.set("x-user-role", req.headers["x-user-role"]);
  console.log("Metadata", metadata);
  usersClient.getUser({ id: req.params.id }, metadata, (error, response) => {
    if (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({
        message: "Failed to fetch user",
        error: error.message,
      });
    }
    res.status(200).json(response);
  });
};

const updateUser = async (req, res, next) => {
  const usersClient = req.app.locals.usersClient;
  const metadata = new grpc.Metadata();
  metadata.set("x-user-id", req.headers["x-user-id"]);
  metadata.set("x-user-email", req.headers["x-user-email"]);
  metadata.set("x-user-role", req.headers["x-user-role"]);
  usersClient.updateUser(
    { id: req.params.id, ...req.body },
    metadata,
    (error, response) => {
      if (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({
          message: "Failed to update user",
          error: error.message,
        });
      }
      res.status(200).json(response);
    }
  );
};

const deleteUser = async (req, res, next) => {
  const usersClient = req.app.locals.usersClient;
  const metadata = new grpc.Metadata();
  metadata.set("x-user-id", req.headers["x-user-id"]);
  metadata.set("x-user-email", req.headers["x-user-email"]);
  metadata.set("x-user-role", req.headers["x-user-role"]);
  usersClient.deleteUser({ id: req.params.id }, metadata, (error, response) => {
    if (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({
        message: "Failed to delete user",
        error: error.message,
      });
    }
    res.status(200).json(response);
  });
};

const listUsers = async (req, res, next) => {
  const usersClient = req.app.locals.usersClient;
  const metadata = new grpc.Metadata();
  metadata.set("x-user-id", req.headers["x-user-id"]);
  metadata.set("x-user-email", req.headers["x-user-email"]);
  metadata.set("x-user-role", req.headers["x-user-role"]);
  usersClient.listUsers(
    {
      emailFilter: req.query.emailFilter || "",
      nameFilter: req.query.nameFilter || "",
      lastNameFilter: req.query.lastNameFilter || "",
      page: parseInt(req.query.page) || 1,
      pageSize: parseInt(req.query.pageSize) || 10,
    },
    metadata,
    (error, response) => {
      if (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({
          message: "Failed to fetch users",
          error: error.message,
        });
      }
      res.status(200).json(response);
    }
  );
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  listUsers,
};
