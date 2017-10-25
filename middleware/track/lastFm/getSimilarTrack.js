var fs = require('fs');

module.exports = function () {

    /**
     * A hasonlo szamok lekerese
     * A track paramterbol jon
     */

    return function (req, res, next) {
        if (typeof res.tpl.trackItem == 'undefined') {
            return next();
        }

        var lfm = res.tpl.lfm;
        var deep;
        var limit;

        // Alap melyseg 2
        deep = res.tpl.deep || 2;

        // Alap limit 3
        limit = res.tpl.limit || 3;

        var mit = [];
        var nextmit = [];
        var alreadyProcessedNames = [];
        var hasonlolista = [];
        var group = 0;

        mit.push(res.tpl.trackItem);

        function getNextItem(finalcb) {
            var most = null;

            if (mit.length > 0) {
                most = mit.pop();
            } else {
                return finalcb();
            }

            //console.log("most: " + most.name);

            if (alreadyProcessedNames.indexOf(most.name) != -1) {
                setTimeout(function () {
                    getNextItem(finalcb);
                }, 0);
                return;
            }

            alreadyProcessedNames.push(most.name);

            var path;

            if(most.name.includes("'") || most.name.includes('"') || most.name.includes('/')) {
                var temp_most_name = most.name.replace("'", "_");
                temp_most_name = temp_most_name.replace('"', "_");
                temp_most_name = temp_most_name.replace('/', "_");
                path = './cache/track/' + temp_most_name + '_' + limit + '.json';
            }
            else
                path = './cache/track/' + most.name + '_' + limit + '.json';

            try {
                fs.accessSync(path, fs.F_OK);

                //console.log("cache: " + most.name);

                fs.readFile(path, 'utf8', function (err, data) {
                    if (err) {
                        console.log(err);
                        return next();
                    }
                    else {
                        var similarTracks = JSON.parse(data);

                        hasonlolista[most.name] = {};
                        hasonlolista[most.name].similarTrack = [];
                        hasonlolista[most.name].group = group;
                        similarTracks.forEach(function (item) {
                            nextmit.push(item);
                            hasonlolista[most.name].similarTrack.push(item);
                        });

                        return getNextItem(finalcb);
                    }
                });

            } catch (e) {
                // It isn't accessible
                //console.log("No cache");
                lfm.track.getSimilar({
                    'artist': res.tpl.artist,
                    'track': most.name,
                    'limit': limit

                }, function (err, similarTracks) {
                    if (err) {
                        return console.log('We\'re in trouble', err);
                    }

                    hasonlolista[most.name] = {};
                    hasonlolista[most.name].similarTrack = [];
                    hasonlolista[most.name].group = group;
                    similarTracks.track.forEach(function (item) {
                        nextmit.push(item);
                        //console.log(item);
                        hasonlolista[most.name].similarTrack.push(item);
                    });

                    var JSONObject = JSON.stringify(hasonlolista[most.name].similarTrack);

                    fs.writeFile(path, JSONObject, function (err) {
                        if (err) {
                            console.log(err);
                            return next();
                        }

                        return getNextItem(finalcb);
                    });
                });
            }
        }

        function goDeep(cb) {
            getNextItem(function () {
                //console.log("deep: " + deep);
                if (deep > 0) {
                    deep--;
                    mit = nextmit;
                    nextmit = [];
                    group++;
                    return goDeep(cb);
                } else {
                    return cb();
                }
            })
        }

        goDeep(function () {
            //ez itt a ki kihez lista

            var similarArtistList = {
                nodes: [],
                links: []
            };

            for (var item in hasonlolista) {
                similarArtistList.nodes.push({
                    "id": item,
                    "group": hasonlolista[item].group
                });

                hasonlolista[item].similarTrack.forEach(function (itemList) {
                    if (alreadyProcessedNames.indexOf(itemList.name) != -1) {
                        similarArtistList.links.push({
                            "source": item,
                            "target": itemList.name,
                            "value": 3
                        });
                    }
                });
            }
            res.tpl.similarTrack = [];

            for (var item in hasonlolista) {
                if (hasonlolista[item].group == 1) {
                    //console.log(item);
                    res.tpl.similarTrack.push(item);
                }
            }

            //console.log(similarArtistList);
            res.tpl.similarTrack = JSON.stringify(similarArtistList);

            return next();
        });

    };

};