/**
 * Artist info
 * http://www.last.fm/api/show/artist.getInfo
 *
 * @returns {Function}
 */

module.exports = function () {

    return function (req, res, next) {

        var tagName = res.tpl.tag;
        var limit = 5;

        console.log(tagName);

        var topArtistsList = [];

        lfm = res.tpl.lfm;

        lfm.tag.getTopArtists({
            'tag': tagName,
            'limit' : 5
        }, function (err, topArtists) {
            if (err) {
                return console.log('We\'re in trouble in getTagTopArtists', err);
            }

            for(var i = 0; i < limit; i++) {
                topArtistsList.push(topArtists.artist[i].name);
            }

            res.tpl.topArtistsList = topArtistsList;

            return next();
        });

    };

};