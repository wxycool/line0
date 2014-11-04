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