const express = require('express');
const router = express.Router();
const url = require('url');
const auth = require("../public/js/auth.js");
const query = require("../public/js/query.js");


var client_id = '338b48faea544146bda3e79eb5b799ed';
var redirect_uri = 'http://localhost:8888/callback';

router.get('/', (req, res) => {
    // res.status(200).send({
    //     test: "PING!"
    // });
    res.send(req.body); // Sends returns whatever was in the json body that was sent
});


router.get('/search', async (req, res) => {
    var songQuery = "err";
    var spotifyApi = await auth.authorizeAccess();
    var results;

    try {
        songQuery = await query.createQuery(req.body.song, req.body.artist);
    } catch(err) {
        console.log("Error, invalid or missing song/artist data");
    }

    if (songQuery != "err") {
        results = await query.querySongAPI(songQuery, spotifyApi);
    }
    
    


    res.status(200).send({
        test: "PING!",
        results
    });
    
});


module.exports = router;