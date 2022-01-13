const { error } = require('console');
const express = require('express');
const router = express.Router();
const url = require('url');
const auth = require("../public/js/auth.js");
const query = require("../public/js/query.js");

router.get('/', (req, res) => {
    res.status(200).send({
        test: "PING!"
    });
});


router.get('/search', async (req, res) => {
    var songQuery;
    var spotifyApi;
    var results;
    var debugging = "start";

    try {
        if (req.query.song == undefined || req.query.artist == undefined) throw new Error("invalid or missing song/artist data");

        spotifyApi = await auth.authorizeAccess();
        debugging += ":=:ApiHit";
        songQuery = await query.createQuery(req.query.song, req.query.artist);
        debugging += ":=:QueryHit";
        results = await query.querySongAPI(songQuery, spotifyApi);
        debugging += ":=:ResultsHit";

        res.status(200).send({
            results
        });

    } catch(err) {
        if (err.message != "") {
            res.status(409).send({
                "Error": err.message,
                "Debug": debugging
            });
        } else {
            res.status(409).send({
                "Error": err,
                "Debug": debugging
            });
        }
        
    }

});

router.get('/recommend', async (req, res) => {
    var results;
    var spotifyApi;

    try {
        if (req.query.artistID == undefined) throw new Error("ArtistID must be defined!");

        spotifyApi = await auth.authorizeAccess();
        results = await query.queryRecommendationAPI(spotifyApi, req.query.songID, req.query.artistID, req.query.key, req.query.bpm);
        res.status(200).send({
            results
        });
    } catch(err) {
        if (err.message != undefined) {
            res.status(409).send({
                "Error": err.message,
                "Debug": "test"
            });
        } else {
            res.status(409).send({
                "Error": err,
                "Debug": "Test"
            });
        }
    }
});


module.exports = router;