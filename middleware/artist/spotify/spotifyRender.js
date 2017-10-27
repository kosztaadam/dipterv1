module.exports = function (viewName) {

    return function (req, res) {

        //var response = '<iframe src="https://embed.spotify.com/?uri=spotify:album:' + res.tpl.albumid + '" width="300" height="100" frameborder="0" allowtransparency="true"></iframe>';

        console.log(res.tpl.artist);
        console.log(res.tpl.track);

        var result = JSON.stringify({
            'trackID': res.tpl.trackid,
            'details': res.tpl.details
        });

        res.status(200).json(result);

        //res.write('<iframe src="https://embed.spotify.com/?uri=spotify:album:' + res.tpl.albumid + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>');
        //res.end();
    }

};