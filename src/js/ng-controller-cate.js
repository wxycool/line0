myCtrl.controller('CateCtrl', ['$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
	$scope.pageClass="cate";
	$scope.title = "商家分类";
}]);

myCtrl.controller('CateNavCtrl', ['$scope', '$rootScope', '$http', '$window', '$state', '$stateParams', function ($scope, $rootScope, $http, $window, $state, $stateParams) {
	$rootScope.cateDistanceText = ($rootScope.cateDistanceText == undefined) ? '距离范围' : $rootScope.cateDistanceText;
	$rootScope.cateCidText = ($rootScope.cateCidText == undefined) ? '商家分类' : $rootScope.cateCidText;
	$rootScope.cateSortText = ($rootScope.cateSortText == undefined) ? '选择排序' : $rootScope.cateSortText;

	/* 分类选择 */
	$scope.cateInit = function cateInit() {
		$scope.CateMask = false;
		$scope.CateDistanceList = false;
		$scope.CateCidList = false;
		$scope.CateSortList = false;
		$scope.cateDistanceClass = '';
		$scope.cateCidClass = '';
		$scope.cateSortClass = '';
	}
	$scope.cateInit();

	$scope.CateDistanceClick = function () {
		if($scope.CateDistanceList !== true) {
			$scope.cateInit();
			$scope.CateMask = true;
			$scope.CateDistanceList = true;
			$scope.cateDistanceClass = 'icon-down02';
		} else {
			$scope.cateInit();
		}
	};
	$scope.CateCidClick = function () {
		if($scope.CateCidList !== true) {
			$scope.cateInit();
			$scope.CateMask = true;
			$scope.CateCidList = true;
			$scope.cateCidClass = 'icon-down02';
		} else {
			$scope.cateInit();
		}
	};
	$scope.CateSortClick = function () {
		if($scope.CateSortList !== true) {
			$scope.cateInit();
			$scope.CateMask = true;
			$scope.CateSortList = true;
			$scope.cateSortClass = 'icon-down02';
		} else {
			$scope.cateInit();
		}
	};

	$scope.CateDistanceClick3000 = function () {
		$rootScope.distance = 3000;
		$rootScope.cateDistanceText = '3.0km内 运费6元';
		$state.go('cate', $stateParams, { reload: true });
	};
	$scope.CateDistanceClick4500 = function () {
		$rootScope.distance = 4500;
		$rootScope.cateDistanceText = '4.5km内 运费10元';
		$state.go('cate', $stateParams, { reload: true });
	};
	$scope.CateDistanceClick6000 = function () {
		$rootScope.distance = 6000;
		$rootScope.cateDistanceText = '6.0km内 运费15元';
		$state.go('cate', $stateParams, { reload: true });
	};
	$scope.CateCidClick0 = function () {
		$rootScope.cid = 0;
		$rootScope.cateCidText = '全部';
		$state.go('cate', $stateParams, { reload: true });
	};
	$scope.CateCidClick1 = function () {
		$rootScope.cid = 1;
		$rootScope.cateCidText = '中式餐厅';
		$state.go('cate', $stateParams, { reload: true });
	};
	$scope.CateCidClick2 = function () {
		$rootScope.cid = 2;
		$rootScope.cateCidText = '馄饨面食';
		$state.go('cate', $stateParams, { reload: true });
	};
	$scope.CateCidClick3 = function () {
		$rootScope.cid = 3;
		$rootScope.cateCidText = '便当套餐';
		$state.go('cate', $stateParams, { reload: true });
	};
	$scope.CateCidClick4 = function () {
		$rootScope.cid = 4;
		$rootScope.cateCidText = '西式餐点';
		$state.go('cate', $stateParams, { reload: true });
	};
	$scope.CateCidClick5 = function () {
		$rootScope.cid = 5;
		$rootScope.cateCidText = '日韩料理';
		$state.go('cate', $stateParams, { reload: true });
	};
	$scope.CateCidClick6 = function () {
		$rootScope.cid = 6;
		$rootScope.cateCidText = '下午茶';
		$state.go('cate', $stateParams, { reload: true });
	};
	$scope.CateCidClick7 = function () {
		$rootScope.cid = 7;
		$rootScope.cateCidText = '休闲小吃';
		$state.go('cate', $stateParams, { reload: true });
	};
	$scope.CateSortClick0 = function () {
		$rootScope.sort = 0;
		$rootScope.cateSortText = '默认排序';
		$state.go('cate', $stateParams, { reload: true });
	};
	$scope.CateSortClick1 = function () {
		$rootScope.sort = 1;
		$rootScope.cateSortText = '距离由近到远';
		$state.go('cate', $stateParams, { reload: true });
	};
	$scope.CateSortClick2 = function () {
		$rootScope.sort = 2;
		$rootScope.cateSortText = '距离由远到近';
		$state.go('cate', $stateParams, { reload: true });
	};
	$scope.CateSortClick3 = function () {
		$rootScope.sort = 3;
		$rootScope.cateSortText = '起送价由低到高';
		$state.go('cate', $stateParams, { reload: true });
	};
	$scope.CateSortClick4 = function () {
		$rootScope.sort = 4;
		$rootScope.cateSortText = '起送价由高到低';
		$state.go('cate', $stateParams, { reload: true });
	};
	$scope.CateSortClick5 = function () {
		$rootScope.sort = 5;
		$rootScope.cateSortText = '店家配送优先';
		$state.go('cate', $stateParams, { reload: true });
	};
	$scope.CateSortClick6 = function () {
		$rootScope.sort = 6;
		$rootScope.cateSortText = '零号线配送优先';
		$state.go('cate', $stateParams, { reload: true });
	};
}]);

