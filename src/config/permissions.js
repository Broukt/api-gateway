module.exports = {
  "GET /usuarios": ["Administrador"],
  "GET /usuarios/:id": ["Administrador", "Cliente"],
  "POST /usuarios": ["Administrador"],
  "PATCH /usuarios/:id": ["Administrador", "Cliente"],
  "DELETE /usuarios/:id": ["Administrador"],

  "POST /auth/registrar": ["*"],
  "POST /auth/login": ["*"],
  "POST /auth/logout": ["Administrador", "Cliente"],
  "PATCH /auth/usuarios/:id": ["Administrador", "Cliente"],

  "POST /listas-reproduccion": ["Administrador", "Cliente"],
  "POST /listas-reproduccion/:id/videos": ["Administrador", "Cliente"],
  "DELETE /listas-reproduccion/:id/videos": ["Administrador", "Cliente"],
  "GET /listas-reproduccion": ["Administrador", "Cliente"],
  "GET /listas-reproduccion/:id/videos": ["Administrador", "Cliente"],
  "DELETE /listas-reproduccion/:id": ["Administrador", "Cliente"],
};
