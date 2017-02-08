
module.exports = function (viewName) {

    return function (req, res) {

        res.write('<iframe src="https://embed.spotify.com/?uri=spotify:album:' + res.tpl.albumid + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>');
        res.end();
    }

};