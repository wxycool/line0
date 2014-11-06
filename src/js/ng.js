var myModule = angular.module('myModule', [
	'ui.router', 'ngAnimate', 'myCtrl', 'myDirective', 'myFilter', 'myService'
]);
myModule.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/index");
	$stateProvider.state('index', {
			url: '/index',
			views: {
				'' : {
					templateUrl: 'tpl/index.html',
					controller : 'IndexCtrl'
				},
				'search@index' : {
					templateUrl: 'tpl/search_top.html',
					controller : 'SearchTopCtrl'
				},
				'main@index' : {
					templateUrl: 'tpl/index_main.html',
					controller : 'IndexMainCtrl'
				}
			}
		}).
		state('search', {
			url: "/search",
			views: {
				'' : {
					templateUrl: 'tpl/search.html',
					controller : 'SearchCtrl'
				},
				'search@search' : {
					templateUrl: 'tpl/search_top.html',
					controller : 'SearchTopCtrl'
				},
				'main@search' : {
					templateUrl: 'tpl/search_main.html',
					controller : 'SearchMainCtrl'
				}
			}
		}).
		state('cate', {
			url: "/cate",
			views: {
				'' : {
					templateUrl: 'tpl/cate.html',
					controller : 'CateCtrl'
				},
				'top@cate' : {
					templateUrl: 'tpl/nav_top.html',
					controller : 'NavTopCtrl'
				},
				'nav@cate' : {
					templateUrl: 'tpl/cate_nav.html',
					controller : 'CateNavCtrl'
				},
				'main@cate' : {
					templateUrl: 'tpl/cate_main.html',
					controller : 'CateMainCtrl'
				}
			}
		}).
		state('store', {
			url: "/store/:sid",
			views: {
				'' : {
					templateUrl: 'tpl/store.html',
					controller : 'StoreCtrl'
				},
				'top@store' : {
					templateUrl: 'tpl/store_top.html',
					controller : 'NavTopCtrl'
				},
				'main@store' : {
					templateUrl: 'tpl/store_main.html',
					controller : 'StoreMainCtrl'
				}
			}
		}).
		state('stored', {
			url: "/stored/:sid",
			views: {
				'' : {
					templateUrl: 'tpl/stored.html',
					controller : 'StoredCtrl'
				},
				'top@stored' : {
					templateUrl: 'tpl/nav_top.html',
					controller : 'NavTopCtrl'
				},
				'main@stored' : {
					templateUrl: 'tpl/stored_main.html',
					controller : 'StoredMainCtrl'
				}
			}
		}).
		state('goods', {
			url: "/goods/:gid",
			views: {
				'' : {
					templateUrl: 'tpl/goods.html',
					controller : 'GoodsCtrl'
				},
				'top@goods' : {
					templateUrl: 'tpl/nav_top.html',
					controller : 'NavTopCtrl'
				},
				'nav@goods' : {
					templateUrl: 'tpl/goods_nav.html',
					controller : 'GoodsNavCtrl'
				},
				'main@goods' : {
					templateUrl: 'tpl/goods_main.html',
					controller : 'GoodsMainCtrl'
				}
			}
		}).
		state('promotion', {
			url: "/promotion",
			views: {
				'' : {
					templateUrl: 'tpl/promotion.html',
					controller : 'PromotionCtrl'
				},
				'top@promotion' : {
					templateUrl: 'tpl/nav_top.html',
					controller : 'NavTopCtrl'
				},
				'main@promotion' : {
					templateUrl: 'tpl/promotion_main.html',
					controller : 'PromotionMainCtrl'
				}
			}
		}).
		state('hot', {
			url: "/hot",
			views: {
				'' : {
					templateUrl: 'tpl/hot.html',
					controller : 'HotCtrl'
				},
				'top@hot' : {
					templateUrl: 'tpl/nav_top.html',
					controller : 'NavTopCtrl'
				},
				'main@hot' : {
					templateUrl: 'tpl/hot_main.html',
					controller : 'HotMainCtrl'
				}
			}
		})
}]);
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
myCtrl.controller('IndexCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
	$scope.pageClass="index";
}]);

