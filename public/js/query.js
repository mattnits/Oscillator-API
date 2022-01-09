
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
    console.log(queryString);
    //spotifyApi.searchTracks(queryString, { limit : 5, offset : 1 })
    return new Promise(async function (resolve, reject) {
        spotifyApi.searchTracks(queryString)
        .then(function(data) {
            console.log('Results: ', data.body);
            resolve(data.body);
        }, function(err) {
            console.log('Something went wrong!', err);
            reject(err);
        });
    })

    

}