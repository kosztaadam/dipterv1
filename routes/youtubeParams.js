var youtubeAuth = require('../middleware/youtube/youtubeAuth');
var youtubeSearch = require('../middleware/youtube/youtubeSearch');
var youtubeGetTrackID = require('../middleware/youtube/youtubeGetTrackID');
var youtubeRender = require('../middleware/youtube/youtubeRender');

module.exports = function (app) {

    /**
     * Alap eloado lekerdezese Youtuben
     */

    app.get('/youtube/:artist', function (req, res, next) {
            console.log("Youtube");
            console.log(req.params.artist);
            res.tpl.artist = req.params.artist;
            return next();
        },
        youtubeAuth(),
        youtubeSearch(),
        youtubeRender()
    );

};