myCtrl.controller('IndexMainCtrl', ['$scope', '$rootScope', '$http', '$window', '$state', '$stateParams', function ($scope, $rootScope, $http, $window, $state, $stateParams) {

	$scope.$on('$viewContentLoaded', function() {
		$.getScript('lib/other/iscroll-probe.min.js',function(){
			myScrollIndex = new IScroll('#scroller', { tap: true, preventDefault: false });
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		});
	});

	getLocation(getBannerListJson);

	function getBannerListJson() {
		//var url = '../data/shopList.json?jsonp=getShopListByName';
		var url = 'http://handset.line0.com/ws/handset/v2/mcms/bannerList?jsonp=getBannerList&clientFlag=line0123456789abcdef987opqxyzline0&cityId=' + cityId + '&areaId=null&userX=' + longitude + '&userY=' + latitude;
		$http.jsonp(url).success();
	};
	$window.getBannerList = function (data) {
		//console.log(data);
		$scope.bannerList = data.response.bannerList;
		console.log($scope.bannerList);
		$scope.banner();
	};

	/* 轮播图 */
	$scope.banner = function(){
		var len_old_length = $('.swipe-wrap').find('div').length;
		$.getScript('lib/other/swipe.min.js',function(){
			// 添加添加小按钮
			var btn_ele = '';
			var div_ele = $('.swipe-wrap').find('div');
			var div_len = div_ele.length;
			if(div_len >= 2) {
				for (var i = 0; i < div_len; i++){
					btn_ele += '<li></li>';
				}
				$('#slider-num ul').append(btn_ele);
				$('#slider-num ul').find('li').first().addClass('on');
			}

			// swipe
			window.mySwipe = new Swipe(document.getElementById('slider'), {
				auto: 3000,
				continuous: true,
				disableScroll: true,
				stopPropagation: false,
				callback: function(pos, ele) {
					myScrollIndex.refresh();
					if(len_old_length == 2) {
						if(pos == 2) {
							pos = 0;
						}
						if(pos == 3) {
							pos = 1;
						}
					}
					var li = $('#slider-num').find('li');
					li.eq(pos).addClass('on').siblings().removeClass();
				}
			});
		});
	};

	/* 分类 */
	$scope.CateCidClick0 = function () {
		$rootScope.cid = 0;
		$state.go('cate', $stateParams, {
			reload: true
		});
	};
	$scope.CateCidClick1 = function () {
		$rootScope.cid = 1;
		$state.go('cate', $stateParams, {
			reload: true
		});
	};
	$scope.CateCidClick2 = function () {
		$rootScope.cid = 2;
		$state.go('cate', $stateParams, {
			reload: true
		});
	};
	$scope.CateCidClick3 = function () {
		$rootScope.cid = 3;
		$state.go('cate', $stateParams, {
			reload: true
		});
	};
	$scope.CateCidClick4 = function () {
		$rootScope.cid = 4;
		$state.go('cate', $stateParams, {
			reload: true
		});
	};
	$scope.CateCidClick5 = function () {
		$rootScope.cid = 5;
		$state.go('cate', $stateParams, {
			reload: true
		});
	};
	$scope.CateCidClick6 = function () {
		$rootScope.cid = 6;
		$state.go('cate', $stateParams, {
			reload: true
		});
	};
	$scope.CateCidClick7 = function () {
		$rootScope.cid = 7;
		$state.go('cate', $stateParams, {
			reload: true
		});
	};
}]);
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

