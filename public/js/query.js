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

exports.queryRecommendationAPI = async function(spotifyApi, songID, artistID) {
    return new Promise(async function (resolve, reject) {
        
        
        resolve();
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



async function getRecommendation() {
    spotifyApi.getRecommendations({
            min_energy: 0.4,
            seed_artists: ['6mfK6Q2tzLMEchAr0e9Uzu', '4DYFVNKZ1uixa6SQTvzQwJ'],
            min_popularity: 50
        })
        .then(function(data) {
            var recommendations = data.body;
            console.log(recommendations);
        }, function(err) {
            console.log("Something went wrong!", err);
    });
}