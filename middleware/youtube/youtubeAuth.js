/**
 * Created by Koszta Ádám on 2017. 10. 13..
 */

var YouTube = require('youtube-node');

module.exports = function () {

    return function (req, res, next) {

        var youTube = new YouTube();

        youTube.setKey('AIzaSyC4dLnj2j-As3AAHMh2RtVzZIbyMY3UsDs');

        res.tpl.youTube = youTube;

        return next();
    }
};