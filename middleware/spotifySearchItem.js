/**
 * Created by Koszta Ádám on 2017. 02. 08..
 */

var requestify = require('requestify');

module.exports = function () {

    return function(req, res, next) {

        requestify.get('https://api.spotify.com/v1/search?q=' + res.tpl.artist + '&type=artist').then(function(response) {
            // Get the response body (JSON parsed - JSON response or jQuery object in case of XML response)
            res.tpl.artistid = response.getBody().artists.items[0].id;

            return next();
        });
    }
};