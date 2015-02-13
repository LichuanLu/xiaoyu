'use strict';

//car page major controller
angular.module('xiaoyuApp.order')
	.controller('orderTimeController', ['$scope', '$filter','$state','$stateParams','$previousState','CaptureService', '$templateCache',
		'$log', 'orderService', 'defaultTimeConfig',

		function($scope,$filter,$state,$stateParams,$previousState,CaptureService, $templateCache, $log, orderService, defaultTimeConfig) {
			$log.log('orderTimeController init');

			$scope.generateTimeList = function(mObj, startTimeArr, endTimeArr, duration) {
				var startTime = moment([mObj.year(), mObj.month(), mObj.date(), startTimeArr[0], startTimeArr[1], startTimeArr[2]]);
				var endTime = moment([mObj.year(), mObj.month(), mObj.date(), endTimeArr[0], endTimeArr[1], endTimeArr[2]]);
				var tempTime = startTime;
				var resArr = [];
				while (tempTime.isBefore(endTime)) {
					var temp = angular.copy(tempTime);
					var status = tempTime.isBefore($scope.curr)?1:0;
					resArr.push({
						'status': status,
						'time': temp
					});
					tempTime.add(duration);
				}
				return resArr;
			};

			$scope.generateDateList = function() {
				$scope.currDateList = [];
				$scope.currDateList.push(angular.copy($scope.firstday));
				$scope.currTimeHash = {};
				$scope.currTimeHash[$scope.firstday.format('YYYY-MM-DD')] = {
					'count': 0,
					'timelist': $scope.generateTimeList($scope.firstday, startTime, endTime, dur)
				};

				$scope.currTimeList = $scope.currTimeHash[$scope.firstday.format('YYYY-MM-DD')].timelist;
				$scope.selectedDate.value = 0;

				for (var i = 1; i < 7; i++) {
					var temp = angular.copy($scope.firstday.add(1, 'day'));
					$scope.currDateList.push(temp);
					$scope.currTimeHash[temp.format('YYYY-MM-DD')] = {
						'count': 0,
						'timelist': $scope.generateTimeList(temp, startTime, endTime, dur)
					};

				}

				orderService.getOccupiedTimes($scope.addressId).then(function(data) {
					$log.log(data);
					if (data && data instanceof Array && data.length > 0) {
						data.forEach(function(element, index, array) {
							if (element.time) {
								var tempTime = moment(element.time);
								var step = -1;
								if (dur.hours()) {
									step = (tempTime.hour() - startTime[0]) / dur.hours();
								} else if (dur.minutes()) {
									step = ((tempTime.hour() - startTime[0]) * 60 + (tempTime.minute() - startTime[1])) / dur.minutes();
								}
								if (step !== -1) {
									var tempTimeFormat = tempTime.format('YYYY-MM-DD');
									if ($scope.currTimeHash.hasOwnProperty(tempTimeFormat)) {
										$scope.currTimeHash[tempTimeFormat].timelist[step].status = 1;
										$scope.currTimeHash[tempTimeFormat].count++;
									}
								}
							}
						});
					}
				});
			};

			$scope.addressId = $stateParams.addressId;

			//init selected time , if select change this
			$scope.selectedTime = {
				'time': ''
			};

			$scope.selectedDate = {
				'value': -1
			};

			$scope.showPreDateButton = false;

			(moment.locale || moment.lang)('zh-cn');

			//give access from parent to child
			//$scope.setOrderTimeScope($scope);

			// var first = curr.getDate() - curr.getDay()+1; // First day is the day of the month - the day of the week
			// var last = first + 6; // last day is the first day + 6

			// var firstday = new Date(curr.setDate(first)).toUTCString();
			// var lastday = new Date(curr.setDate(last)).toUTCString();

			// $log.log(firstday);
			// $log.log(lastday);
			//should change to const
			var startTime = defaultTimeConfig.startTime;
			var endTime = defaultTimeConfig.endTime;
			var dur = defaultTimeConfig.duration;


			$scope.curr = moment(); // get current date , 选中时间后改变这个，这个绑定title
			//duration
			$scope.dur = dur;

			$scope.firstday = angular.copy($scope.curr);

			//generate date time list
			$scope.generateDateList();

			// mobi scroll code
			// $scope.scroller = {
			// 	visible: false,
			// 	options: {
			// 		preset: 'datetime',
			// 		stepMinute: 30,
			// 		theme: 'sense-ui',
			// 		accent: 'none',
			// 		display: 'bottom',
			// 		mode: 'scroller',
			// 		lang: 'zh',
			// 		dateFormat: 'yyyy-mm-dd',
			// 		minDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours() + 1, 0),
			// 		showNow: true,
			// 		invalid: [
			// 			{
			// 				start: '23:31',
			// 				end: '00:00'
			// 			},
			// 			{
			// 				start: '00:00',
			// 				end: '06:59'
			// 			}
			// 		]
			// 	},
			// 	valueText: ''
			// };



			$scope.initLayout = function() {
				// var rawContent = $templateCache.get('/static/app/common/backBtn.tpl.html');
				// var title = '<span>洗车时间</span>';
				// // var saveRawContent = $templateCache.get('/static/app/common/saveBtn.tpl.html');

				// CaptureService.setContentFor('title', title, $scope);
				// CaptureService.setContentFor('leftbtn', rawContent[1], $scope);
				// CaptureService.setContentFor('rightbtn', '', $scope);
			};

			$scope.backAction = function() {
				$log.log('back action start');
				//call parent function to reverse change
				// $scope.resetWashStartTime();
				// $scope.toggleShow('orderTime');
				$previousState.go();
			};

			$scope.saveAction = function() {
				if ($scope.selectedTime.time == '') {
					alert('请选择时间');
				} else {
					//$log.log('save time:' + $scope.selectedTime.time.format('MMMD日HH:mm'));
					//var res = $scope.selectedTime.time.format('MMMD日') + $filter('amRangeFormat')($scope.selectedTime.time,'HH:mm',$scope.dur);
					var res = $scope.selectedTime.time.format('YYYY-MM-DD HH:mm:ss');
					$scope.setWashStartTime(res);
					$previousState.go();
					// $scope.toggleShow('orderTime');
					// updateOrderService.updateOrderTime($scope.selectedTime.time.format('MMMD日HH:mm'));
				}

			};

			$scope.nextWeekAction = function() {
				$scope.curr.add(7, 'day');
				$scope.showPreDateButton = true;
				$scope.firstday = angular.copy($scope.curr);
				$scope.generateDateList();
			};

			$scope.preWeekAction = function() {
				$scope.curr.add(-7, 'day');
				var now = moment();
				if ($scope.curr.isSame(now) || $scope.curr.isBefore(now)) {
					$scope.showPreDateButton = false;
				}
				$scope.firstday = angular.copy($scope.curr);
				$scope.generateDateList();
			};

			$scope.selectDateAction = function(index, dateObj) {
				$scope.selectedDate.value = index;
				$scope.currTimeList = $scope.currTimeHash[dateObj.format('YYYY-MM-DD')].timelist;

			};

		}
	]);