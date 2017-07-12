var express = require('express');
var app = express();
var index = require('./app/index/index.controller');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(__dirname+'/app'));
app.use("/node_modules", express.static('node_modules'));

app.set('/', index);

/* Init server*/
var server;
server = app.listen(3000, () => {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});