myCtrl.controller('StoreCtrl', ['$scope', '$rootScope', '$http', '$window', '$stateParams', function ($scope, $rootScope, $http, $window, $stateParams) {
	$scope.pageClass="store";
	$scope.title = '';

	//初始化数据
	$rootScope.storeId = $stateParams.sid;
	//console.log($rootScope.storeId);
	$scope.StateStoreTop = false;
	$scope.StateStoreMain = false;
	$scope.StateStoreRefresh = true;

	getLocation(getStoreJson);

	//初始化页面数据——定义
	function getStoreJson() {
		//var url = '/data/shopDetail.json?jsonp=getStore&clientFlag=line0123456789abcdef987opqxyzline0&cityId=' + cityId + '&userX=' + longitude + '&userY=' + latitude + '&shopId=' + $rootScope.storeId;
		var url = 'http://handset.line0.com/ws/handset/v2/shop/shopDetail?jsonp=getStore&clientFlag=line0123456789abcdef987opqxyzline0&cityId=' + cityId + '&userX=' + longitude + '&userY=' + latitude + '&shopId=' + $stateParams.sid;
		//console.log(url);
		$http.jsonp(url).success();
	};
	$window.getStore = function (data) {
		var scroller_left = document.getElementById('scroller-left');
		var scroller_right = document.getElementById('scroller-right');
		//console.log(data.response);
		$scope.store = data.response.shop;
		$scope.cate = data.response.shopProdTypeList;
		$scope.tj = data.response.tuijianProdList;
		$scope.prod = [];
		$scope.cateTypeId = [];
		$scope.bill = {};
		
		if(data.response.errorCode !== 1) {
			alert(data.response.msg);
		}

		//判断推荐
		if($scope.tj[0].productName !== undefined) {	//如果有推荐
			var j = JSON.parse('{"typeName": "热销推荐", "typeId": "0000"}');
			for(var i = 0; i < $scope.tj.length; i++) {
				$scope.tj[i].shopProdTypeId = '0000';
				$scope.tj[i].buyNum = 0;
			}
			$scope.cate = [j].concat($scope.cate);
			$scope.prod = $scope.prod.concat($scope.tj);
		} else {
			$scope.tj = null;
		}
		//console.log($scope.cate);

		//组织商品列表数据
		var prods = $scope.prod;
		for(var i = 0; i < $scope.cate.length; i++) {
			//console.log($scope.cate[i].typeId);
			if($scope.cate[i].typeId !== '0000') {
				var url = 'http://handset.line0.com/ws/handset/v2/shop/productList?jsonp=getStoreCate&clientFlag=line0123456789abcdef987opqxyzline0&shopId=' + $rootScope.storeId + '&shopProdTypeId=' + $scope.cate[i].typeId;
				//console.log(url);
				$http.jsonp(url).success();
			}
		}
		$window.getStoreCate = function(data) {
			//console.log(data.response.productMap);
			for(var prop in data.response.productMap) {
				//console.log(data.response.productMap[prop].length);
				for(var i = 0; i < data.response.productMap[prop].length; i++) {
					data.response.productMap[prop][i].buyNum = 0;
				}
				prods = prods.concat(data.response.productMap[prop]);
			}
			$scope.prod = prods;
			//console.log($scope.prod, $scope.prod.length);

			var calculateTotals = function () {
				var total = 0;
				for(var i = 0, len = $scope.prod.length; i < len; i++) {
					total = parseFloat(total) + parseFloat($scope.prod[i].priceDown) * parseFloat($scope.prod[i].buyNum);
				}
				//console.log(total);
				$scope.bill.totalCart = total;
				$scope.bill.discount = total;
			}

			$scope.$watch('prod', calculateTotals, true);
		};

		$scope.StateStoreTop = true;
		$scope.StateStoreMain = true;
		$scope.StateStoreRefresh = false;
		$scope.StateNotice = false;
		$scope.stockCart = true;
		$scope.stockSelect = false;

		$.getScript('lib/other/iscroll-probe.min.js',function(){
			myScrollStoreLeft = new IScroll('#scroller-left', { tap: true, preventDefault: true });
			myScrollStoreRight = new IScroll('#scroller-right', { tap: true, preventDefault: true, preventDefaultException: { tagName: /^(A|INPUT|TEXTAREA|BUTTON|SELECT)$/ }, });
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		});

		//公告
		if($scope.store.promotionInfo.length !== 0) {
			$scope.StateNotice = true;
			scroller_left.className = 'up';
			scroller_right.className = 'up';
		}
		$scope.hideNotice = function () {
			$scope.StateNotice = false;
			scroller_left.className = '';
			scroller_right.className = '';
			myScrollStoreLeft.refresh();
			myScrollStoreRight.refresh();
		};

	};
}]);

