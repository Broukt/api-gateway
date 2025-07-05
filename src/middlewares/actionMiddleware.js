const AppError = require("../utils/appError");
const { match } = require("path-to-regexp");

const actions = {
  "POST /usuarios": "CREATE USER",
  "GET /usuarios/:id": "FETCH USER BY ID",
  "PATCH /usuarios/:id": "UPDATE USER BY ID",
  "DELETE /usuarios/:id": "DELETE USER BY ID",
  "GET /usuarios": "LISTS FILTERED USERS",

  "POST /auth/login": "USER LOGIN",
  "PATCH /auth/usuarios/:id": "CHANGE USER PASSWORD",
  "POST /auth/logout": "USER LOGOUT",

  "POST /facturas": "CREATE BILL",
  "GET /facturas/:id": "FETCH BILL BY ID",
  "PATCH /facturas/:id": "UPDATE BILL STATUS BY ID",
  "DELETE /facturas/:id": "DELETE BILL BY ID",
  "GET /facturas": "LISTS FILTERED BILLS",

  "POST /videos": "UPLOAD VIDEO",
  "GET /videos/:id": "FETCH VIDEO BY ID",
  "PATCH /videos/:id": "UPDATE VIDEO BY ID",
  "DELETE /videos/:id": "DELETE VIDEO BY ID",
  "GET /videos": "LISTS FILTERED VIDEOS",

  "GET /monitoreo/acciones": "LISTS ACTIONS",
  "GET /monitoreo/errores": "LISTS ERRORS",

  "POST /listas-reproduccion": "CREATE PLAYLIST",
  "POST /listas-reproduccion/:id/videos": "ADD VIDEO TO PLAYLIST",
  "DELETE /listas-reproduccion/:id/videos": "REMOVE VIDEO FROM PLAYLIST",
  "GET /listas-reproduccion": "LISTS PLAYLISTS",
  "GET /listas-reproduccion/:id/videos": "FETCH PLAYLIST VIDEOS",
  "DELETE /listas-reproduccion/:id": "DELETE PLAYLIST BY ID",

  "POST /interacciones/:id/likes": "LIKE VIDEO",
  "POST /interacciones/:id/comentarios": "COMMENT VIDEO",
  "GET /interacciones/:id": "FETCH VIDEO INTERACTIONS",
};

function getActionDescription(method, path) {
  for (const key in actions) {
    const [m, routePattern] = key.split(' ');
    if (m !== method) continue;

    const matcher = match(routePattern, { decode: decodeURIComponent, strict: false, end: true });
    if (matcher(path)) {
      return actions[key];
    }
  }
  return 'UNKNOWN ACTION';
}

const actionMiddleware = async (req, res, next) => {
  const userId = req.user ? req.user.id : null;
  const URLMethod = `${req.method} ${req.originalUrl}`;
  const userEmail = req.user ? req.user.email : null;
  const actionDate = new Date().toISOString();
  const action = getActionDescription(req.method, req.originalUrl);
  console.log("URLMethod:", URLMethod);
  console.log("Action:", action);
  const monitoringClient = req.app.locals.monitoringClient;
  monitoringClient.createAction(
    {
      userId,
      URLMethod,
      userEmail,
      actionDate,
      action,
    },
    (error, response) => {
      if (error) {
        return new AppError(error.details || error.message, error.code || 500);
      }
      const { status } = response;
      console.log("Action logged with status:", status);
    }
  );

  console.log("Action logged:", {
    userId,
    URLMethod,
    userEmail,
    actionDate,
    action,
  });
  next();
};

module.exports = actionMiddleware;
