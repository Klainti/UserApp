/**
 *
 * Created by vchris on 13/7/2017.
 */

var path = require('path');

module.exports = (req, res) =>{

    console.log('GOT REQ = ' + req.originalUrl);

    res.sendFile(path.join(__dirname, '../../','/index.html'));
};