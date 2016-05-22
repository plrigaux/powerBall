angular.module('powerBall', []).controller('newDrawCtrl', function($scope) {

	$scope.redraw = function() {
		var draw = powerBallLottery.getNewDraw();
		$scope.whiteBalls = draw.whiteBalls;
		$scope.powerBall = draw.powerBall;
		
		
		var total = 0;
		var count = {};
		for(var i = 0; i < 10000; i++) {
			var ticket = powerBallLottery.getNewDraw();
			var result = matchPrize.getResult(draw, ticket);
			var prize = result.getPrize();
			
			total = total + prize;
			var key = result.getKey();
			var current = count[key];
			current = (current === undefined) ? 0 : current;
			count[key] = current + 1;
		}
		
		console.log("total: " + total + "$ count: " + JSON.stringify(count));
	};
	
	
});