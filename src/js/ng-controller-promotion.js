myCtrl.controller('PromotionCtrl', ['$scope', function ($scope) {
	$scope.pageClass="promotion";
	$scope.title = "优惠专区";
}]);

myCtrl.controller('PromotionMainCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {

	$scope.StatePromotionMain = false;
	$scope.StatePromotionRefresh = true;

	getLocation(getPromotionJson);
	function getPromotionJson() {
		var url = 'http://handset.line0.com/ws/handset/v3/mcms/promotion&jsonp=getPromotion';
		var param = {
			params : {
				userX: longitude,
				userY: latitude,
				cityId: cityId,
				toPage: 1,
				pageRows: 100
			}
		};
		$http.jsonp(url, param).success();
	}
	$window.getPromotion = function (data) {
		console.log(data.response);
	}
	$scope.StatePromotionMain = true;
	$scope.StatePromotionRefresh = false;
}]);