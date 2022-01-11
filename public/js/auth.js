const { response } = require('express');
const { token } = require('morgan');
const request = require('request');
const SpotifyWebApi = require('spotify-web-api-node');
const aws = require('aws-sdk');

exports.authorizeAccess = async function () {
    var token;
    var clientID;
    var clientSecret;
    var str; 

    try {
        var s3 = new aws.S3({
            clientID: process.env.clientID,
            clientSecret: process.env.clientSecret
        });
        clientID = s3.clientID;
        clientSecret = s3.clientSecret;
        str = clientID + ':' + clientSecret;
    } catch(err) {
        const config = require('../../../config.json');
        clientID = config.ID;
        clientSecret = config.Secret;
        str = clientID + ':' + clientSecret;
    }
    
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(str).toString('base64')
        },
        form: {
          grant_type: 'client_credentials'
        },
        json: true
    };

    return new Promise(async function (resolve, reject) {

        try {
            var token = await getAccess(authOptions);
        } catch(err) {
            reject(err + clientID);
        }
        
        var spotifyApi = new SpotifyWebApi({
            clientId: clientID,
            clientSecret: clientSecret,
            redirectUri: 'http://localhost:3000/callback'
        });
        spotifyApi.setAccessToken(token);
        resolve(spotifyApi);
    });
    
}

async function getAccess(authOptions) {

    return new Promise(function (resolve, reject) {
        request.post(authOptions, async function(error, response, body)  {
            if (!error && response.statusCode === 200) {
                var token = body.access_token;
                resolve(token);
            }
            else {
                console.log("Error (getAccess): " + error);
                reject("Unable to connect to Spotify API. ID: ");
            }
        });
    });
}