myCtrl.controller('StoreMainCtrl', ['$scope', '$rootScope', '$http', '$window', '$stateParams', function ($scope, $rootScope, $http, $window, $stateParams) {  }]);

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
		//var url = 'http://192.168.1.199/ws/handset/v2/shop/shopDetail?jsonp=getStore&clientFlag=line0123456789abcdef987opqxyzline0&cityId=' + cityId + '&userX=' + longitude + '&userY=' + latitude + '&shopId=' + $stateParams.sid + '&version=17';
		var url = 'http://handset.line0.com/ws/handset/v2/shop/shopDetail?jsonp=getStore&clientFlag=line0123456789abcdef987opqxyzline0&cityId=' + cityId + '&userX=' + longitude + '&userY=' + latitude + '&shopId=' + $stateParams.sid;
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
		var url = 'http://handset.line0.com/ws/handset/v2/appraise/selectListByShopId?jsonp=getStoreComment&toPage=1&pageRows=200&shopId=' + $stateParams.sid;
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
myCtrl.controller('GoodsCtrl', ['$scope', '$rootScope', '$http', '$window', '$stateParams', function ($scope, $rootScope, $http, $window, $stateParams) {
	// 初始化数据
	$scope.pageClass="goods";
	$scope.title = "商品详情";
	$scope.StateGoodsMain = false;
	$scope.StateGoodsRefresh = true;
	$scope.StateGoodsCommentMain = false;
	$scope.StateGoodsCommentRefresh = true;
	$scope.StateGoodsCommentNull = false;
	var goods_detail = false;
	var goods_comment = false;
	var goods_article = false;

	// 商品信息
	if(goods_detail == false) {
		getLocation(getGoodsJson);
	}
	function getGoodsJson() {
		//var url = '/data/goods.json?jsonp=getGoods&clientFlag=line0123456789abcdef987opqxyzline0&cityId=' + cityId + '&userX=' + longitude + '&userY=' + latitude + '&productId=' + $stateParams.gid;
		var url = 'http://handset.line0.com/ws/handset/v2/shop/productdetail?jsonp=getGoods&clientFlag=line0123456789abcdef987opqxyzline0&cityId=' + cityId + '&userX=' + longitude + '&userY=' + latitude + '&productId=' + $stateParams.gid;
		//console.log(url);
		$http.jsonp(url).success();
	};
	$window.getGoods = function (data) {
		//console.log(data.response);
		$scope.goods = data.response.product;

		//console.log($scope.goods.article.length);
		if($scope.goods.article.length !== 0) {
			$scope.goods.ArticleShow = 'ArticleShow';
		} else {
			$scope.goods.ArticleShow = 'ArticleNone';
		}

		$scope.StateGoodsNav = !$scope.StateGoodsNav;
		$scope.StateGoodsMain = !$scope.StateGoodsMain;
		$scope.StateGoodsRefresh = !$scope.StateGoodsRefresh;

		$("img").load(function(){
			$.getScript('lib/other/iscroll-probe.min.js',function(){
				myScrollGoods = new IScroll('#scroller', { tap: true, preventDefault: false });
				document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
				goods_detail = true;
			});
		});
	};

	// 用户评论
	$scope.GoodsCommentCtrl = function () {
		if(goods_comment == false) {
			var url = 'http://handset.line0.com/ws/handset/v2/shop/productappraises?jsonp=getGoodsComment&pageNum=1&pageRow=200&productId=' + $stateParams.gid;
			//console.log(url);
			$http.jsonp(url).success();
			$window.getGoodsComment = function (data) {
				//console.log(data.response);
				$scope.comments = data.response.comments;
				$scope.totalRows = data.response.totalRows;

				$scope.StateGoodsCommentMain = !$scope.StateGoodsCommentMain;
				$scope.StateGoodsCommentRefresh = !$scope.StateGoodsCommentRefresh;

				if($scope.totalRows == 0) {
					$scope.comments.msg = '暂无评论';
					$scope.StateGoodsCommentMain = false;
					$scope.StateGoodsCommentNull = true;
				}

				$.getScript('lib/other/iscroll-probe.min.js',function(){
					myScrollGoods = new IScroll('#scroller', { tap: true, preventDefault: false });
					document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
					goods_detail = true;
				});
			}
		}
		goods_comment = true;
	};

	// 图文详情
	$scope.GoodsArticleCtrl = function () {
		if(goods_article == false) {
			var url = 'http://handset.line0.com/ws/handset/v2/shop/productdetailpicture?jsonp=getGoodsHTML';
			//console.log(url);
			$http.jsonp(url, {params: {productId: $stateParams.gid}}).success();
			$window.getGoodsHTML = function (data) {
				//console.log(data.response);
				$scope.productImage = data.response.productImageUrl;

				$("img").load(function(){
					$.getScript('lib/other/iscroll-probe.min.js',function(){
						myScrollGoods = new IScroll('#scroller', { tap: true, preventDefault: false });
						document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
						goods_detail = true;
					});
				});
			};
		}
		goods_article = true;
	};
}]);

