/**
 * Created by Koszta Ádám on 2017. 02. 08..
 */

module.exports = function () {

    return function (req, res, next) {

        var spotifyApi = res.tpl.spotifyApi;

        // Get an artist
        spotifyApi.getArtist(res.tpl.artistid)
            .then(function (data) {
                console.log("------");
                console.log('Artist information', data.body);
                res.tpl.details = data.body;

                return next();
            }, function (err) {
                console.error(err);
                return next();
            });
    }

};