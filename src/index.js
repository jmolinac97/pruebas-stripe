const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

//Inicializaciones
const app = express();

//Settings
//Indicamos la ruta de la carpeta views
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine','.hbs');

//Middleware para recibir y subir datos al servidor
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Routes
app.use(require('./routes/index'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Start Server
let port = 3000;
app.listen(port, () => {
    console.log('Server on port ', port)
});