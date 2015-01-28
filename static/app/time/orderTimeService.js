'use strict';
angular.module('xiaoyuApp.order')
	.value('defaultTimeConfig', {
		'startTime': [8, 0, 0],
		'endTime': [23, 0, 0],
		'duration': moment.duration({
			hours: 1
		})
	});