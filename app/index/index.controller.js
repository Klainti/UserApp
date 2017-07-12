var path = require('path');

module.exports = (req, res) =>{

    console.log('GOT REQ = ' + req.originalUrl);

    res.sendFile(path.join(__dirname, '../','/index.html'));
};