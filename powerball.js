var powerBallLottery = {

	whiteBallMax : 69,

	whiteBallNum : 5,

	powerBallMax : 24,

	fill : function(array, max, index) {
		var ball = 0;
		do {
			ball = this.drawBall(max);
		} while (this.isAlreadyDrew(array, ball) == true);
		array[index] = ball;
	},

	drawBall : function(max) {
		var ball = (Math.random() * max) + 1;
		return Math.floor(ball);
	},

	isAlreadyDrew : function(array, ball) {
		for (var i = 0; i < array.length; i++) {
			if (array[i] == ball) {
				return true;
			}
		}
		return false;
	},

	sortNumber : function(a, b) {
		return a - b;
	},

	getWhiteBallsDraw : function() {
		var whiteBalls = new Array(this.whiteBallNum);

		for (var i = 0; i < this.whiteBallNum; i++) {
			// add them to array
			this.fill(whiteBalls, this.whiteBallMax, i);
		}
		return whiteBalls.sort(this.sortNumber);
	},

	getPowerBall : function() {
		return this.drawBall(this.powerBallMax);
	},

	getNewDraw : function() {
		var draw = {};
		draw.whiteBalls = this.getWhiteBallsDraw();
		draw.powerBall = this.getPowerBall();
		return draw;
	}
};

var matchPrize = {

	matcheTypes : {
		"01" : 4,
		"11" : 4,
		"21" : 7,
		"30" : 7,
		"31" : 100,
		"40" : 100,
		"41" : 50000,
		"50" : 1000000,
		"51" : 1500000000
	},

	getResult : function(officalDraw, ticket) {
		var pbMatch = officalDraw.powerBall == ticket.powerBall ? 1 : 0;
		var wbMatch = this.checkWhiteBallMatches(officalDraw, ticket);

		return {
			wbMatch : wbMatch,
			pbMatch : pbMatch,
			matcheTypes : this.matcheTypes,

			completelyLost : function() {
				return this.wbMatch <= 2 && pbMatch == 0;
			},

			getPrize : function() {
				if (this.completelyLost()) {
					return 0;
				}
				return this.matcheTypes[this.getKey()];
			},

			getKey : function() {
				return "" + this.wbMatch + this.pbMatch;
			}
		};
	},

	getPrize : function(result) {

	},

	checkWhiteBallMatches : function(officalDraw, ticket) {
		var a = officalDraw.whiteBalls;
		var b = ticket.whiteBalls;

		var matches = 0;
		var i = 0, j = 0;

		while (i < a.length && j < b.length) {
			if (a[i] == b[j]) {
				matches++;
				i++;
				j++;
			} else if (a[i] < b[j]) {
				i++;
			} else {
				j++;
			}
		}

		return matches;
	}
};
