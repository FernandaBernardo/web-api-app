const express = require('express'),
    app = express(),
    exphbs  = require('express-handlebars'),
    https = require('https');

app.use(express.static(__dirname));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, resp) => {
    resp.render('login');
});


const server = app.listen(3000);
console.log('Servidor Express iniciado na porta %s', server.address().port);