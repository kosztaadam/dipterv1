/**
 * Created by Koszta Ádám on 2017. 02. 08..
 */

var spotifyGetArtistTopTrack = require('../middleware/artist/spotify/spotifyGetArtistTopTrack');
var spotifyAuth = require('../middleware/auth/spotifyAuth');
var spotifySearchItem = require('../middleware/artist/spotify/spotifySearchItem');
var spotifyRender = require('../middleware/artist/spotify/spotifyRender');
var spotifyGetArtistAlbums = require('../middleware/artist/spotify/spotifyGetArtistAlbums');
var spotifyGetArtist = require('../middleware/artist/spotify/spotifyGetArtist');

var lastFmSearchAlbumMW = require('../middleware/album/lastFm/searchAlbum');
var lastFmAuthMW = require('../middleware/auth/lastFmAuth');
var spotifyGetAlbums = require('../middleware/album/spotify/spotifyGetArtistAlbums');
var spotifyGetAlbum = require('../middleware/album/spotify/spotifyGetAlbum');

var spotifyAlbumRender = require('../middleware/album/spotify/spotifyAlbumRender');

var getTrackInfoMW = require('../middleware/track/spotify/spotifyGetTrack');
var spotifySearchTrack = require('../middleware/track/spotify/spotifySearchArtistTrack');
var lastFmSearchTrackMW = require('../middleware/track/lastFm/searchTrack');


module.exports = function (app) {

    /**
     * Alap eloado lekerdezese Spotifyn
     */

    app.get('/spotify/:artist', function (req, res, next) {
            //res.tpl.artist = "The Killers";
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
        spotifyGetAlbums(),
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
        spotifyGetAlbums(),
        function (req, res, next) {
            if (res.tpl.albumid === undefined || res.tpl.playlistid !== undefined) {

                var result = JSON.stringify({
                    'albumID': res.tpl.playlistid,
                    'details': res.tpl.details,
                    'playlist': true
                });

                res.status(200).json(result);

            } else {
                return next();
            }
        },
        spotifyGetAlbum(),
        spotifyAlbumRender()
    );

    /**
     * Szam lekerdezese Spotifyn
     */

    app.get('/spotify/track/:artist/:track', function (req, res, next) {
            res.tpl.track = req.params.track;
            res.tpl.artist = req.params.artist;
            return next();
        },
        spotifyAuth(),
        spotifySearchTrack(),
        getTrackInfoMW(),
        spotifyRender()
    );

    /**
     * Szam lekerdezese Spotifyn
     */

    app.get('/spotify/track/:track', function (req, res, next) {
            res.tpl.track = req.params.track;
            return next();
        },
        lastFmAuthMW(),
        lastFmSearchTrackMW(),
        spotifyAuth(),
        spotifySearchTrack(),
        getTrackInfoMW(),
        spotifyRender()
    );

};