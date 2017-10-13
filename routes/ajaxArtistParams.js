/**
 * Created by Koszta Ádám on 2016. 11. 23..
 */

var authMW = require('../middleware/lastFm/auth');
var getSimilarMW = require('../middleware/lastFm/getSimilar');
var getArtistInfoMW = require('../middleware/lastFm/getArtistInfo');
var getTopAlbumMW = require('../middleware/lastFm/getTopAlbum');
var getTopTracksMW = require('../middleware/lastFm/getTopTracks');

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
        renderMW('artistGraph')
    );


};