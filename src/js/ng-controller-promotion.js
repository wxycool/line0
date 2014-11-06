myCtrl.controller('PromotionCtrl', ['$scope', function ($scope) {
	$scope.pageClass="promotion";
	$scope.title = "优惠专区";
}]);

myCtrl.controller('PromotionMainCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {
	var loadingStep = 0;
	var pullDownEl = document.getElementById('shop-list-pullDown');

	$scope.StatePromotionMain = false;
	$scope.StatePromotionRefresh = true;

	getLocation(getPromotionJson);
	function getPromotionJson() {
		//var url = '../data/promotion.json?jsonp=getPromotion';
		var url = 'http://handset.line0.com/ws/handset/v3/mcms/promotion?jsonp=getPromotion';
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
	$window.getPromotion = function (data) {
		//console.log(data.response);
		$scope.promotions = data.response.shopList;
		$scope.curPage = data.response.page.curPage;
		$scope.totalPage = data.response.page.pageAmount;
		//console.log($scope.promotions);

		imgLen = data.response.shopList.length * 3;

		$scope.StatePromotionMain = true;
		$scope.StatePromotionRefresh = false;

	};

	$.getScript('lib/other/iscroll-probe.min.js',function() {
		myScrollOne = new IScroll('#scroller', { tap: true, preventDefault: false, probeType: 2 });
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	});

	$scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
		//console.log('start');
		$.getScript('lib/other/iscroll-probe.min.js',function() {
			$(".spin_refresh").hide();
			pullDownEl.className = '';
			pullDownEl.innerHTML = '下拉准备刷新...';
			loadingStep = 0;
			myScrollOne.refresh();
			// 加载更多数据----绑定滚动事件
			myScrollOne.on('scroll', function () {
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
						myScrollOne.refresh();
						loadingStep = 1;
					}
				}
			});
			myScrollOne.on('scrollEnd',function(){
				if(loadingStep == 1){
					if(pullDownEl.className.match('show|loading')){
						pullDownEl.className = 'loading';
						pullDownEl.innerHTML = '<i class="icon-spin animate-spin"></i>';
						loadingStep = 2;
						getMorePromotionJson();
					}
				}
			});
		});
	});

	//加载更多数据-----定义
	function getMorePromotionJson() {
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

		var url = 'http://handset.line0.com/ws/handset/v3/mcms/promotion?jsonp=getMorePromotion';
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

	$window.getMorePromotion = function (data) {
		imgLen = data.response.shopList.length * 3;
		//console.log(data.response);
		$scope.promotions = $scope.promotions.concat(data.response.shopList);
		//console.log($scope.promotions.length, $scope.promotions);
	};

}]);