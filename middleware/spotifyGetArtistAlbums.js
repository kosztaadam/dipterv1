/**
 * Created by Koszta Ádám on 2017. 02. 08..
 */

module.exports = function () {

    return function(req, res, next) {

        var spotifyApi = res.tpl.spotifyApi;

        spotifyApi.getArtistAlbums(res.tpl.artistid, {limit: 1}, function (err, data) {
            if (err) {
                console.error('Something went wrong!');
                return next();
            } else {
                //console.log(data.body);
                //console.log(data.body.items[0].id);
                res.tpl.albumid = data.body.items[0].id;

                return next();
            }
        });
    }

};