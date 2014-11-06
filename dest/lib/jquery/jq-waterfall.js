// JavaScript Document

/**
 * TODO:瀑布流插件
 * © 2014 by WXYCooL http://www.wxycool.com/
 * v1.0 2014-08-01
 */
!function ($) {

	var __bind;
	var defaultOptions;
	var Wookmark;
	var $window = $(window);

	__bind = function(fn, me) {
		return function() {
			return fn.apply(me, arguments);
		};
	};

	// 默认选项
	defaultOptions = {
		container: $('body'),						// 该元素的 width 将被用于计算列的数量, 默认是 "window"
		align: 'center',								// 对齐: "left", "right", 或 "center"
		direction: undefined,						// 方向: "left" or "right", 从左->右或从右->左
		comparator: null,								// 指定自定义排序函数
		outerOffset: 0,									// container的内间距
		itemWidth: 0,										// 单元项的宽度
		flexibleWidth: 0,								// 单元项的宽度自适应
		offset: 2,											// 单元项的间距
		verticalOffset: undefined,			// 单元项的垂直间距
		fillEmptySpace: true,						// 如果设置为 "true", 在每一列的底部创建占位符(placeholder),以创建相等的布局
		onLayoutChanged: undefined,			// 回调函数, 当所有的布局改变后调用
		autoResize: true,								// 当浏览器大小改变时会自动更新布局
		resizeDelay: 50,								// 浏览器大小改变事件间隔
		ignoreInactiveItems: true,			// 忽略不活跃的单元项
		possibleFilters: []							// 过滤器数组
	};

	// 如果支持requestAnimationFrame则执行，否则用css写入dom函数执行
	var executeNextFrame = window.requestAnimationFrame || function(callback) {callback();};

	// 大批更新CSS
	function bulkUpdateCSS(data) {
		executeNextFrame(function() {
			var i, item;
			for (i = 0; i < data.length; i++) {
				item = data[i];
				item.obj.css(item.css);
			}
		});
	}

	// 整理过滤器类名
	function cleanFilterName(filterName) {
		return $.trim(filterName).toLowerCase();
	}

	// 主要的插件方法
	Wookmark = (function() {
		function Wookmark(handler, options) {
			this.itemHeightsDirty = true;	// 高度开关
			this.handler = handler;					// DOM句柄
			this.resizeTimer = null;				// resize定时器函数
			this.columns = null;						// 列数数组
			this.placeholders = [];					// 占位符数组
			this.activeItemCount = 0;				// 活动项目总数

			$.extend(true, this, defaultOptions, options);

			this.verticalOffset = this.verticalOffset || this.offset;

			// 绑定实例方法
			this.updateFilterClasses = __bind(this.updateFilterClasses, this);
			this.filter = __bind(this.filter, this);
			this.onResize = __bind(this.onResize, this);
			this.onRefresh = __bind(this.onRefresh, this);
			this.update = __bind(this.update, this);
			this.layout = __bind(this.layout, this);
			this.getItemWidth = __bind(this.getItemWidth, this);
			this.getActiveItems = __bind(this.getActiveItems, this);
			this.layoutFull = __bind(this.layoutFull, this);
			this.layoutColumns = __bind(this.layoutColumns, this);
			this.sortElements = __bind(this.sortElements, this);
			this.refreshPlaceholders = __bind(this.refreshPlaceholders, this);
			this.clear = __bind(this.clear, this);

			// 最初更新过滤器类名
			this.updateFilterClasses();

			// 监听resize事件
			if(this.autoResize) {
				$window.bind('resize.wookmark', this.onResize);
			}

			// 监听内容刷新事件
			this.container.bind('refreshWookmark', this.onRefresh);
		};

		// 更新过滤器类名方法
		Wookmark.prototype.updateFilterClasses = function() {
			console.log('updateFilterClasses');
			// 收集过滤器数据
			var i = 0, j = 0, k = 0;
			var $item;																			//
			var itemFilterClasses;													//
			var filterClass;																//
			var filterClasses = {};													//
			var possibleFilter;															//
			var possibleFilters = this.possibleFilters;			//

			for (; i < this.handler.length; i++) {
				$item = this.handler.eq(i);

				// 读取过滤器类以及全局存储他们
				itemFilterClasses = $item.data('filterClass');
				if (typeof itemFilterClasses == 'object' && itemFilterClasses.length > 0) {
					for (j = 0; j < itemFilterClasses.length; j++) {
						filterClass = cleanFilterName(itemFilterClasses[j]);
						if (typeof(filterClasses[filterClass]) === 'undefined') {
							filterClasses[filterClass] = [];
						}
						filterClasses[filterClass].push($item[0]);
					}
				}
			}

			for (; k < possibleFilters.length; k++) {
				possibleFilter = cleanFilterName(possibleFilters[k]);
				if (!(possibleFilter in filterClasses)) {
					filterClasses[possibleFilter] = [];
				}
			}

			this.filterClasses = filterClasses;
		};

		// 浏览器Resize方法
		Wookmark.prototype.onResize = function() {
			console.log('onResize');
			clearTimeout(this.resizeTimer);
			this.itemHeightsDirty = this.flexibleWidth !== 0;
			this.resizeTimer = setTimeout(this.layout, this.resizeDelay);
		};

		// 标记项目修改后的高度和布局
		Wookmark.prototype.onRefresh = function() {
			console.log('onRefresh');
			this.itemHeightsDirty = true;
			this.layout();
		};

		// 更新插件选项方法
		Wookmark.prototype.update = function(options) {
			console.log('update');
			this.itemHeightsDirty = true;
			$.extend(true, this, options);
		};

		// 主要布局方法
		Wookmark.prototype.layout = function(force) {
			console.log('layout');
			// 当内容区域隐藏时什么都不做
			if(!this.container.is(':visible')) {
				return;
			}
			var offset = 0;																															//
			var maxHeight = 0;																													//
			var i = 0;																																	//
			var $item;																																	//
			var columnWidth = parseFloat(this.getItemWidth()) + this.offset;						//
			var containerWidth = this.container.width();																//
			var innerWidth = containerWidth - 2 * this.outerOffset;											//
			var columns = ~~((innerWidth + this.offset) / columnWidth);									//
			var activeItems = this.getActiveItems();																		//
			var activeItemsLength = activeItems.length;																	//

			// 缓存项目高度
			if (this.itemHeightsDirty || !this.container.data('itemHeightsInitialized')) {
				for (; i < activeItemsLength; i++) {
					$item = activeItems.eq(i);
					$item.data('wookmark-height', $item.outerHeight());
				}
				this.itemHeightsDirty = false;
				this.container.data('itemHeightsInitialized', true);
			}

			// 当太少的项目时使用最小的列数
			columns = Math.max(1, Math.min(columns, activeItemsLength));

			// 基于内容区居中对齐列计算偏移量
			offset = this.outerOffset;
			if (this.align == 'center') {
				offset += ~~(0.5 + (innerWidth - (columns * columnWidth - this.offset)) >> 1);
			}

			// 获取内容区对齐方式
			this.direction = this.direction || (this.align == 'right' ? 'right' : 'left');

			// 如果内容区和列总数没有改变，则只更新列
			if (!force && this.columns !== null && this.columns.length == columns && this.activeItemCount == activeItemsLength) {
				maxHeight = this.layoutColumns(columnWidth, offset);
			} else {
				maxHeight = this.layoutFull(columnWidth, columns, offset);
			}
			this.activeItemCount = activeItemsLength;

			// 设置内容区域的高度
			this.container.css('height', maxHeight);

			// 更新占位符
			if (this.fillEmptySpace) {
				this.refreshPlaceholders(columnWidth, offset);
			}

			if (this.onLayoutChanged !== undefined && typeof this.onLayoutChanged === 'function') {
				this.onLayoutChanged();
			}
		};

		// 获得项目标准宽度的方法
		Wookmark.prototype.getItemWidth = function() {
			console.log('getItemWidth');
			var itemWidth = this.itemWidth;																			//
			var innerWidth = this.container.width() - 2 * this.outerOffset;		//
			var firstElement = this.handler.eq(0);															//
			var flexibleWidth = this.flexibleWidth;															//

			if (this.itemWidth === undefined || this.itemWidth === 0 && !this.flexibleWidth) {
				itemWidth = firstElement.outerWidth();
			} else if (typeof this.itemWidth == 'string' && this.itemWidth.indexOf('%') >= 0) {
				itemWidth = parseFloat(this.itemWidth) / 100 * innerWidth;
			}

			// 如果设置了自适应，则计算项目的宽度
			if (flexibleWidth) {
				if (typeof flexibleWidth == 'string' && flexibleWidth.indexOf('%') >= 0) {
					flexibleWidth = parseFloat(flexibleWidth) / 100 * innerWidth;
				}

				// 查找最高列
				var paddedInnerWidth = (innerWidth + this.offset);																												//容器的宽度
				var flexibleColumns = ~~(0.5 + paddedInnerWidth / (flexibleWidth + this.offset));													//自适应宽度的列数
				var fixedColumns = ~~(paddedInnerWidth / (itemWidth + this.offset));																			//固定宽度的列数
				var columns = Math.max(flexibleColumns, fixedColumns);																										//选用最大的列数
				var columnWidth = Math.min(flexibleWidth, ~~((innerWidth - (columns - 1) * this.offset) / columns));			//选用最小的宽度
				itemWidth = Math.max(itemWidth, columnWidth);
				// 按计算的宽度拉抻项目
				this.handler.css('width', itemWidth);
			}
			return itemWidth;
		};

		// 获取活动项目的方法
		Wookmark.prototype.getActiveItems = function() {
			console.log('getActiveItems');
			return this.ignoreInactiveItems ? this.handler.not('.inactive') : this.handler;
		};

		// 执行完整的布局的方法
		Wookmark.prototype.layoutFull = function(columnWidth, columns, offset) {
			console.log('layoutFull');
			var i = 0;																															//
			var k = 0;																															//
			var $item;																															//
			var shortest = null;																										//
			var shortestIndex = null;																								//
			var sideOffset;																													//
			var heights = [];																												//
			var itemBulkCSS = [];																										//
			var activeItems = $.makeArray(this.getActiveItems());										//
			var length = activeItems.length;																				//
			var leftAligned = this.align == 'left' ? true : false;								//

			this.columns = [];

			// 布局前先排序
			activeItems = this.sortElements(activeItems);

			// 准备数组来存储列和项目高度
			while (heights.length < columns) {
				heights.push(this.outerOffset);
				this.columns.push([]);
			}

			// 循环项目
			for (; i < length; i++ ) {
				$item = $(activeItems[i]);
				// 找到最短的列
				shortest = heights[0];
				shortestIndex = 0;
				for (k = 0; k < columns; k++) {
					if (heights[k] < shortest) {
						shortest = heights[k];
						shortestIndex = k;
					}
				}
				$item.data('wookmark-top', shortest);
				// 如果左侧对齐方式并且第一列，则坚持左对齐
				sideOffset = offset;
				if(shortestIndex > 0 || !leftAligned) {
					sideOffset += shortestIndex * columnWidth;
				}
				// 定位项目
				(itemBulkCSS[i] = {
					obj: $item,
					css: {
						position: 'absolute',
						top: shortest
					}
				}).css[this.direction] = sideOffset;

				// 更新列的高度并且存储项目在最短的列
				heights[shortestIndex] += $item.data('wookmark-height') + this.verticalOffset;
				this.columns[shortestIndex].push($item);
			}

			bulkUpdateCSS(itemBulkCSS);
			// 返回最高的列
			return Math.max.apply(Math, heights);
		};

		// 执行完整的布局的方法（当更新现有列垂直定位）
		Wookmark.prototype.layoutColumns = function(columnWidth, offset) {
			console.log('layoutColumns');
			var i = 0;																															//
			var k = 0;																															//
			var j = 0;																															//
			var currentHeight;																											//
			var $item;																															//
			var heights = [];																												//
			var itemBulkCSS = [];																										//
			var sideOffset;																													//
			var column;																															//
			var itemData;																														//

			for (; i < this.columns.length; i++) {
				heights.push(this.outerOffset);
				column = this.columns[i];
				sideOffset = i * columnWidth + offset;
				currentHeight = heights[i];

				for (k = 0; k < column.length; k++, j++) {
					$item = column[k].data('wookmark-top', currentHeight);
					(itemBulkCSS[j] = {
						obj: $item,
						css: {
							top: currentHeight
						}
					}).css[this.direction] = sideOffset;
					currentHeight += $item.data('wookmark-height') + this.verticalOffset;
				}
				heights[i] = currentHeight;
			}

			bulkUpdateCSS(itemBulkCSS);

			// 返回最高的列
			return Math.max.apply(Math, heights);
		};

		// 配置排序的方法
		Wookmark.prototype.sortElements = function(elements) {
			console.log('sortElements');
			return typeof(this.comparator) === 'function' ? elements.sort(this.comparator) : elements;
		};

		// 创建或更新占位符到每列的方法
		Wookmark.prototype.refreshPlaceholders = function(columnWidth, sideOffset) {
			console.log('refreshPlaceholders');
			var height;
			var top;
			var innerOffset;
			var column;
			var $placeholder;
			var $lastColumnItem;
			var i = this.placeholders.length;
			var columnsLength = this.columns.length;
			var containerHeight = this.container.innerHeight();

			for (; i < columnsLength; i++) {
				$placeholder = $('<div class="wookmark-placeholder"/>').appendTo(this.container);
				this.placeholders.push($placeholder);
			}

			innerOffset = this.offset + parseInt(this.placeholders[0].css('borderLeftWidth'), 10) * 2;

			for (i = 0; i < this.placeholders.length; i++) {
				$placeholder = this.placeholders[i];
				column = this.columns[i];

				if (i >= columnsLength || !column[column.length - 1]) {
					$placeholder.css('display', 'none');
				} else {
					$lastColumnItem = column[column.length - 1];
					if(!$lastColumnItem) {
						continue;
					}
					top = $lastColumnItem.data('wookmark-top') + $lastColumnItem.data('wookmark-height') + this.verticalOffset;
					height = containerHeight - top - innerOffset;

					$placeholder.css({
						position: 'absolute',
						display: height > 0 ? 'block' : 'none',
						left: i * columnWidth + sideOffset,
						top: top,
						width: columnWidth - innerOffset,
						height: height
				 });
				}
			}
		};

		// 清除事件监听
		Wookmark.prototype.clear = function() {
			console.log('clear');
			clearTimeout(this.resizeTimer);
			$window.unbind('resize.wookmark', this.onResize);
			this.container.unbind('refreshWookmark', this.onRefresh);
			this.handler.wookmarkInstance = null;
		};

		// 跟据字符串过滤活动项目
		Wookmark.prototype.filter = function(filters, mode, dryRun) {
			console.log('filter');

			var i, j, k;
			var filter;
			var activeFiltersLength;
			var activeFilters = [];
			var activeItems = $();

			filters = filters || [];
			mode = mode || 'or';
			dryRun = dryRun || false;

			if (filters.length) {
				// 收集活动项目
				for (i = 0; i < filters.length; i++) {
					filter = cleanFilterName(filters[i]);
					if (filter in this.filterClasses) {
						activeFilters.push(this.filterClasses[filter]);
					}
				}

				// 选择模式获取活动项目
				activeFiltersLength = activeFilters.length;
				if (mode == 'or' || activeFiltersLength == 1) {
					for (i = 0; i < activeFiltersLength; i++) {
						activeItems = activeItems.add(activeFilters[i]);
					}
				} else if (mode == 'and') {
					var shortestFilter = activeFilters[0],
						itemValid = true, foundInFilter,
						currentItem, currentFilter;

					// 找到最短的过滤类
					for (i = 1; i < activeFiltersLength; i++) {
						if (activeFilters[i].length < shortestFilter.length) {
							shortestFilter = activeFilters[i];
						}
					}

					// 遍历最短的过滤类找到其它过滤类中的元素
					shortestFilter = shortestFilter || [];
					for (i = 0; i < shortestFilter.length; i++) {
						currentItem = shortestFilter[i];
						itemValid = true;

						for (j = 0; j < activeFilters.length && itemValid; j++) {
							currentFilter = activeFilters[j];
							if (shortestFilter == currentFilter) continue;

							// 在每个活动过滤类中查找当前项目
							for (k = 0, foundInFilter = false; k < currentFilter.length && !foundInFilter; k++) {
								foundInFilter = currentFilter[k] == currentItem;
							}
							itemValid &= foundInFilter;
						}
						if (itemValid)
							activeItems.push(shortestFilter[i]);
					}
				}
				// 隐藏不活动项目
				if (!dryRun)
					this.handler.not(activeItems).addClass('inactive');
			} else {
				// 如果没有选择过滤器则显示全部
				activeItems = this.handler;
			}

			// 显示活动项目
			if (!dryRun) {
				activeItems.removeClass('inactive');
				// 卸载列和刷新布局
				this.columns = null;
				this.layout();
			}
			return activeItems;
		};

		return Wookmark;
	})();

	$.fn.wookmark = function(options) {
		// 如果不存在，则创建一个wookmark实例。如果存在，则更新实例
		if (!this.wookmarkInstance) {
			this.wookmarkInstance = new Wookmark(this, options || {});
		} else {
			this.wookmarkInstance.update(options || {});
		}
		// 应用布局
		this.wookmarkInstance.layout(true);
		// 显示项目(如果隐藏)并返回jQuery对象来维持链能力
		return this.show();
	};

}(jQuery);