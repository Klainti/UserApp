const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const apiRouter = require('./app/routes/apiRouter');

const index = require('./app/controllers/index/index.con');




app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(__dirname+'/app'));
app.use("/node_modules", express.static('node_modules'));



app.get('/', index);
app.use('/api', apiRouter);


/* Init server*/
var server;
server = app.listen(3000, () => {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});
