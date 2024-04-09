// Importar los módulos necesarios
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const path = require("path");

// Definir el número de puerto para el servidor
const PORT = 3000;

// Configurar middleware para servir archivos estáticos
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/bootstrap-js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

// Configurar el motor de plantillas Handlebars
app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
}));

// Establecer el motor de plantillas y la ubicación de las vistas
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Ruta principal para renderizar el dashboard
app.get("/", (req, res) => {
    res.render('dashboard', {
        title: 'Mercado Web',
        products: ['banana', 'cebollas', 'pimenton', 'papas', 'lechuga', 'tomate']
    });
});

// Iniciar el servidor y escuchar en el puerto definido
app.listen(PORT, () => {
    console.log(`El servidor está inicializado en el puerto http://localhost:${PORT}`);
});
