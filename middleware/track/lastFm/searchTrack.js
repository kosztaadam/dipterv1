/**
 * Artist info
 * http://www.last.fm/api/show/artist.getInfo
 *
 * @returns {Function}
 */

module.exports = function () {

    return function (req, res, next) {

        var trackName = res.tpl.track;

        lfm = res.tpl.lfm;

        lfm.track.search({
            'track': trackName,
            'limit': 1
        }, function (err, track) {
            if (err) {
                return console.log('We\'re in trouble in searchTrack', err);
            }

            res.tpl.track = track.trackmatches.track[0].name;
            res.tpl.artist = track.trackmatches.track[0].artist;

            return next();
        });

    };

};