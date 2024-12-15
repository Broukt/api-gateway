const express = require('express');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const axios = require('axios');
const PROTO_PATH = 'C:\\Users\\LuisF\\OneDrive\\Escritorio\\Taller2 ç\\user_management\\user.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

const app = express();
app.use(express.json());

// Configurar cliente gRPC
const userClient = new userProto.UserService('localhost:50051', grpc.credentials.createInsecure());

// Endpoint para registro
app.post('/api/register', (req, res) => {
  const { name, firstLastName, secondLastName, rut, email, password, careerId,roleId } = req.body;

  userClient.Register({ name, firstLastName, secondLastName, rut, email, password, careerId,roleId }, (error, response) => {
    console.log(password)
    if (error) {
      return res.status(500).json({ error: error });
    }
    res.json(response);
  });
});

// Endpoint para inicio de sesión
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  userClient.Login({ email, password }, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error });
    }
    res.json(response);
  });
});

app.get('/api/profile/:userId', (req, res, next) => {
  const { userId } = req.params;

  userClient.GetProfile({ userId }, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error });
    }
    res.json(response);
  });
});

app.use((err, req, res, next) => {
  if (err.code && err.details) {
    return res.status(500).json({ error: err.details });
  }
  res.status(500).json({ error: 'An unexpected error occurred' });
});

// Endpoint para obtener todos los recursos de asignaturas
app.get('/api/resources', async (req, res, next) => {
  try {
    const response = await axios.get('http://localhost/api/resources'); // URL de tu servicio Cubi12
    res.json(response.data);
  } catch (error) {
    return res.status(500).json({ error: error }); 
  }
});

// Endpoint para obtener un recurso de asignatura por ID
app.get('/api/resources/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`http://localhost/api/resources/${id}`); // URL de tu servicio Cubi12
    res.json(response.data);
  } catch (error) {
    return res.status(500).json({ error: error }); 
  }
});

// Iniciar el servidor HTTP
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
