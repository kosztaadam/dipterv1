/**
 * Created by Koszta Ádám on 2017. 02. 08..
 */

module.exports = function () {

    return function (req, res, next) {

        var spotifyApi = res.tpl.spotifyApi;
        var limit = 50;

        spotifyApi.getArtistAlbums(res.tpl.artistid, {limit: limit}, function (err, data) {
            if (err) {
                console.error('Something went wrong!');
                return next();
            } else {
                let i = 0;

                while (data.body.items[i].name.indexOf(res.tpl.album) === -1 && i < (limit - 1)) {
                    console.log(data.body.items[i].name);
                    console.log(res.tpl.album);
                    console.log("*-*-*-*-*-*-*");
                    i++;
                }

                if (data.body.items[i + 1] !== undefined) {
                    console.log(data.body.items[i].name);
                    res.tpl.albumid = data.body.items[i].id;
                    return next();
                } else {

                    // Search playlists whose name or description contains 'workout'
                    spotifyApi.searchPlaylists(res.tpl.artist + " " + res.tpl.album, {limit: 1})
                        .then(function (data) {

                            console.log('Found playlists are', data.body);
                            res.tpl.playlistid = data.body.playlists.items[0].external_urls.spotify;

                            return next();

                        }, function (err) {

                            console.log('Something went wrong!', err);
                            return next();

                        });
                }
            }
        });
    }

};