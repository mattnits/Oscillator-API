const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const router = require('./routes/oscillator.js');



app.use(morgan('short'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.use('/', router);

var server = app.listen(8000, function () {

    var host = server.address().address;
    var port = server.address().port;
    
    
    console.log('Express app listening at http://%s:%s', host, port);

});