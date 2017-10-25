/**
 * Created by Koszta Ádám on 2017. 10. 13..
 */

module.exports = function () {

    return function (req, res, next) {

        res.tpl.youTube.getById(res.tpl.trackid, function(error, result) {
            if (error) {
                console.log(error);
                return next();
            }
            else {
                result = JSON.parse(JSON.stringify(result));

                res.tpl.genres = result.items[0].snippet.tags;
                res.tpl.stat = result.items[0].statistics;
                return next();
            }
        });
    }
};