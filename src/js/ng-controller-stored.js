myCtrl.controller('StoredCtrl', ['$scope', '$rootScope', '$http', '$window', '$stateParams', function ($scope, $rootScope, $http, $window, $stateParams) {
	$scope.pageClass="stored";
	$scope.title = '商铺详情';
}]);

myCtrl.controller('StoredMainCtrl', ['$scope', '$rootScope', '$http', '$window', '$stateParams', function ($scope, $rootScope, $http, $window, $stateParams) {
	$scope.StateStoredMain = false;
	$scope.StateStoredRefresh = true;

	$scope.StateCommentShow = false;
	$scope.StateCommentRefresh = true;
	$scope.curPage = 1;

	$.getScript('lib/other/iscroll-probe.min.js',function(){
		myScrollStored = new IScroll('#scroller', { tap: true, preventDefault: false });
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	});

	getLocation(getStoreJson);

	//初始化页面数据——定义
	function getStoreJson() {
		//http://handset.line0.com
		//http://192.168.1.199
		//var url = '/data/shopDetail.json?jsonp=getStore&clientFlag=line0123456789abcdef987opqxyzline0&cityId=' + cityId + '&userX=' + longitude + '&userY=' + latitude + '&shopId=' + $stateParams.sid;
		//var url = 'http://192.168.1.199/ws/handset/v3/shop/shopDetail?jsonp=getStore&clientFlag=line0123456789abcdef987opqxyzline0&cityId=' + cityId + '&userX=' + longitude + '&userY=' + latitude + '&shopId=' + $stateParams.sid + '&version=17';
		var url = 'http://handset.line0.com/ws/handset/v3/shop/shopDetail?jsonp=getStore&clientFlag=line0123456789abcdef987opqxyzline0&cityId=' + cityId + '&userX=' + longitude + '&userY=' + latitude + '&shopId=' + $stateParams.sid;
		//console.log(url);
		$http.jsonp(url).success();
	};

	$window.getStore = function (data) {
		//console.log(data.response);
		$scope.store = data.response.shop;
		//console.log($scope.store);

		$scope.store.remark = trim($scope.store.remark);
		if($scope.store.remark == false) {
			$scope.StateStoreRemark = false;
		} else {
			$scope.StateStoreRemark = true;
		}

		if($scope.store.promotionInfo == false && $scope.store.shopAnounce == false) {
			$scope.StateStoreAnounce = false;
		} else {
			$scope.StateStoreAnounce = true;
		}

		$scope.StateStoredMain = true;
		$scope.StateStoredRefresh = false;

		getStoreCommentJson();
	};


	function getStoreCommentJson() {
		var url = 'http://handset.line0.com/ws/handset/v3/appraise/selectListByShopId?jsonp=getStoreComment&toPage=1&pageRows=200&shopId=' + $stateParams.sid;
		$http.jsonp(url).success();
	};

	$window.getStoreComment = function (data) {
		$scope.comments = data.response.appraiseList;
		//console.log($scope.comments);

		$scope.StateCommentShow = true;
		$scope.StateCommentRefresh = false;

		if($scope.comments[0].userName == undefined) {
			$scope.comments_len = 0;
			$scope.comments = null;
			$scope.StateCommentShow = false;
		} else {
			$scope.comments_len = $scope.comments.length;
		}


		$.getScript('lib/other/iscroll-probe.min.js',function(){
			myScrollStored.refresh();
		});
	}

}]);