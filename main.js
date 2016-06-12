

(function ($) {
    var bets;
    var matches = [];

    $.fn.table = function () {
        var el = this;
        var path = "bets.txt";
        $.get(path, function (data) {

            var data = ($.csv.toObjects(data));
            bets = data;
            // console.log(data);
            var html = '';
            for(var row in data) {
                // console.log(Object.keys(data[0]));
                    html += '<tr>\r\n';
                    if (data[row]["Fifi"] != undefined) {
                        for (var item in data[row]) {
                            if (item != "nr") {
                                html += '<td>' + item + ':' + data[row][item] + '</td>\r\n';
                            }
                        }
                        html += '</tr>\r\n';
                    }
                }
             $(el).html(html);

        });
        $(this).css("float", "left").css("border","1px");
    };
    
    $.fn.getResults = function () {
        var arr = [];
        $(this).css("float", "right").css("border","1px");
        var data;
        var el = this;
        $.ajax({
            headers: { 'X-Auth-Token': '23a5f07d2dd64e4ca0265d67845ee697' },
            url: 'http://api.football-data.org/v1/soccerseasons/424/fixtures',
            dataType: 'json',
            type: 'GET',
        }).done(function(response) {
            xd(el, response);
        });
    };

    function xd(element, data) {
        var x = bets.map(function (xs) {
            if (xs.nr !== undefined) {
                return xs.nr;
            }
        }).filter( Number );
        var matchesNr = [];
        data['fixtures'].forEach(function (val) {
            var lol = val["_links"].self.href;
            var matchNr = lol.toString().slice(-6, lol.length);
            var newMatch = new Match;
            newMatch.homeTeam = val.homeTeamName;
            newMatch.awayTeam = val.awayTeamName;
            newMatch.homeTeamGoals = val.result.goalsHomeTeam;
            newMatch.awayTeamGoals = val.result.goalsAwayTeam;
            newMatch.matchNr = matchNr;
            matchesNr.push(matchNr);
            $(element).append(val.homeTeamName + " - ");
            $(element).append(val.awayTeamName + " ");
            $(element).append(val.result.goalsHomeTeam + ":");
            $(element).append(val.result.goalsAwayTeam + "</br>");
            matches.push(newMatch);
        });

        // for(var i in matches) {
        //     console.log(matches[i].matchNr);
        // }

        for(var j in bets) {
            for(var i in matches) {
                if (bets[j].nr == matches[i].matchNr)
                console.log(bets[j].Mecz + " " + matches[i].printResult());
            }
             console.log(bets[j].Waluś.slice(0,1));
        }

    };

    $.fn.showRanking = function () {
        return 0;
    };


}(jQuery));
