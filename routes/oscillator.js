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
        if (req.body.song == undefined || req.body.artist == undefined) throw new Error("invalid or missing song/artist data");

        spotifyApi = await auth.authorizeAccess();
        debugging += ":=:ApiHit";
        songQuery = await query.createQuery(req.body.song, req.body.artist);
        debugging += ":=:QueryHit";
        results = await query.querySongAPI(songQuery, spotifyApi);
        debugging += ":=:ResultsHit";

        res.status(200).send({
            results
        });


    } catch(err) {
        console.log(err);
        res.status(409).send({
            "Error": err.message,
            "Debug": debugging
        });
    }
    

    
});

router.get('/recommend', async (req, res) => {
    var spotifyApi = await auth.authorizeAccess();
    var results;

    try {
        if (req.body.songID == undefined || req.body.artistID == undefined) throw error

        results = await query.queryRecommendationAPI(spotifyApi, req.body.songID, req.body.artistID);
    } catch(err) {
        // console.log("Error, invalid or missing song/artist data");
    }
});


module.exports = router;