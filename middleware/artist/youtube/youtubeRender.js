module.exports = function (viewName) {

    return function (req, res) {

        //var response = '<iframe src="https://embed.spotify.com/?uri=spotify:album:' + res.tpl.albumid + '" width="300" height="100" frameborder="0" allowtransparency="true"></iframe>';

        var result = JSON.stringify({
            'trackid': res.tpl.trackid,
            'tags': res.tpl.genres,
            'statistics': res.tpl.stat
        });

       // console.log(result);
        res.status(200).json(result);

        //res.write('<iframe src="https://embed.spotify.com/?uri=spotify:album:' + res.tpl.albumid + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>');
        //res.end();
    }

};