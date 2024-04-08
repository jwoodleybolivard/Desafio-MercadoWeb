// Importar los módulos necesarios
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const path = require("path");
const PORT = 3000;

// Configuración de middleware y rutas estáticas
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/bootstrap-js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

// Configuración del motor de plantillas Handlebars
app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main', // Layout predeterminado
    layoutsDir: path.join(__dirname, 'views/layouts'), // Directorio de layouts
    partialsDir: path.join(__dirname, 'views/partials') // Directorio de parciales
}));

// Establecer el motor de plantillas Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Ruta raíz para renderizar el dashboard
app.get("/", (req, res) => {
    res.render('dashboard', {
        title: 'Mercado Web', // Título de la página
        products: ['banana', 'cebollas', 'pimenton', 'papas', 'lechuga', 'tomate'] // Lista de productos
    });
});

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`El servidor está inicializado en el puerto http://localhost:${PORT}`);
});
