/**
 * Created by Koszta Ádám on 2017. 02. 08..
 */

//var requestify = require('requestify');

module.exports = function () {

    return function (req, res, next) {

        // Search tracks whose artist's name contains 'Kendrick Lamar', and track name contains 'Alright'
        res.tpl.spotifyApi.searchTracks('genre:' + res.tpl.tag, {limit: 5, offset: 0})
            .then(function (data) {
               // console.log('Search track name and artist name', data.body.tracks.items);
                res.tpl.trackDetails = [];

                var length = data.body.tracks.items.length;

                for (var i = 0; i < length ; i++) {
                    res.tpl.trackDetails.push({
                        'artist': data.body.tracks.items[i].artists[0].name,
                        'track': data.body.tracks.items[i].name,
                        'trackID': data.body.tracks.items[i].id
                    })
                }
                //console.log(res.tpl.trackDetails);
                return next();
            }, function (err) {
                console.log('Something went wrong!', err);
                return next();
            });

    }
};