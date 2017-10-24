/**
 * Created by Koszta Ádám on 2017. 02. 08..
 */

var spotifyGetArtistTopTrack = require('../middleware/artist/spotify/spotifyGetArtistTopTrack');
var spotifyAuth = require('../middleware/auth/spotifyAuth');
var spotifySearchItem = require('../middleware/artist/spotify/spotifySearchItem');
var spotifyRender = require('../middleware/artist/spotify/spotifyRender');
var spotifyGetArtistAlbums = require('../middleware/artist/spotify/spotifyGetArtistAlbums');
var spotifyGetArtist = require('../middleware/artist/spotify/spotifyGetArtst');

var lastFmSearchAlbumMW = require('../middleware/album/lastFm/searchAlbum');
var lastFmAuthMW = require('../middleware/auth/lastFmAuth');
var spotifyGetArtistAlbums = require('../middleware/album/spotify/spotifyGetArtistAlbums');
var spotifyGetAlbum = require('../middleware/album/spotify/spotifyGetAlbum');

var spotifyAlbumRender = require('../middleware/album/spotify/spotifyAlbumRender');

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


    /**
     * Album lekerdezese Spotifyn
     */

    app.get('/spotify/album/:artist/:album', function (req, res, next) {
            res.tpl.album = req.params.album;
            res.tpl.artist = req.params.artist;
            return next();
        },
        lastFmAuthMW(),
        lastFmSearchAlbumMW(),
        spotifyAuth(),
        spotifySearchItem(),
        spotifyGetArtist(),
        spotifyGetArtistAlbums(),
        spotifyGetAlbum(),
        spotifyAlbumRender()
    );

    /**
     * Album lekerdezese Spotifyn
     */

    app.get('/spotify/album/:album', function (req, res, next) {
            res.tpl.album = req.params.album;
            return next();
        },
        lastFmAuthMW(),
        lastFmSearchAlbumMW(),
        spotifyAuth(),
        spotifySearchItem(),
        spotifyGetArtist(),
        spotifyGetArtistAlbums(),
        spotifyGetAlbum(),
        spotifyAlbumRender()
    );


};