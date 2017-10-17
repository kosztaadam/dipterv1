/**
 * Created by Koszta Ádám on 2017. 02. 08..
 */

var spotifyGetArtistTopTrack = require('../middleware/spotify/spotifyGetArtistTopTrack');
var spotifyAuth = require('../middleware/spotify/spotifyAuth');
var spotifySearchItem = require('../middleware/spotify/spotifySearchItem');
var spotifyRender = require('../middleware/spotify/spotifyRender');
var spotifyGetArtistAlbums = require('../middleware/spotify/spotifyGetArtistAlbums');
var spotifyGetArtist = require('../middleware/spotify/spotifyGetArtst');

module.exports = function (app) {

    /**
     * Alap eloado lekerdezese Spotifyn
     */

    app.get('/spotify/:artist', function (req, res, next) {
            //res.tpl.artist = "The Killers";
            console.log("Spotify");
            console.log(req.params.artist);
            res.tpl.artist = req.params.artist;
            return next();
        },
        spotifyAuth(),
        spotifySearchItem(),
        spotifyGetArtist(),
        spotifyGetArtistTopTrack(),
        spotifyGetArtistAlbums(),
        spotifyRender()
    );

};