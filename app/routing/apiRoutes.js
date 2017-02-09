var friends = require('../data/friends.js');
var path = require('path');


module.exports = function(app){


    app.get('/api/friends', function(req, res){
        res.json(friends);
    });


    app.post('/api/friends', function(req, res){
        var lowestDifferenceInt = 50;
        var chosenMatch;
        for (i=0; i<friends.length; i++) {
            var difference = 0;
            for(j=0;j<friends[i].scores.length;j++){
                var temp = parseInt(req.body.scores[j]);
                difference+=Math.abs(friends[i].scores[j] - temp);
            } if(difference<lowestDifferenceInt){
                lowestDifferenceInt = difference;
                chosenMatch = friends[i];
            }
        }


        res.json(chosenMatch);
        friends.push(req.body);


        app.post('/api/clear', function(req, res){

            friends = [];

            console.log(friends);
        });
    });
};
