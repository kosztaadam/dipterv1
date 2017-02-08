/**
 * Created by Koszta Ádám on 2017. 02. 08..
 */

module.exports = function () {

    return function(req, res, next) {

        var spotifyApi = res.tpl.spotifyApi;

        console.log(res.tpl.artistid);

        spotifyApi.getArtistTopTracks(res.tpl.artistid, 'HU', function (err, data) {
            if (err) {
                console.error('Something went wrong!');
                return next();
            } else {
                console.log(data.body);
                res.tpl.trackid = data.body.tracks[0].id;

                return next();
            }
        });
    }

};