'use strict';

//car related service
angular.module('xiaoyuApp')
	.factory('dateTimeService', ['$filter','$log',
		function($filter,$log) {
			var getCurrentDateTime = function() {
				var now = new Date();
				var month = (now.getMonth() + 1);
				var day = now.getDate();
				if (month < 10) {
					month = '0' + month;
				}

				if (day < 10) {
					day = '0' + day;
				}

				var today = now.getFullYear() + '-' + month + '-' + day;
				return today;
			};

			var getOrderWashTimeStr = function(orderObj,dur) {
				//充值 //洗车 // 包月 //1//2/3
				var result = '';
				var washStartTime = orderObj.washStartTime;
				var startOrderTime = orderObj.startOrderTime;
				if (typeof washStartTime === 'string') {
					washStartTime = moment(washStartTime);
				}
				if (typeof startOrderTime === 'string') {
					startOrderTime = moment(startOrderTime);
				}
				
				if (orderObj.type == 2) {
					result = washStartTime.format('MMMD日') +' '+$filter('amRangeFormat')(washStartTime, 'HH:mm', dur);
				} else if (orderObj.type == 3) {
					if (!orderObj.duration) {
						$log.log('error:orderObj.duration is null');
					}
					var duration = moment.duration({
						months: orderObj.duration
					});
					result = $filter('amRangeFormat')(startOrderTime, 'YYYY-MM-DD', duration);
				}
				return result;
			};

			return {
				getCurrentDateTime: getCurrentDateTime,
				getOrderWashTimeStr: getOrderWashTimeStr
			};
		}
	]);