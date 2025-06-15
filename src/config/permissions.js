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

  "POST /facturas": ["Administrador"],
  "GET /facturas/:id": ["Administrador", "Cliente"], 
  "PATCH /facturas/:id": ["Administrador"],
  "DELETE /facturas/:id": ["Administrador"],
  "GET /facturas": ["Administrador", "Cliente"],

  "GET /videos": ["Administrador", "Cliente"],
  "GET /videos/:id": ["Administrador", "Cliente"],
  "POST /videos": ["Administrador"],
  "PATCH /videos/:id": ["Administrador"],
  "DELETE /videos/:id": ["Administrador"],

  "GET /monitoreo/acciones": ["Administrador"],
  "GET /monitoreo/errores": ["Administrador"],

  "POST /interacciones/:id/likes": ["Administrador", "Cliente"],
  "POST /interacciones/:id/comentarios": ["Administrador", "Cliente"],
  "GET /interacciones/:id": ["Administrador", "Cliente"]
};
