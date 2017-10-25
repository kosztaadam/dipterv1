/**
 * Artist info
 * http://www.last.fm/api/show/artist.getInfo
 *
 * @returns {Function}
 */

module.exports = function () {

    return function (req, res, next) {

        var albumName = res.tpl.album;
        var artistName = res.tpl.artist;

        lfm = res.tpl.lfm;

        lfm.album.getInfo({
            'artist': artistName,
            'album': albumName

        }, function (err, album) {
            if (err) {
                return console.log('We\'re in trouble in getAlbumInfo', err);
            }

            res.tpl.albumDetails = JSON.stringify(album);
            res.tpl.albumImage = album.image[3]['#text'];
            res.tpl.albumListeners = album.listeners;
            res.tpl.albumPlayCount = album.playcount;
            res.tpl.albumTracks = JSON.stringify(album.tracks.track);
            res.tpl.albumTags = JSON.stringify(album.tags.tag);
            if (album.wiki !== undefined) {
                res.tpl.wiki = album.wiki.summary;
            }

            return next();
        });

    };

};