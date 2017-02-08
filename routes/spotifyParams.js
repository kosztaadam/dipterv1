/**
 * Created by Koszta Ádám on 2017. 02. 08..
 */

var spotifyGetArtistTopTrack = require('../middleware/spotifyGetArtistTopTrack');
var spotifyAuth = require('../middleware/spotifyAuth');
var spotifySearchItem = require('../middleware/spotifySearchItem');
var spotifyRender = require('../middleware/spotifyRender');
var spotifyGetArtistAlbums = require('../middleware/spotifyGetArtistAlbums');

module.exports = function (app) {

    /**
     * Alap eloado lekerdezese Spotifyn
     */

    app.get('/spotify/',function (req, res, next) {
            res.tpl.artist = "The Killers";
            return next();
        },
        spotifyAuth(),
        spotifySearchItem(),
        spotifyGetArtistTopTrack(),
        spotifyGetArtistAlbums(),
        spotifyRender()
    );

};