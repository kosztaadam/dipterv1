/**
 * Created by Koszta Ádám on 2017. 02. 08..
 */

var spotifyGetAlbum = require('../middleware/spotifyGetAlbum');
var spotifyAuth = require('../middleware/spotifyAuth');
var spotifySearchItem = require('../middleware/spotifySearchItem');
var spotifyRender = require('../middleware/spotifyRender');

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
        spotifyGetAlbum(),
        spotifyRender()
    );

};