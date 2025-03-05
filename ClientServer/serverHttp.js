// npm install express body-parser
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const cors = require('cors');
// Middleware para parsear JSON
app.use(bodyParser.json());
app.use(cors()); 
// Habilitar CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
const users = [];
// Ruta para manejar POST requests
app.post('/data', (req, res) => {
  console.log('Datos recibidos:', req.body);
  users.push(req.body);

  // Responder al cliente
  res.json({
    status: 'Datos recibidos!',
    receivedData: req.body
  });
});


app.get('/users', (req, res) => {
  res.json(users);
});

app.delete('/users/:email', (req, res) => {
  const email = req.params.email;
  const index = users.findIndex(user => user.email === email);

  if (index !== -1) {
    users.splice(index, 1);
    res.json({ status: 'Usuario eliminado correctamente' });
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

app.put('/users/:email', (req, res) => {
  const email = req.params.email;
  const { nombre, nuevoEmail } = req.body;

  const user = users.find(user => user.email === email);

  if (user) {
    if (nombre) user.nombre = nombre;
    if (nuevoEmail) user.email = nuevoEmail;
    res.json({ status: 'Usuario actualizado correctamente' });
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});



app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});