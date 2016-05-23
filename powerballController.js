

angular.module('powerBall', []).controller('newDrawCtrl', function($scope) {
	var draw;
	
	$scope.investment = 2000000;
	$scope.earning = "";
	$scope.matchPrize = [];
	
	for (var key in matchPrize.matcheTypes) {
		$scope.matchPrize.push({
			 key : key,
			 value : matchPrize.matcheTypes[key]
		 });
	}
		
	$scope.redraw = function() {
		draw = powerBallLottery.getNewDraw();
		$scope.whiteBalls = draw.whiteBalls;
		$scope.powerBall = draw.powerBall;
	};
	
	$scope.play = function() {
		var total = 0;
		var count = {};
		var nbPlay = $scope.investment / 2;
		
		for (var i = 0; i < nbPlay; i++) {
			var ticket = powerBallLottery.getNewDraw();
			var result = matchPrize.getResult(draw, ticket);
			var prize = result.getPrize();

			total = total + prize;
			var key = result.getKey();
			var current = count[key];
			current = (current === undefined) ? 0 : current;
			count[key] = current + 1;
		}
		
		$scope.matches = count;
		$scope.earning = total;
		console.log("total: " + total + "$ count: " + JSON.stringify(count));

	};

});