myCtrl.controller('GoodsNavCtrl', ['$scope', '$rootScope', '$http', '$window', '$state', '$stateParams', function ($scope, $rootScope, $http, $window, $state, $stateParams) {

}]);

myCtrl.controller('GoodsMainCtrl', ['$scope', '$rootScope', '$http', '$window', '$stateParams', function ($scope, $rootScope, $http, $window, $stateParams) {

}]);

myCtrl.controller('PromotionCtrl', ['$scope', function ($scope) {
	$scope.pageClass="promotion";
	$scope.title = "优惠专区";
}]);

myCtrl.controller('PromotionMainCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {

	$scope.StatePromotionMain = false;
	$scope.StatePromotionRefresh = true;

	getLocation(getPromotionJson);
	function getPromotionJson() {
		var url = 'http://handset.line0.com/ws/handset/v3/mcms/promotion?jsonp=getPromotion';
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

	$("img").load(function(){
		$.getScript('lib/other/iscroll-probe.min.js',function(){
			myScrollGoods = new IScroll('#scroller', { tap: true, preventDefault: false });
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
			goods_detail = true;
		});
	});

}]);
myCtrl.controller('HotCtrl', ['$scope', function ($scope) {
	$scope.pageClass="hot";
	$scope.title = "热销美食";
}]);

myCtrl.controller('HotMainCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {
	var loadingStep = 0;
	var pullDownEl = document.getElementById('shop-list-pullDown');
	var thisTopPx = 0;

	$scope.StateHotMain = true;
	$scope.StateHotRefresh = true;
	$.getScript('lib/other/iscroll-probe.min.js',function(){
		myScrollHot = new IScroll('#scroller', { tap: true, preventDefault: false, probeType: 2 });
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	});

	getLocation(getHotJson);
	function getHotJson() {
		var url = 'http://handset.line0.com/ws/handset/v3/mcms/guess?jsonp=getHot';
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
		//console.log(data.response);
		$scope.guessLikeOnes = data.response.guessLikeOnes;
		$scope.curPage = data.response.page.curPage;
		$scope.totalPage = data.response.page.pageAmount;
		//console.log($scope.guessLikeOnes);
	};

	$scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
		$('img').load(function () {
			$.getScript('lib/jquery/jq-waterfall.min.js',function(){
				var handler = $('.waterfall').find('li');
				handler.wookmark({
					 container     : $('.waterfall'),			// 该元素的 width 将被用于计算列的数量, 默认是 "window"
					 direction     : "left",								// 方向: "left" or "right", 从左->右或从右->左
					 itemWidth     : '48%',									// 单元项的宽度
					 flexibleWidth : '48%',								// 单元项的宽度自适应
					 fillEmptySpace : false,
					 outerOffset   : 10,
					 offset         : 10	,											// 单元项的间距
					 onLayoutChanged : function () {
						 $(".spin_refresh").hide();
						 $.getScript('lib/other/iscroll-probe.min.js',function(){
							 pullDownEl.className = '';
							 pullDownEl.innerHTML = '下拉准备刷新...';
							 loadingStep = 0;
							 myScrollHot.refresh();
							 // 加载更多数据----绑定滚动事件
							 myScrollHot.on('scroll', function () {
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
										 myScrollHot.refresh();
										 loadingStep = 1;
									 }
								 }
							 });
							 myScrollHot.on('scrollEnd',function(){
								 if(loadingStep == 1){
									 if(pullDownEl.className.match('show|loading')){
										 pullDownEl.className = 'loading';
										 pullDownEl.innerHTML = '<i class="icon-spin animate-spin"></i>';
										 loadingStep = 2;
										 getMoreGuessJson();
									 }
								 }
							 });
						 });
					 }
				 });
			});
		});
		//console.log('ngRepeatFinishedEvent');
	});

	//加载更多数据-----定义
	function getMoreGuessJson() {
		$scope.curPage = parseInt($scope.curPage) + 1;
		//console.log($scope.curPage, $scope.totalPage);

		// 判断是否显示加载更多数据
		if($scope.curPage > $scope.totalPage) {
			pullDownEl.className = 'show';
			pullDownEl.innerHTML = '没有更多数据了';
			myScrollHot.refresh();
			loadingStep = 0;
			return;
		}

		var url = 'http://handset.line0.com/ws/handset/v3/mcms/guess?jsonp=getMoreGuess';
		var param = {
			params : {
				userX: longitude,
				userY: latitude,
				cityId: cityId,
				toPage: $scope.curPage,
				pageRows: 10
			}
		};
		$http.jsonp(url, param).success();
	};

	$window.getMoreGuess = function (data) {
		//console.log(data.response);
		$scope.guessLikeOnes = $scope.guessLikeOnes.concat(data.response.guessLikeOnes);
		//console.log($scope.guessLikeOnes.length, $scope.guessLikeOnes);

		//$(".spin_refresh").show();
	};


}]);
var myDirective = angular.module('myDirective', []);

