/**
 * Created by Koszta Ádám on 2016. 04. 01..
 */


module.exports = function (viewName) {

    return function (req, res) {

        // Set page title
       //res.tpl.pageTitle = res.tpl.artist;

       //res.render('test', res.tpl);

        function simpleStringify (object){
            var simpleObject = {};
            for (var prop in object ){
                if (!object.hasOwnProperty(prop)){
                    continue;
                }
                if (typeof(object[prop]) == 'object'){
                    continue;
                }
                if (typeof(object[prop]) == 'function'){
                    continue;
                }
                simpleObject[prop] = object[prop];
            }
            return JSON.stringify(simpleObject); // returns cleaned up JSON
        }

        var response = simpleStringify(res.tpl);

        console.log(res.tpl.artist);
        console.log(res.tpl.track);

        //console.log(response);

       // console.log(res.tpl);

        //var response = JSON.stringify(res.tpl);

       // console.log(response);

        res.status(200).json(response);

        // Set Express routes.
        //res.sendFile(__dirname + '/views/index.html');

       /*if(viewName == 'artistGraph')
           res.json(res.tpl.similarArtistsList);
       else
           res.render(viewName, res.tpl);*/
    };

};