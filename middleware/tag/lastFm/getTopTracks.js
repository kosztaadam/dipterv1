/**
 * Created by Koszta Ádám on 2016. 05. 08..
 */

module.exports = function () {

    return function (req, res, next) {

        lfm = res.tpl.lfm;
        var limit = 1;
        var length = res.tpl.topArtistsList.length;

        function getTopTracks(artistName, callback) {
            lfm.artist.getTopTracks({
                'artist': artistName,
                'limit': limit

            }, function (err, topTrack) {
                if (err) {
                    console.log('We\'re in trouble in getTopTracks', err);
                    return;
                }

                return callback(topTrack.track);

            });
        }

        function addTopTracks(callback) {
            var topTrackList = [];
            var count = 0;

            for (var i = 0; i < length; i++) {
                getTopTracks(res.tpl.topArtistsList[i], function (res) {
                    topTrackList.push({
                        'artist' : res[0].artist.name,
                        'track' : res[0].name
                    });
                    count++;

                    if (count === length) {
                        callback(topTrackList);
                    }
                });
            }
        }

        addTopTracks(function (topTrackList) {
            res.tpl.topTagTracks = JSON.stringify(topTrackList);
            return next();
        });
    };

};