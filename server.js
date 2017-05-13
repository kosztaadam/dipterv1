var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');

//app.set('views', __dirname + '/views');
//app.set('view engine', 'jsx');
//app.engine('jsx', require('express-react-views').createEngine());

// Kliens oldali css es js-ek miatt
app.use(express.static('static'));
//app.use(express.static('views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.tpl = {};
    res.tpl.error = [];

    return next();
});

require('./routes/main')(app);
require('./routes/artistParams')(app);
require('./routes/ajaxArtistParams')(app);
require('./routes/spotifyParams')(app);

app.use(function (err, req, res, next) {
    res.status(500).send('Houston, we have a problem!');

    //Flush out the stack to the console
    console.error(err.stack);
});

// App wireframe
app.use('/wireframe', express.static('wireframe'));

var server = app.listen(5000, function () {
	console.log('server listen: localhost:5000')
});