const { response } = require('express');
const { token } = require('morgan');
const request = require('request');
const SpotifyWebApi = require('spotify-web-api-node');
const aws = require('aws-sdk');
// try {
//     const config = require('../../../config.json');
//     const clientID = config.ID;
//     const clientSecret = config.Secret;
//     var str = clientID + ':' + clientSecret;
// } catch(err) {
//     continue;
// }




exports.authorizeAccess = async function () {
    var token;
    var s3 = new aws.S3({
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret
    });
    const clientID = s3.clientID;
    const clientSecret = s3.clientSecret;
    var str = clientID + ':' + clientSecret;
    
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
        var token = await getAccess(authOptions);
        console.log("AUTH: " + token);
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
                console.log("err: " + error);
                reject(error);
            }
        });
    });
}




