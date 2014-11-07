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
		var url = 'http://handset.line0.com/ws/handset/v3/shop/shopDetail?jsonp=getStore&clientFlag=line0123456789abcdef987opqxyzline0&cityId=' + cityId + '&userX=' + longitude + '&userY=' + latitude + '&shopId=' + $stateParams.sid;
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
				var url = 'http://handset.line0.com/ws/handset/v3/shop/productList?jsonp=getStoreCate&clientFlag=line0123456789abcdef987opqxyzline0&shopId=' + $rootScope.storeId + '&shopProdTypeId=' + $scope.cate[i].typeId;
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
