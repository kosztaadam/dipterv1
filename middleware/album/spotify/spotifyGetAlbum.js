/**
 * Created by Koszta Ádám on 2017. 02. 08..
 */

module.exports = function () {

    return function(req, res, next) {

        var spotifyApi = res.tpl.spotifyApi;

        spotifyApi.getAlbum(res.tpl.albumid, 'HU', function (err, data) {
            if (err) {
                console.error('Something went wrong!');
                return next();
            } else {
               // console.log(data.body);
                res.tpl.details = JSON.stringify(data.body);

                return next();
            }
        });
    }

};