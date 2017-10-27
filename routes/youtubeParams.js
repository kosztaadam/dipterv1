var youtubeAuth = require('../middleware/auth/youtubeAuth');
var youtubeSearch = require('../middleware/artist/youtube/youtubeSearch');
var youtubeGetByID = require('../middleware/artist/youtube/youtubeGetByID');
var youtubeRender = require('../middleware/artist/youtube/youtubeRender');

var lastFmSearchAlbumMW = require('../middleware/album/lastFm/searchAlbum');
var lastFmAuthMW = require('../middleware/auth/lastFmAuth');

var lastFmSearchTrackMW = require('../middleware/track/lastFm/searchTrack');

module.exports = function (app) {

    /**
     * Alap eloado lekerdezese Youtuben
     */

    app.get('/youtube/:artist', function (req, res, next) {
            console.log(req.params.artist);
            res.tpl.artist = req.params.artist;
            return next();
        },
        youtubeAuth(),
        youtubeSearch(),
        youtubeGetByID(),
        youtubeRender()
    );

    app.get('/youtube/album/:artist/:album', function (req, res, next) {
            res.tpl.artist = req.params.artist;
            res.tpl.album = req.params.album;
            return next();
        },
        youtubeAuth(),
        youtubeSearch(),
        youtubeGetByID(),
        youtubeRender()
    );


    app.get('/youtube/album/:album', function (req, res, next) {
            res.tpl.album = req.params.album;
            return next();
        },
        lastFmAuthMW(),
        lastFmSearchAlbumMW(),
        youtubeAuth(),
        youtubeSearch(),
        youtubeGetByID(),
        youtubeRender()
    );

    app.get('/youtube/track/:artist/:track', function (req, res, next) {
            res.tpl.track = req.params.track;
            return next();
        },
        youtubeAuth(),
        youtubeSearch(),
        youtubeGetByID(),
        youtubeRender()
    );


    app.get('/youtube/track/:track', function (req, res, next) {
            res.tpl.artist = req.params.artist;
            res.tpl.track = req.params.track;
            return next();
        },
        lastFmAuthMW(),
        lastFmSearchTrackMW(),
        youtubeAuth(),
        youtubeSearch(),
        youtubeGetByID(),
        youtubeRender()
    );


};