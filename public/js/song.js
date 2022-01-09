const keyMap = new Map([
    [0, 'C'],
    [1, 'C#'],
    [2, 'D'],
    [3, 'D#'],
    [4, 'E'],
    [5, 'F'],
    [6, 'F#'],
    [7, 'G'],
    [8, 'G#'],
    [9, 'A'],
    [10, 'A#'],
    [11, 'B'],
]);

module.exports = class Song {
    constructor(songName, songID, artists, artistID, albumImage, duration, key, tempo, mode) {
        this.songName = songName;
        this.artists = artists;
        this.key = keyMap.get(key);
        this.mode = this.modeToString(mode); // Minor 0, Major 1
        this.tempo = tempo;
        this.duration = duration;
        this.songID = songID;
        this.artistID = artistID;
        this.albumImage = albumImage;
        
    }

    modeToString(mode) {
        return (mode == 1) ? "major" : "minor";
    }

    
}