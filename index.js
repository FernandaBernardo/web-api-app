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

app.post('/login', (req, resp) => {
    const { username, password } = req.body;

    if (username === 'fernanda' && password === '123') {
        return res.status(200).json({
            token: '12345',
        });
    } else {
        return res.status(401).json({
            message: 'Invalid username or password.',
        });
    }
});


const server = app.listen(3000);
console.log('Servidor Express iniciado na porta %s', server.address().port);