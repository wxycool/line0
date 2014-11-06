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

	if(!cookie.get('firestLogin')) {
		$scope.firstLogin = true;
		cookie.set('firestLogin', 1, 24*30*365);
	}

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


	$scope.IndexFirstLogin = function () {
		$scope.firstLogin = false;
	};
}]);