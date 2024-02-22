const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todoRoutes = require('./todoRoutes');
const app = express();

// Configuración de la vista de plantilla EJS
app.set('view engine', 'ejs');

// Middleware para servir archivos estáticos
app.use(express.static('public'));

// Middleware para el análisis del cuerpo de las solicitudes
app.use(bodyParser.urlencoded({extended: true}));

// Conexión a la base de datos
mongoose.connect("mongodb://localhost:27017/tareasDB");

// Rutas de la aplicación
app.use('/', todoRoutes);

// Puerto en el que escucha el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
