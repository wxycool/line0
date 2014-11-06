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