myCtrl.controller('CateMainCtrl', ['$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
	//初始化数据
	//console.log($rootScope.cid);
	$rootScope.cid = ($rootScope.cid == undefined) ? 0 : $rootScope.cid;
	$rootScope.distance = $rootScope.distance == undefined ? 3000 : $rootScope.distance;
	$rootScope.sort = $rootScope.sort == undefined ? 0 : $rootScope.sort;
	//console.log($rootScope.cid);
	var pullUpEl = document.getElementById('shop-list-pullUp');
	var pullDownEl = document.getElementById('shop-list-pullDown');
	var loadingStep = 0;
	//console.log(pullDownEl);

	//初始化页面数据——定义
	function getShopListJson() {
		var url = 'http://handset.line0.com/ws/handset/v2/shop/shopList?jsonp=getShopList&cityId=' + cityId + '&userX=' + longitude + '&userY=' + latitude + '&toPage=1&pageRows=20&shopType=' + $rootScope.cid + '&distance=' + $rootScope.distance + '&sort=' + $rootScope.sort + '';
		//console.log(url);
		$http.jsonp(url).success();
	};
	$window.getShopList = function (data) {
		//console.log(data);
		$scope.shopList = data.response.shopList;
		$scope.shopPage = data.response.page;
		$scope.totalRow = $scope.shopPage.totalRows;
		$scope.curPage = $scope.shopPage.curPage;
		$scope.totalPage = $scope.shopPage.pageAmount;
		//console.log($scope.shopPage);

		if($scope.shopList.length === 1 && $scope.shopList[0].shopId == undefined) {
			$scope.shopList = null;
			$scope.cateListEmpty = true;
			$scope.show_error = '米有找到相关的店铺';
		}

		$scope.StateCateRefresh = false;

		$.getScript('lib/other/iscroll-probe.min.js',function(){
			myScrollCate = new IScroll('#scroller', { tap: true, preventDefault: false, probeType: 2 });
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

			// 加载更多数据----绑定滚动事件
			myScrollCate.on('scroll', function () {
				//console.log(this.y, (this.maxScrollY - 5));
				if(loadingStep == 0 && !pullDownEl.className.match('show|loading')) {
					if (this.y > 5) {
						//上拉准备刷新效果
						//console.log('up');
						//loadingStep = 1;
					} else if (this.y < (this.maxScrollY - 5)) {
						//下拉准备刷新效果
						//console.log('down');
						pullDownEl.className = 'show';
						myScrollCate.refresh();
						loadingStep = 1;
					}
				}
			});
			myScrollCate.on('scrollEnd',function(){
				if(loadingStep == 1){
					if(pullDownEl.className.match('show|loading')){
						pullDownEl.className = 'loading';
						pullDownEl.innerHTML = '<i class="icon-spin animate-spin"></i>';
						loadingStep = 2;
						getMoreShopListJson();
					}
				}
			});

		});
	};

	//加载更多数据-----定义
	function getMoreShopListJson() {
		$scope.curPage = parseInt($scope.curPage) + 1;
		//console.log($scope.curPage, $scope.totalPage);

		// 判断是否显示加载更多数据
		if($scope.curPage > $scope.totalPage) {
			pullDownEl.className = 'show';
			pullDownEl.innerHTML = '没有更多数据了';
			myScrollCate.refresh();
			loadingStep = 0;
			return;
		}

		var url = 'http://handset.line0.com/ws/handset/v2/shop/shopList?jsonp=getMoreShopByPage&cityId=' + cityId + '&userX=' + longitude + '&userY=' + latitude + '&toPage=' + $scope.curPage + '&pageRows=20&shopType=' + $rootScope.cid + '&distance=' + $rootScope.distance + '&sort=' + $rootScope.sort + '';
		$http.jsonp(url).success();

	};
	$window.getMoreShopByPage = function (data) {
		//console.log(data);
		$scope.shopList = $scope.shopList.concat(data.response.shopList);
		//console.log($scope.shopList.length, $scope.shopList);

		$.getScript('lib/other/iscroll-probe.min.js',function(){
			pullDownEl.className = '';
			pullDownEl.innerHTML = '下拉准备刷新...';
			myScrollCate.refresh();
			loadingStep = 0;
		});
	};



	//初始化数据调用
	$scope.cateListExist = true;
	$scope.cateListEmpty = false;
	$scope.StateCateRefresh = true;

	getLocation(getShopListJson);

}]);
