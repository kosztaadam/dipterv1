/**
 * Created by Koszta Ádám on 2017. 02. 08..
 */

module.exports = function () {

    return function (req, res, next) {

        var spotifyApi = res.tpl.spotifyApi;

        spotifyApi.getArtistAlbums(res.tpl.artistid, {limit: 50}, function (err, data) {
            if (err) {
                console.error('Something went wrong!');
                return next();
            } else {

                let i = 0;

                while (data.body.items[i].name.indexOf(res.tpl.album) === -1 && i < 50) {
                    console.log(data.body.items[i].name);
                    console.log(data.body.items[i].name.indexOf(res.tpl.album));
                    console.log(res.tpl.album);
                    console.log("*-*-*-*-*-*-*");
                    i++;
                }

                console.log(data.body.items[i].name);
                res.tpl.albumid = data.body.items[i].id;

                return next();
            }
        });
    }

};