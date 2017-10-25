/**
 * Artist info
 * http://www.last.fm/api/show/artist.getInfo
 *
 * @returns {Function}
 */

module.exports = function () {

    return function (req, res, next) {

        var albumName = res.tpl.album;

        lfm = res.tpl.lfm;

        lfm.album.search({
            'album': albumName,
            'limit': 1
        }, function (err, album) {
            if (err) {
                return console.log('We\'re in trouble in searchAlbum', err);
            }

            res.tpl.album = album.albummatches.album[0].name;
            res.tpl.artist = album.albummatches.album[0].artist;

            return next();
        });

    };

};