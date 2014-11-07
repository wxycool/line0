myCtrl.controller('HotCtrl', ['$scope', function ($scope) {
	$scope.pageClass="hot";
	$scope.title = "热销美食";
}]);

myCtrl.controller('HotMainCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {
	var loadingStep = 0;
	var pullDownEl = document.getElementById('shop-list-pullDown');

	$scope.StateHotMain = true;
	$scope.StateHotRefresh = true;
	$.getScript('lib/other/iscroll-probe.min.js',function(){
		myScrollHot = new IScroll('#scroller', { tap: true, preventDefault: false, probeType: 2 });
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	});

	getLocation(getHotJson);
	function getHotJson() {
		//var url = '../data/guess.json?jsonp=getHot';
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

		imgLen = data.response.guessLikeOnes.length;
	};

	$scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
		//$('img').load(function () {
		//console.log('start');
		$.getScript('lib/jquery/jq-waterfall.min.js',function(){
			var handler = $('.waterfall').find('li');
			handler.wookmark({
				container				: $('.waterfall'),			// 该元素的 width 将被用于计算列的数量, 默认是 "window"
				direction				: "left",								// 方向: "left" or "right", 从左->右或从右->左
				itemWidth				: '48%',									// 单元项的宽度
				flexibleWidth		: '48%',								// 单元项的宽度自适应
				fillEmptySpace		: false,
				outerOffset			: 10,
				offset						: 10,											// 单元项的间距
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
		//});
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
		imgLen = data.response.guessLikeOnes.length;
		//console.log(data.response);
		$scope.guessLikeOnes = $scope.guessLikeOnes.concat(data.response.guessLikeOnes);
		//console.log($scope.guessLikeOnes.length, $scope.guessLikeOnes);

		//$(".spin_refresh").show();
	};


}]);