myDirective.directive('storeCate', function () {
	return {
		scope: {},
		restrict: 'AE',
		link: function (scope, element, attrs) {
			element.parent().children().first().addClass('cur');
			element.children('button').bind("tap",function(){
				//console.log(scope.$parent.$index);
				element.addClass('cur').siblings().removeClass('cur');
				$('.store-some').eq(scope.$parent.$index).show().siblings().hide();
				myScrollStoreRight.refresh();
			});
		}
	}
});

myDirective.directive('prodtypeid', function () {
	return {
		restrict: 'AE',
		scope:{},
		link: function (scope,element,attrs) {
			if(attrs.prodtypeid == '0000') {
				element.show();
			}
		}
	}
});

myDirective.directive('stockCartClick', function () {
	return {
		scope: {},
		restrict: 'AE',
		link: function (scope,element,attrs) {
			element.bind('tap', function () {
				element.hide();
				element.next().show();
				scope.this.$parent.$parent.$parent.prod.buyNum ++;
				//console.log(scope.this.$parent.$parent.$parent.prod.buyNum);
				element.next().children('.select-val').val(scope.this.$parent.$parent.$parent.prod.buyNum);
				element.next().children('.select-val').change();
			});
		}
	}
});

myDirective.directive('selectSub', function () {
	return {
		scope: {},
		restrict: 'AE',
		link: function (scope,element,attrs) {
			element.bind('tap', function () {
				scope.this.$parent.$parent.prod.buyNum --;
				if(scope.this.$parent.$parent.prod.buyNum < 0) {
					scope.this.$parent.$parent.prod.buyNum = 0;
					element.parent().hide();
					element.parent().prev().show();
				}
				element.next().val(scope.this.$parent.$parent.prod.buyNum);
				element.next().change();
			});
		}
	}
});

myDirective.directive('selectAdd', function () {
	return {
		scope: {},
		restrict: 'AE',
		link: function (scope,element,attrs) {
			element.bind('tap', function () {
				scope.this.$parent.$parent.prod.buyNum ++;
				element.prev().val(scope.this.$parent.$parent.prod.buyNum);
				element.prev().change();
			});
		}
	}
});

myDirective.directive('goodsDetailClick', function () {
	return {
		restrict: 'AE',
		replace: true,
		template: '<li ng-click="GoodsDetailCtrl()">商品信息</li>',
		link: function (scope,element,attrs) {
			element.addClass('cur').siblings().removeClass('cur');
			element.bind('click', function () {
				element.addClass('cur').siblings().removeClass('cur');
				//console.log(element.index(), $('.goods-tab'));
				$('.goods-tab').eq(element.index()).show().siblings().hide();
				$('.store-cart').show();
				$('.store-cart-mask').show();

				$.getScript('lib/other/iscroll-probe.min.js',function(){
					myScrollGoods = new IScroll('#scroller', { tap: true, preventDefault: false });
					document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
				});
			});
		}
	}
});

