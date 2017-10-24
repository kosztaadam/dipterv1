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

    app.get('/json/artist/:artist', function (req, res, next) {
            res.tpl.artist = req.params.artist;
            res.tpl.limit = 3;
            res.tpl.deep = 3;
            return next();
        },
        authMW(),
        getArtistInfoMW(),
        getTopAlbumMW(),
        getTopTracksMW(),
        getSimilarMW(),
        renderMW()
    );

    app.get('/json/album/:artist/:album', function (req, res, next) {
            res.tpl.album = req.params.album;
            res.tpl.artist = req.params.artist;
            res.tpl.limit = 3;
            res.tpl.deep = 3;
            return next();
        },
        authMW(),
        getAlbumInfoMW(),
        renderMW()
    );

    app.get('/json/album/:album', function (req, res, next) {
            res.tpl.album = req.params.album;
            res.tpl.limit = 3;
            res.tpl.deep = 3;
            return next();
        },
        authMW(),
        searchAlbumMW(),
        getAlbumInfoMW(),
        renderMW()
    );


};