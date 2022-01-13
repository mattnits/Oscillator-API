const Song = require('./song');

exports.createQuery = async function(song, artist) {
    var queryString;
    return new Promise(async function (resolve, reject) {
        if (song === "" && artist === "")  {
            console.log("Error, no artists selected")
            return;
        }
        else if (song === "" && artist !== "") {
            queryString = "artist: " + artist;
        }
        else if (artist === "" && song !== "") {
            queryString = "track: " + song;
        }
        else {
            queryString = "track: " + song + " artist: " + artist;
        }
        resolve(queryString);
    });
}

exports.querySongAPI = async function (queryString, spotifyApi) {
    songArray = [];

    //spotifyApi.searchTracks(queryString, { limit : 5, offset : 1 })
    return new Promise(async function (resolve, reject) {
        songInfo = await getAudioInformation(spotifyApi, queryString);

        for (i = 0; i < songInfo.length; i++) {
            var songFeats = await getAudioFeatures(spotifyApi, songInfo[i]);
            var newSong = await filterSongs(songInfo[i], songFeats);
            songArray.push(newSong); 
        }
        
        resolve(songArray);
    });
}

exports.queryRecommendationAPI = async function(spotifyApi, songID, artistID, key, bpm) {
    var sID = "", aID = "", recQuery, songArray = [];

    if (songID != undefined) sID = songID;
    if (artistID != undefined) aID = artistID;

    return new Promise(async function (resolve, reject) {
        try {
            recQuery = await buildRecommendationQuery(songID, artistID, key, bpm);
            songInfo = await getRecommendations(spotifyApi, recQuery);

            for (i = 0; i < songInfo.length; i++) {
                var songFeats = await getAudioFeatures(spotifyApi, songInfo[i]);
                var newSong = await filterSongs(songInfo[i], songFeats);
                songArray.push(newSong); 
            }
            resolve(songArray);
        } catch(err) {
            reject(err);
        }
    });
}

async function getAudioInformation(spotifyApi, queryString) {
    return new Promise(async function (resolve, reject) {
        spotifyApi.searchTracks(queryString)
            .then(function(data) {
                resolve(data.body.tracks.items);
            }, function(err) {
                console.log('Something went wrong!', err);
                reject(err);
            });
    });
}

async function getAudioFeatures(spotifyApi, songInfo) {

    return new Promise(function (resolve, reject) {
        spotifyApi.getAudioFeaturesForTrack(songInfo.id)
            .then(function(data) {
                resolve(data.body);
            }, function(err) {
                reject(err);
            });
    });
    
}

async function filterSongs(song, songFeats) {
    var songName, songID, artists = [], artistsID = [], albumImage, duration, key, tempo, mode;

    return new Promise(function (resolve, reject) {
        albumImage = song.album.images[0].url;

        
        song.artists.forEach(artist => artists.push(artist.name));
        song.artists.forEach(artist => artistsID.push(artist.id));
        duration = Math.round(song.duration_ms/1000);
        songID = song.id;
        songName = song.name;
        key = songFeats.key;
        tempo = Math.round(songFeats.tempo * 10) / 10
        mode = songFeats.mode;

        var newSong = new Song(songName, songID, artists, artistsID, albumImage, duration, key, tempo, mode);
        resolve(newSong);
    });
    
}



async function getRecommendations(spotifyApi, recQuery) {

    return new Promise(function (resolve, reject) {
        spotifyApi.getRecommendations(recQuery)
        .then(function(data) {
            resolve(data.body.tracks);
        }, function(err) {
            reject("Problem obtaining recommendations from Spotify API");
    });


    });
    
}

async function buildRecommendationQuery(songID = null, artistID, key = null, bpm = null) {
    var target_key = null, target_tempo = null, seed_song = [songID], seed_artists = [artistID];
    var query = {};


    if (key != null && key != undefined) {
        target_key = parseInt(key);
    }
    if (bpm != null && bpm != undefined) {
        target_tempo = parseInt(bpm);
    }

    query = await addToQuery(query, "seed_song", seed_song);
    query = await addToQuery(query, "seed_artists", seed_artists);
    query = await addToQuery(query, "target_key", target_key);
    query = await addToQuery(query, "target_tempo", target_tempo);

    return new Promise(function (resolve, reject) {
        resolve(query);
    });

}

async function addToQuery(query, identifier, value) {
    if (value != null) {
        query[identifier] = value;
    }

    return new Promise(function (resolve, reject) {
        resolve(query);
    });
}