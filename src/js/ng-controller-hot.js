myCtrl.controller('HotCtrl', ['$scope', function ($scope) {
	$scope.pageClass="hot";
	$scope.title = "热销美食";
}]);

myCtrl.controller('HotMainCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {

	$scope.StateHotMain = false;
	$scope.StateHotRefresh = true;

	//getLocation(getHotJson);
	function getHotJson() {
		var url = 'http://handset.line0.com/ws/handset/v3/mcms/guess/guess&jsonp=getHot';
		var param = {
			params : {
				userX: longitude,
				userY: latitude,
				cityId: cityId,
				toPage: 1,
				pageRows: 10
			}
		};
		$http.jsonp(url, param).success();
	}
	$window.getHot = function (data) {
		console.log(data.response);
	}

	$scope.StateHotMain = true;
	$scope.StateHotRefresh = false;
}]);