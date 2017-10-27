/**
 * Artist info
 * http://www.last.fm/api/show/artist.getInfo
 *
 * @returns {Function}
 */

module.exports = function () {

    return function (req, res, next) {

        var tagName = res.tpl.tag;

        lfm = res.tpl.lfm;

        lfm.tag.getInfo(tagName, 'en', function (err, tag) {
            if (err) {
                return console.log('We\'re in trouble in getTagInfo', err);
            }

            res.tpl.tag = tag.name;
            res.tpl.total = tag.total;
            res.tpl.reach = tag.reach;
            if (tag.wiki !== undefined) {
                res.tpl.wiki = JSON.stringify(tag.wiki.summary);
            }

            res.tpl.tagInfo = tag;

            return next();
        });

    };

};