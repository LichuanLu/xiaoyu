'use strict';
angular.module('angularMoment', [])
	.filter('amFormat', function() {
		return function(mObj, format) {
			if(!mObj){
				return '';
			}
			if(typeof mObj === 'string'){
				mObj = moment(mObj);
			}
			return mObj.format(format);
		};
	})
	.filter('amRangeFormat', function() {
		return function(mObj,format,duration) {
			if(!mObj){
				return '';
			}
			if(typeof mObj === 'string'){
				mObj = moment(mObj);
			}
			var endTime = angular.copy(mObj);
			endTime.add(duration);
			return mObj.format(format) + ' ~ ' + endTime.format(format);
		};

	})
	.filter('amSingleFormat', function() {
		return function(mObj, params) {
			if(!mObj){
				return '';
			}
			if(typeof mObj === 'string'){
				mObj = moment(mObj);
			}
			var res = '';
			switch (params) {
				case 'week':
					res = mObj.week();
					break;
				case 'date':
					res = mObj.date();
					break;
				case 'day':
					res = mObj.day();
					break;
				case 'weekdaysMin':
					res = moment.weekdaysMin(mObj.day());
					break;
			}
			return res;
		};
	});