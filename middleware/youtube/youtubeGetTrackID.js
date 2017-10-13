/**
 * Created by Koszta Ádám on 2017. 10. 13..
 */

module.exports = function () {

    return function (req, res, next) {

        console.log(res.tpl.youtubeDetails.items[0].id.videoId);
        res.tpl.trackid = res.tpl.youtubeDetails.items[0].id.videoId;

        return next();
    }
};