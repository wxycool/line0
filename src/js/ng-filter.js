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