
module.exports = function (viewName) {

    return function (req, res) {

        res.write('<iframe src="https://embed.spotify.com/?uri=spotify:track:' + res.tpl.trackid + '" frameborder="0" allowtransparency="true"></iframe>');
        res.end();
    }

};