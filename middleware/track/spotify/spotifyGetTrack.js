/**
 * Created by Koszta Ádám on 2017. 02. 08..
 */

module.exports = function () {

    return function (req, res, next) {

        var spotifyApi = res.tpl.spotifyApi;

        // Get an artist
        spotifyApi.getTrack(res.tpl.trackid)
            .then(function (data) {
                //console.log("------");
                //console.log('Track information', data.body);
                res.tpl.details = data.body;

                return next();
            }, function (err) {
                console.error(err);
                return next();
            });
    }

};