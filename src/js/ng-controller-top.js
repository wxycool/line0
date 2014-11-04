var myCtrl = angular.module('myCtrl', []);

/*
 $scope.pageClass="index";
 $http.jsonp('http://192.168.1.199/ws/handset/v2/map/cityList?jsonp=mzhan').success(function (data){
 mzhan(data);
 });
 $window.mzhan = function (data) {
 var data = JSON.parse(data);
 console.log(data.response);
 return data;
 };
 http://192.168.1.199/
 http://handset.line0.com/
 */

myCtrl.controller('SearchTopCtrl', ['$scope', '$rootScope', '$state', '$stateParams', function ($scope, $rootScope, $state, $stateParams) {
	$scope.searchShop = function () {
		$rootScope.shopName = $scope.shopName;

		if($rootScope.shopName != null) {
			$rootScope.shopName = trim($rootScope.shopName);
		}
		if($rootScope.shopName === '') {
			$rootScope.shopName = undefined;
		}
		if($scope.shopName != null || $state.includes('index')) {
			$state.go('search', $stateParams, {
				reload: true
			})
		}
	};
	$scope.goback = function () {
		window.history.back();
	}
}]);

myCtrl.controller('NavTopCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
	$scope.goback = function () {
		window.history.back();
	}
}]);