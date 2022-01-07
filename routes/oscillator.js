const express = require('express');
const router = express.Router();


router.get('/', function(req, res) {
    res.status(200).send({
        test: "PING!"
    });
});


router.get('/test', function(req, res) {
    res.send('test');
    res.end();
});


module.exports = router;