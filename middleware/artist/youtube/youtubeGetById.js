/**
 * Created by Koszta Ádám on 2017. 10. 13..
 */

module.exports = function () {

    return function (req, res, next) {

        res.tpl.youTube.getById('UCQ5kHOKpF3-1_UCKaqXARRg', function(error, result) {
            if (error) {
                console.log(error);
                return next();
            }
            else {
                console.log(JSON.stringify(result, null, 2));
                return next();
            }
        });
    }
};