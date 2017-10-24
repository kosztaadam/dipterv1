/**
 * Created by Koszta Ádám on 2017. 02. 08..
 */
var SpotifyWebApi = require('spotify-web-api-node');

module.exports = function () {

    return function (req, res, next) {

        // credentials are optional
        var spotifyApi = new SpotifyWebApi({
            clientId: '347bc4f629c94b38b10b5637ee822a2d',
            clientSecret: '5e209a5161c14a44ab77f34c886c26a5',
            redirectUri: 'http://localhost:5000'
        });

        // Retrieve an access token
        spotifyApi.clientCredentialsGrant()
            .then(function (data) {
                console.log('The access token expires in ' + data.body['expires_in']);
                console.log('The access token is ' + data.body['access_token']);

                // Save the access token so that it's used in future calls
                spotifyApi.setAccessToken(data.body['access_token']);

                res.tpl.spotifyApi = spotifyApi;
                return next();
            }, function (err) {
                console.log('Something went wrong when retrieving an access token', err.message);
                return next();
            });
    }
};