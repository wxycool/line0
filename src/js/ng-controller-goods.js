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
