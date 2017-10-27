/**
 * Created by Koszta Ádám on 2017. 02. 08..
 */

//var requestify = require('requestify');

module.exports = function () {

    return function (req, res, next) {

        console.log(res.tpl.track + " " + res.tpl.artist);

        // Search tracks whose artist's name contains 'Kendrick Lamar', and track name contains 'Alright'
        res.tpl.spotifyApi.searchTracks('track:' + res.tpl.track + " " +'artist:' + res.tpl.artist, {limit: 1, offset: 0})
            .then(function (data) {
                console.log('Search track name and artist name', data.body.tracks.items[0].id);
                res.tpl.trackid = data.body.tracks.items[0].id;
                return next();
            }, function (err) {
                console.log('Something went wrong!', err);
                return next();
            });

    }
};