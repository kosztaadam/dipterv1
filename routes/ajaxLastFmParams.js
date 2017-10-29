/**
 * Created by Koszta Ádám on 2016. 11. 23..
 */

var authMW = require('../middleware/auth/lastFmAuth');
var getSimilarMW = require('../middleware/artist/lastFm/getSimilar');
var getArtistInfoMW = require('../middleware/artist/lastFm/getArtistInfo');
var getTopAlbumMW = require('../middleware/artist/lastFm/getTopAlbum');
var getTopTracksMW = require('../middleware/artist/lastFm/getTopTracks');

var getAlbumInfoMW = require('../middleware/album/lastFm/getAlbumInfo');
var searchAlbumMW = require('../middleware/album/lastFm/searchAlbum');

var searchTrackMW = require('../middleware/track/lastFm/searchTrack');
var getTrackInfoMW = require('../middleware/track/lastFm/getTrackInfo');
var getSimilarTrackMW = require('../middleware/track/lastFm/getSimilarTrack');

var getTagTopArtistMW = require('../middleware/tag/lastFm/getTopArtists');
var getTagInfoMW = require('../middleware/tag/lastFm/getTag');
var getTagTopTracksMW = require('../middleware/tag/lastFm/getTopTracks');
var getSimilarTagMW = require('../middleware/tag/lastFm/getSimilarTag');


var renderMW = require('../middleware/render');


module.exports = function (app) {

    app.get('/html/artist/:artist', function (req, res, next) {
            res.tpl.artist = req.params.artist;
            res.tpl.limit = 3;
            res.tpl.deep = 1;
            return next();
        },
        authMW(),
        getArtistInfoMW(),
        getTopAlbumMW(),
        getTopTracksMW(),
        getSimilarMW(),
        renderMW('artistInfo')
    );

    /*
     Artist
     */

    app.get('/json/artist/:artist', function (req, res, next) {
            res.tpl.artist = req.params.artist;
            res.tpl.limit = 3;
            res.tpl.deep = 2;
            return next();
        },
        authMW(),
        getArtistInfoMW(),
        getTopAlbumMW(),
        getTopTracksMW(),
        getSimilarMW(),
        renderMW()
    );

    app.get('/json/artist/:artist/:similar/:depth', function (req, res, next) {
            res.tpl.artist = req.params.artist;
            res.tpl.limit = req.params.similar;
            res.tpl.deep = req.params.depth;
            return next();
        },
        authMW(),
        getArtistInfoMW(),
        getTopAlbumMW(),
        getTopTracksMW(),
        getSimilarMW(),
        renderMW()
    );

    /*
     Album
     */

    app.get('/json/album/:artist/:album', function (req, res, next) {
            res.tpl.album = req.params.album;
            res.tpl.artist = req.params.artist;
            res.tpl.limit = 3;
            res.tpl.deep = 2;
            return next();
        },
        authMW(),
        getAlbumInfoMW(),
        renderMW()
    );

    app.get('/json/album/:album', function (req, res, next) {
            res.tpl.album = req.params.album;
            res.tpl.limit = 3;
            res.tpl.deep = 2;
            return next();
        },
        authMW(),
        searchAlbumMW(),
        getAlbumInfoMW(),
        renderMW()
    );

    /*
     Track
     */

    app.get('/json/track/:track', function (req, res, next) {
            res.tpl.track = req.params.track;
            res.tpl.limit = 3;
            res.tpl.deep = 2;
            return next();
        },
        authMW(),
        searchTrackMW(),
        getTrackInfoMW(),
        getSimilarTrackMW(),
        renderMW()
    );

    app.get('/json/track/:track/:similar/:depth', function (req, res, next) {
             //console.log("csak track similar depth");

            res.tpl.track = req.params.track;
            res.tpl.limit = req.params.similar;
            res.tpl.deep = req.params.depth;
            return next();
        },
        authMW(),
        searchTrackMW(),
        getTrackInfoMW(),
        getSimilarTrackMW(),
        renderMW()
    );

    app.get('/json/track/:artist/:track', function (req, res, next) {
            // console.log("artist track");
            res.tpl.track = req.params.track;
            res.tpl.artist = req.params.artist;

            res.tpl.limit = 3;
            res.tpl.deep = 2;
            return next();
        },
        authMW(),
        getTrackInfoMW(),
        getSimilarTrackMW(),
        renderMW()
    );

    app.get('/json/track/:artist/:track/:similar/:depth', function (req, res, next) {
            //  console.log("artist track similar depth");
            res.tpl.track = req.params.track;
            res.tpl.artist = req.params.artist;
            res.tpl.limit = req.params.similar;
            res.tpl.deep = req.params.depth;
            return next();
        },
        authMW(),
        getTrackInfoMW(),
        getSimilarTrackMW(),
        renderMW()
    );

    /*
     Cimke, tag
     */

    app.get('/json/tag/:tag', function (req, res, next) {
            res.tpl.tag = req. params.tag;
            res.tpl.limit = 3;
            res.tpl.deep = 2;
            return next();
        },
        authMW(),
        getTagInfoMW(),
        getTagTopArtistMW(),
        getTagTopTracksMW(),
        getSimilarTagMW(),
        renderMW()
    );

    app.get('/json/tag/:tag/:similar/:depth', function (req, res, next) {
            res.tpl.tag = req. params.tag;
            res.tpl.limit = req.params.similar;
            res.tpl.deep = req.params.depth;
            return next();
        },
        authMW(),
        getTagInfoMW(),
        getTagTopArtistMW(),
        getTagTopTracksMW(),
        getSimilarTagMW(),
        renderMW()
    );

};