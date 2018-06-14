const express = require('express'),
    app = express(),
    exphbs  = require('express-handlebars'),
    bodyParser = require('body-parser'),
    path = require('path');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.engine('.handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', '.handlebars');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, resp) => {
    resp.render('login');
});

app.get('/product', (req, res) => {
    res.render('product');
});

app.post('/login', (req, res) => {
    const { user, password } = req.body;

    if (user === 'fernanda' && password === '123') {
        res.redirect('/product');
    }
});

const server = app.listen(3000);
console.log('Servidor Express iniciado na porta %s', server.address().port);