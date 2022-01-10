const { error } = require('console');
const express = require('express');
const router = express.Router();
const url = require('url');
const auth = require("../public/js/auth.js");
const query = require("../public/js/query.js");


var client_id = '338b48faea544146bda3e79eb5b799ed';
var redirect_uri = 'http://localhost:8888/callback';

router.get('/', (req, res) => {
    res.status(200).send({
        test: "PING!"
    });
});


router.get('/search', async (req, res) => {
    var songQuery = "err";
    var spotifyApi = "err";
    var results;

    try {
        spotifyApi = await auth.authorizeAccess();
    } catch(err) {
        res.status(409).send({
            "Error": "Unable to connect to SpotifyAPI"
        });
    }
    
    if (spotifyApi != null) {
        try {
            if (req.body.song == undefined || req.body.artist == undefined) throw error
    
            songQuery = await query.createQuery(req.body.song, req.body.artist);
        } catch(err) {
            console.log("Error, invalid or missing song/artist data");
        }
    
        if (songQuery == null) {
            results = await query.querySongAPI(songQuery, spotifyApi);
            res.status(200).send({
                results
            });
        }
        else {
            res.status(409).send({
                "Error": "Error, invalid or missing song/artist data"
            });
        }
    }
    

    
});

router.get('/recommend', async (req, res) => {
    var spotifyApi = await auth.authorizeAccess();
    var results;

    try {
        if (req.body.songID == undefined || req.body.artistID == undefined) throw error

        results = await query.queryRecommendationAPI(spotifyApi, req.body.songID, req.body.artistID);
    } catch(err) {
        console.log("Error, invalid or missing song/artist data");
    }
});


module.exports = router;