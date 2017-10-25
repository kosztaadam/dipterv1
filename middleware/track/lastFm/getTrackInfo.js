/**
 * Artist info
 * http://www.last.fm/api/show/artist.getInfo
 *
 * @returns {Function}
 */

module.exports = function () {

    return function (req, res, next) {

        var trackName = res.tpl.track;
        var artistName = res.tpl.artist;

        lfm = res.tpl.lfm;

        lfm.track.getInfo({
            'artist': artistName,
            'track': trackName

        }, function (err, track) {
            if (err) {
                return console.log('We\'re in trouble in getTrackInfo', err);
            }

            //res.tpl.trackDetails = JSON.stringify(track);

            res.tpl.duration = track.duration;
            res.tpl.listeners = track.listeners;
            res.tpl.playcount = track.playcount;
            res.tpl.image = track.album.image[3]['#text'];
            res.tpl.album = track.album.title;

            res.tpl.tags = JSON.stringify(track.toptags.tag);
            if (track.wiki !== undefined) {
                res.tpl.wiki = track.wiki.summary;
            }

            res.tpl.trackItem = track;

            return next();
        });

    };

};