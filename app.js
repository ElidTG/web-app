const express = require('express');
const bodyParser = require('body-parser');
const { conexion } = require('./bd/config');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  next();
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());

// Set the CSP header with 'connect-src' to allow connections to your external service
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "connect-src 'self' https://ruta-inteligente-logica.onrender.com");
  next();
});

conexion();

app.use(require('./routes/index_routes'));

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
