const express = require('express');
const bodyParser = require('body-parser');
const { conexion } = require('./bd/config');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

// Set up CORS to allow multiple origins
const allowedOrigins = [
  'https://rutaiinteligente.vercel.app',
  'http://localhost:4200',
];

app.use(function(req, res, next) {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

  next();
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());

conexion();

app.use(require('./routes/index_routes'));

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
