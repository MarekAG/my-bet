
function Match () {
    this.homeTeam = "";
    this.awayTeam = "";
    this.homeTeamGoals = 0;
    this.awayTeamGoals = 0;
    this.matchNr = 0;
    this.date = "";
    this.status = "TIMED";
}

Match.prototype.whoWins = function () {
    return this.homeTeamGoals-this.awayTeamGoals;
};

Match.prototype.printResult = function () {
    return this.homeTeamGoals+":"+this.awayTeamGoals;
};

Match.prototype.givePoints = function (wholeResult) {

};

Match.prototype.givePoints = function (homeGoals, awayGoals) {
    var result = homeGoals - awayGoals;
    var points = 0;
    var whoWins = this.whoWins();

    if(result < 0 && whoWins < 0) {
        points = 3;
    } else if(result == 0 && whoWins == 0) {
        points = 5;
    } else if(result > 0 && whoWins > 0) {
        points = 3;
    }
    if(homeGoals == this.homeTeamGoals && awayGoals == this.awayTeamGoals) {
        points = 5;
    }

    return points;
};