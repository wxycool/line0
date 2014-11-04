// JavaScript Document
"use strict";

var myScrollIndex;
var myScrollSearch;
var myScrollCate;
var myScrollStoreLeft;
var myScrollStoreRight;
var myScrollStored;
var myScrollGoods;

//var cityId = 1;
//var latitude = 32.0572355;
//var longitude = 118.77807441;

var cityId = null;
var latitude = null;
var longitude = null;

function trim(value) {
	return value.replace(/^\s+|\s+$/g, '')
}

$(document).ready(function() {

});

function init() {

}

window.onload = init;

//getLocation();
function getLocation(callback) {
	//console.log(latitude, longitude, cityId);
	if(latitude != null && longitude != null && cityId != null) {	//都有值
		//console.log(0);
		(callback && typeof(callback) === "function") && callback();
	} else {
		latitude = cookie.get('latitude');
		longitude = cookie.get('longitude');
		cityId = cookie.get('cityId');
		//console.log(latitude, longitude, cityId);
		if(latitude != null && longitude != null && cityId != null) {	//cookie都有值
			//console.log(1);
			(callback && typeof(callback) === "function") && callback();
		} else {
			//console.log(2);
			getLocationFromBaidu(callback);
		}
	}
}

	/**
	 * TODO:GPS定位
	 */
function getLocationFromBaidu(callback) {
	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(cur_pos){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			latitude = cur_pos.point.lat;
			longitude = cur_pos.point.lng;
			//console.log(latitude, longitude);
			//32.0572355 118.77807441
			cookie.set('latitude', latitude);
			cookie.set('longitude', longitude);
			var geoc = new BMap.Geocoder();
			geoc.getLocation(cur_pos.point, function(rs){
				var cityName = rs.addressComponents.city;
				switch(cityName) {
					case '南京市':
						cityId = 1;
						cookie.set('cityId', 1);
						break;
					case '上海市':
						cityId = 5;
						cookie.set('cityId', 5);
						break;
					case '苏州市':
						cityId = 2;
						cookie.set('cityId', 2);
						break;
					default:
				}
				//console.log(cityId, rs.address);
				(callback && typeof(callback) === "function") && callback();
			});
		} else {
			alert('failed' + this.getStatus());
		}
	},{enableHighAccuracy: true})
}

/**
 * TODO:Cookie
 */
/*
	cookie.set('_cityid', 'nj');
 */
var cookie = {
	get : function(name) {
		var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		if(arr != null) {
			return unescape(arr[2]);
		} else {
			return null;
		}
	},
	set : function(name, value, time) {
		var Hour = time || 1;
		var exp = new Date();
		exp.setTime(exp.getTime() + Hour*60*60*1000);
		document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString();
	}
};