myDirective.directive('goodsCommentClick', function () {
	return {
		restrict: 'AE',
		replace: true,
		template: '<li ng-click="GoodsCommentCtrl()">用户评论</li>',
		link: function (scope,element,attrs) {
			element.bind('click', function () {
				element.addClass('cur').siblings().removeClass('cur');
				//console.log(element.index(), $('.goods-tab'));
				$('.goods-tab').eq(element.index()).show().siblings().hide();
				$('.store-cart').hide();
				$('.store-cart-mask').hide();

				$.getScript('lib/other/iscroll-probe.min.js',function(){
					myScrollGoods = new IScroll('#scroller', { tap: true, preventDefault: false });
					document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
					goods_detail = true;
				});
			});
		}
	}
});

myDirective.directive('goodsArticleClick', function () {
	return {
		restrict: 'AE',
		replace: true,
		template: '<li class="{{goods.ArticleShow}}" ng-click="GoodsArticleCtrl()" style="display: none;">图文详情</li>',
		link: function (scope,element,attrs) {
			element.bind('click', function () {
				element.addClass('cur').siblings().removeClass('cur');
				//console.log(element.index(), $('.goods-tab'));
				$('.goods-tab').eq(element.index()).show().siblings().hide();
				$('.store-cart').hide();
				$('.store-cart-mask').hide();

				$.getScript('lib/other/iscroll-probe.min.js',function(){
					myScrollGoods = new IScroll('#scroller', { tap: true, preventDefault: false });
					document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
					goods_detail = true;
				});
			});
		}
	}
});

myDirective.directive('onFinishRenderFilters', function ($timeout) {
	return {
		restrict: 'AE',
		link: function(scope, element, attr) {
			if (scope.$last === true) {
				element.load(function () {
					scope.$emit('ngRepeatFinished');
				});
			}
		}
	};
});

myDirective.directive('myDirective', function () {

});
var myFilter = angular.module('myFilter', []);

myFilter.filter('fixWxURL', function () {
	return function(item) {
		var str = item.replace(/zline:\/\/shop\/id=/, 'http://m.line0.com/#/store/');
		return (str);
	};
});

myFilter.filter('parseIntItem', function () {
	return function(item) {
		return (parseInt(item));
	};
});

myFilter.filter('toFixedItem', function () {
	return function(item) {
		return ((item / 1000).toFixed(1));
	};
});

myFilter.filter('toTransformBusiness', function () {
	return function(item) {
		if(item == 1) {
			return '营业';
		} else if(item == 0) {
			return '预定';
		}
	};
});

myFilter.filter('toshopNameFirst', function () {
	return function(item) {
		var patrn=/[(]{1}.*[)]{1}$/;
		//console.log(patrn.test(item));
		if (patrn.test(item)){
			return item.replace(patrn,"");
		} else {
			return item;
		}
	};
});

myFilter.filter('toshopNameLast', function () {
	return function(item) {
		var patrn=/[(]{1}.*[)]{1}$/;
		if(item != undefined) {
			//console.log(item.match(patrn));
			if (item.match(patrn)) {
				return item.match(patrn)[0];
			}
		} else {
			return undefined;
		}
	};
});

myFilter.filter('tostoreNameLine', function () {
	return function(item, param) {
		if(item == undefined) {
			return;
		}
		var item_len = item.length;
		var str_step = 0;
		var str_max = Math.ceil(param / 2);

		for(var i = 0; i < item_len; i++) {
			var temp;
			temp = item.charAt(i);
			str_step++;
			if(escape(temp).length > 4) {
				str_step++;
			}
			if(str_step >= str_max) {
				//return 'line2';
			}
		}
		if(str_step < str_max) {
			return 'line';
		}
	}
});

myFilter.filter('tostoreNameLen', function () {
	return function(item, param) {
		if(item == undefined) {
			return;
		}
		var item_len = item.length;
		var str_step = 0;
		var str_arr = new String();
		var str_max = param;

		for(var i = 0; i < item_len; i++) {
			var temp;
			temp = item.charAt(i);
			str_step++;
			if(escape(temp).length > 4) {
				str_step++;
			}
			str_arr = str_arr.concat(temp);
			if(str_step >= str_max) {
				str_arr = str_arr.concat("...");
				return str_arr;
			}
		}
		if(str_step < str_max) {
			return item;
		}
	}
});
var myService = angular.module('myService', []);

myService.service('myService_1', ['$scope', function ($scope) {

}]);
myService.service('myService_2', ['$scope', function ($scope) {

}]);