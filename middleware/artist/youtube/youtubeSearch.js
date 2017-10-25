/**
 * Created by Koszta Ádám on 2017. 10. 13..
 */

module.exports = function () {

    return function (req, res, next) {

        var limit = 20;

        var searchItem = res.tpl.artist;

        if(res.tpl.album !== undefined) {
            searchItem += " " + res.tpl.album;
        }

        res.tpl.youTube.search(searchItem, limit, function (error, result) {
            if (error) {
                console.log(error);
            }
            else {
                //console.log(JSON.stringify(result, null, 2));
                res.tpl.youtubeDetails = JSON.parse(JSON.stringify(result));

                var offset = 0;

                res.tpl.trackid = res.tpl.youtubeDetails.items[offset].id.videoId;

                if (res.tpl.trackid !== undefined) {
                    return next();
                }

                while (res.tpl.trackid === undefined) {
                    res.tpl.trackid = res.tpl.youtubeDetails.items[offset].id.videoId;
                    //console.log("while");
                    offset++;
                    if (offset === limit || res.tpl.trackid !== undefined) {
                        return next();
                    }
                }
            }
        });
    }
};