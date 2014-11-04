myCtrl.controller('SearchCtrl', ['$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
	$scope.pageClass="search";
}]);

myCtrl.controller('SearchMainCtrl', ['$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
	$scope.shopList = [];
	//$rootScope.shopName = '饭';		/* 自来水 村 米线 米 鱼 */
	//console.log($rootScope.shopName);
	var pullUpEl = document.getElementById('shop-list-pullUp');
	var pullDownEl = document.getElementById('shop-list-pullDown');
	var loadingStep = 0;
	//console.log(pullDownEl);


	//初始化页面数据——定义
	function getShopListJson() {
		var url = 'http://handset.line0.com/ws/handset/v2/search/shop?jsonp=getShopList&cityId=' + cityId + '&userX=' + longitude + '&userY=' + latitude + '&toPage=1&pageRows=100&keyword='+ $rootScope.shopName;
		//var url = '../data/shopList.json?jsonp=getShopListByName';
		$http.jsonp(url).success();
	};
	$window.getShopList = function (data) {
		//console.log(data);
		$scope.shopList = data.response.shopList;
		$scope.shopPage = data.response.page;
		$scope.totalRow = $scope.shopPage.totalRows;
		$scope.curPage = $scope.shopPage.curPage;
		$scope.totalPage = $scope.shopPage.pageAmount;
		//console.log($scope.shopList.length, $scope.shopList);

		if($scope.shopList.length === 1 && $scope.shopList[0].shopId == undefined) {
			$scope.shopList = null;
			$scope.searchListEmpty = true;
			$scope.show_error = '米有找到相关的店铺，请换个关键字试试';
		}

		$scope.StateSearchRefresh = false;

		$.getScript('lib/other/iscroll-probe.min.js',function(){
			myScrollSearch = new IScroll('#scroller', { tap: true, preventDefault: false, probeType: 2 });
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

			// 加载更多数据----绑定滚动事件
			myScrollSearch.on('scroll', function () {
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
						myScrollSearch.refresh();
						loadingStep = 1;
					}
				}
			});
			myScrollSearch.on('scrollEnd',function(){
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
	function getMoreShopListJson(page) {
		$scope.curPage = parseInt($scope.curPage) + 1;
		//console.log($scope.curPage, $scope.totalPage);

		// 判断是否显示加载更多数据
		if($scope.curPage > $scope.totalPage) {
			pullDownEl.className = 'show';
			pullDownEl.innerHTML = '没有更多数据了';
			myScrollSearch.refresh();
			loadingStep = 0;
			return;
		}

		var url = 'http://handset.line0.com/ws/handset/v2/search/shop?jsonp=getMoreShopByPage&cityId=1&userX=118.793527&userY=32.013613&toPage=' + $scope.curPage + '&pageRows=100&keyword=' + $rootScope.shopName;
		//var url = '../data/shopList.json?jsonp=getMoreShopByPage';
		$http.jsonp(url).success();

	};
	$window.getMoreShopByPage = function (data) {
		//console.log(data);
		$scope.shopList = $scope.shopList.concat(data.response.shopList);
		//console.log($scope.shopList.length, $scope.shopList);
		//console.log($scope.shopList);

		$.getScript('lib/other/iscroll-probe.min.js',function(){
			pullDownEl.className = '';
			pullDownEl.innerHTML = '下拉准备刷新...';
			myScrollSearch.refresh();
			loadingStep = 0;
		});
	};


	//初始化数据调用
	$scope.searchListExist = true;
	$scope.searchListEmpty = false;
	$scope.StateSearchRefresh = true;
	if($rootScope.shopName != null) {
		getLocation(getShopListJson);
	} else {
		$scope.searchListEmpty = true;
		$scope.show_error = '请输入商店名称';
	}
}]);