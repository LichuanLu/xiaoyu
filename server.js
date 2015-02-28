//template can be refer to https://github.com/chovy/express-template-demo/blob/master/demo/app.js
//var gaModel = require('./models/generalAdminModel');
//console.log("load models"+gaModel);
"use strict";
var template_engine = 'dust',
  domain = 'localhost';
var express = require('express'),
  http = require('http'),
  path = require('path');
var fs = require('fs');
var sleep = require('sleep');
//var engines = require('consolidate');
//var dust = require('express-dust-linkedin');

var app = module.exports = express();


//var dust = require('dustjs-linkedin'), cons = require('consolidate');

//app.engine('dust',cons.dust);
if (template_engine == 'dust') {
  var dust = require('dustjs-linkedin'),
    cons = require('consolidate');

  app.engine('dust', cons.dust);

} else if (template_engine == 'ejs') {
  app.engine('ejs', engine);
} else if (template_engine == 'swig') {
  var swig = require('swig'),
    cons = require('consolidate');

  app.engine('swig', cons.swig);
  //app.set('view engine', 'html');
}



app.configure(function() {
  // body...
  //app.set('template_engine','dust');
  app.set('template_engine', template_engine);
  app.set('domain', domain);
  app.set('port', 3335);

  //app.use(express.static(__dirname + '/'));

  // app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/server_template');
  app.set('view engine', template_engine);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  //app.use(express.cookieParser('wigglybits'));
  //app.use(express.session({ secret: 'whatever', store: store }));
  //app.use(express.session());
  //app.use(app.router);
  //app.use(require('less-middleware')({ src: __dirname + '/public' }));
  //app.use(express.static(path.join(__dirname, 'static/')));
  app.use(express.static(path.join(__dirname, '/')));


  http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
  });

  app.get('/index', function(req, res) {
    res.render('index');
  });


  app.get('/rest/UserCar/:id/ListCar', function(req, res) {
    console.log(req.query.type);
    var data = [{
      "car": {
        "id": 1,
        "name": "卡宴",
        "parent": null,
        "pic": "",
        "status": 1,
        "type": 1
      },
      "carNo": "京N 88888",
      "color": '蓝色',
      "createdTime": "2014年-10月-31日 12:27:19",
      "default": true,
      "id": 1,
      "status": 0,
      "type": 0
    }, {
      "car": {
        "id": 2,
        "name": "大奔",
        "parent": null,
        "pic": "",
        "status": 1,
        "type": 2
      },
      "carNo": "京J 99999",
      "color": '黑色',
      "createdTime": "2014年-10月-30日 12:27:19",
      "default": false,
      "id": 2,
      "status": 0,
      "type": 1
    }];
    res.send({
      errorCode: 0,
      errorDescription: "测试",
      item: data
    });
  });

  app.post('/rest/UserCar/Update', function(req, res) {
    console.log(req.body);
    var result = {
      errorCode: 0,
      errorDescription: "",
      item: "SUCESS"
    };
    res.send(result);

  });

  app.get('/rest/UserCar/:carId/Delete', function(req, res) {
    console.log(req.params.carId);
    var result = {
      errorCode: 0,
      errorDescription: "",
      item: "SUCESS"
    };
    res.send(result);

  });

  app.get('/rest/UserAddress/:locationId/Delete', function(req, res) {
    console.log(req.params.locationId);
    var result = {
      errorCode: 0,
      errorDescription: "",
      item: "SUCESS"
    };
    res.send(result);

  });



  app.post('/rest/UserCar/Add', function(req, res) {
    console.log(req.body);
    var data = {
      "car": {
        "id": 8,
        "name": "卡宴8",
        "parent": null,
        "pic": "",
        "status": 8,
        "type": 8
      },
      "carNo": "京N 11111",
      "color": 'hei色',
      "createdTime": "2014年-10月-31日 12:27:19",
      "default": true,
      "id": 8,
      "status": 0,
      "type": 0
    };
    var result = {
      errorCode: 0,
      errorDescription: "",
      item: data
    };
    res.send(result);

  });
  app.get('/rest/Car/:parentId/ListCars', function(req, res) {
    console.log(req.params.parentId);
    if (req.params.parentId == 0) {
      var data = [{
        "id": 2,
        "name": "宝马",
        "pic": "",
        "status": 1,
        "type": 1 //大型车//中型车//小型车//
      }, {
        "id": 3,
        "name": "保时捷",
        "pic": "",
        "status": 1,
        "type": 1
      }];
    } else {
      var data = [{
        "id": 5,
        "name": "X6",
        "pic": "",
        "status": 1,
        "type": 1 //大型车//中型车//小型车//
      }, {
        "id": 6,
        "name": "i520",
        "pic": "",
        "status": 1,
        "type": 1
      }];

    }
    res.send({
      errorCode: 0,
      errorDescription: "",
      item: data
    });

  });

  app.get('/rest/UserAddress/:userId/ListAddresses', function(req, res) {
    console.log(req.params.userId);
    var data = [{
      "address": {
        "id": 1,
        "name": "北京人家",
        "parent": {
          "id": 3,
          "name": "北京",
          "parent": null,
          "status": 0,
          "type": 0
        },
        "status": 0,
        "type": 0
      },
      "comment": "车库365号",
      "default": true,
      "id": 1,
      "status": 1,
      "type": 1
    }, {
      "address": {
        "id": 2,
        "name": "龙华园",
        "parent": {
          "id": 3,
          "name": "北京",
          "parent": null,
          "status": 0,
          "type": 0
        },
        "status": 0,
        "type": 0
      },
      "comment": "3号楼3单元楼下",
      "default": false,
      "id": 2,
      "status": 1,
      "type": 1
    }];
    res.send({
      errorCode: 0,
      errorDescription: "11",
      item: data
    });

  });
  app.get('/rest/Address/:areaId/ListAddresses', function(req, res) {
    console.log(req.params.areaId);
    var data = [{
      "class": "com.cars.core.model.Address",
      "id": 1,
      "name": "北京人家",
      "status": 0,
      "type": 0
    }, {
      "class": "com.cars.core.model.Address",
      "id": 2,
      "name": "龙腾苑五区",
      "status": 0,
      "type": 0
    }];

    res.send({
      errorCode: 0,
      errorDescription: "",
      item: data
    });

  });

  app.post('/rest/UserAddress/Update', function(req, res) {
    console.log(req.body);
    var result = {
      errorCode: 0,
      errorDescription: "",
      item: "SUCESS"
    };
    res.send(result);

  });


  app.post('/rest/User/Update', function(req, res) {
    console.log(req.body);
    var result = {
      errorCode: 0,
      errorDescription: "",
      item: "SUCESS"
    };
    res.send(result);

  });

  app.get('/rest/Order/:orderId/OrderStatus/:userId/:statusId', function(req, res) {
    console.log(req.params);
    var result = {
      errorCode: 0,
      errorDescription: "",
      item: "SUCESS"
    };
    res.send(result);

  });


  app.get('/rest/Order/User/:userId/Car/:carId/OrderPrice', function(req, res) {
    console.log(req.params);
    var result = {
      errorCode: 0,
      errorDescription: "",
      item: 120
    };
    res.send(result);

  });

  app.get('/rest/Order/Car/:carId/Duration/:durationId/OrderPrice', function(req, res) {
    console.log(req.params);
    var result = {
      errorCode: 0,
      errorDescription: "",
      item: 520
    };
    res.send(result);

  });



  app.post('/rest/UserAddress/Add', function(req, res) {
    console.log(req.body);
    var data = {
      "address": {
        "id": 1,
        "name": "清河橡树湾",
        "parent": {
          "id": 3,
          "name": "北京",
          "parent": null,
          "status": 0,
          "type": 0
        },
        "status": 0,
        "type": 0
      },
      "comment": "13号楼365号",
      "default": true,
      "id": 1,
      "status": 1,
      "type": 1
    };
    var result = {
      errorCode: 0,
      errorDescription: "",
      item: data
    };
    res.send(result);

  });

  app.post('/rest/Order/Add', function(req, res) {
    console.log(req.body);
    var data = {
      "countPrice": 100,
      "endOrderTime": null,
      "id": 3,
      "washStartTime":"2014-11-12 09:00:00",
      "orderStatus": [],
      "duration":6,
      "startOrderTime": "2013-11-12 09:00:00",
      "status": "",
      "type": 2,
      "isVip":"",
      "user": {
        "createdDate": null,
        "id": 1,
        "money": 0,
        "name": "",
        "phone": "",
        "points": 0,
        "role": null,
        "sex": 0,
        "status": 0,
        "times": 0,
        "type": 0,
        "updatedDate": null,
        "weixinId": "",
        "weixinToken": ""
      },
      "userAddress": {
        "address": null,
        "comment": "",
        "default": false,
        "id": 3,
        "status": 0,
        "type": 0,
        "user": null
      },
      "userCar": {
        "car": null,
        "carNo": "",
        "color": "",
        "createdTime": null,
        "default": false,
        "id": 1,
        "status": 0,
        "type": 0,
        "user": null
      }
    };

    var result = {
      errorCode: 0,
      errorDescription: "",
      item: data
    };
    res.send(result);

  });

  app.get('/rest/User/:userId/View', function(req, res) {
    console.log(req.params.userId);
    var data = {
      "createdDate": "2014年-10月-31日 12:25:37",
      "id": 1,
      "money": 12,
      "name": "刘伟光",
      "phone": "18601391001",
      "points": 8888,
      "role": {
        "id": 1,
        "name": "用户",
        "status": "1",
        "type": 1
      },
      "sex": 1,
      "status": 1,
      "times": 221,
      "type": 1,
      "updatedDate": "2014年-10月-31日 12:26:14",
      "weixinId": "12",
      "weixinToken": "132132123"
    };

    res.send({
      errorCode: 0,
      errorDescription: "",
      item: data
    });

  });


  app.get('/rest/User/:weixinId/Id', function(req, res) {
    console.log(req.params.weixinId);
    var data = {
      userId: 1
    };

    res.send({
      errorCode: 0,
      errorDescription: "",
      item: data
    });

  });

  app.get('/rest/Bill/:userId/MyBills', function(req, res) {
      console.log(req.params.userId);
      var data = [{
        "billDate": "2014-11-04 16:15:12",
        "class": "com.cars.core.model.Bill",
        "id": 1,
        "message": "消费",
        "money": 130,
        "order": {
          "class": "com.cars.core.model.Order",
          "comment": "",
          "countPrice": 0,
          "endOrderTime": null,
          "id": 0,
          "startOrderTime": null,
          "status": 0,
          "type": 1,
          "user": null,
          "userAddress": null,
          "userCar": null,
          "washStartTime": null
        },
        "point": 0,
        "status": 0,
        "type": 0,
        "user": null
      }, {
        "billDate": "2014-11-13 00:42:21",
        "class": "com.cars.core.model.Bill",
        "id": 6,
        "message": "充值",
        "money": 20,
        "order": {
          "class": "com.cars.core.model.Order",
          "comment": "",
          "countPrice": 0,
          "endOrderTime": null,
          "id": 0,
          "startOrderTime": null,
          "status": 0,
          "type": 1,
          "user": null,
          "userAddress": null,
          "userCar": null,
          "washStartTime": null
        },
        "point": 0,
        "status": 0,
        "type": 0,
        "user": null
      }];
    

  res.send({
    errorCode: 0,
    errorDescription: "",
    item: data
  });

});


app.get('/rest/Activity/ListAll', function(req, res) {
  var data = [{
    "activityName": "充10元获15雨点",
    "id": 1,
    "inMoney": 10,
    "outPoints": 15,
    "status": 0,
    "type": 0
  }, {
    "activityName": "充20元获30雨点",
    "id": 2,
    "inMoney": 20,
    "outPoints": 30,
    "status": 0,
    "type": 0
  }, {
    "activityName": "充100元获300雨点",
    "id": 3,
    "inMoney": 100,
    "outPoints": 300,
    "status": 0,
    "type": 0
  }, {
    "activityName": "充200元获700雨点",
    "id": 4,
    "inMoney": 200,
    "outPoints": 700,
    "status": 0,
    "type": 0
  }];

  res.send({
    errorCode: 0,
    errorDescription: "",
    item: data
  });

});

app.post('/rest/Activity/:userId/:activityId/Recharge', function(req, res) {
  console.log(req.params.userId);
  console.log(req.params.activityId);
  var data = {
    id: 12345
  };
  var result = {
    errorCode: 0,
    errorDescription: "",
    item: data
  };
  res.send(result);

});

app.get('/rest/Order/UserCar/:carId/UserAddress/:locationId/OrderPrice', function(req, res) {
  console.log(req.params.carId);
  console.log(req.params.locationId);
  if (req.params.carId == 2) {
    var data = 100;
  } else {
    var data = 100;
  }

  res.send({
    errorCode: 0,
    errorDescription: "",
    item: data
  });

});

app.get('/rest/Order/:orderId/view', function(req, res) {
  console.log(req.params.uid);
  var data = {
    "countPrice": 200,
    "endOrderTime": null,
    'washStartTime': '2014-10-12 03:00:00',
    "id": 1,
    "orderStatus": [],
    "startOrderTime": "2014年-11月-03日 10:34:24",
    "status": 4,
    "type": 3,
    "score":'',
    "comments":[{
      "comment":'测试'
    }],
    "washer":{
      "id":"1",
      "name": "刘伟光",
      "phone": "18601391001"
    },
    "pictures":[{
      'pictureUrl':'/static/images/xiaoyu_icon_logo.png'
    },
    {
      'pictureUrl':'/static/images/xiaoyu_icon_logo.png'
    },
    {
      'pictureUrl':'/static/images/xiaoyu_icon_logo.png'
    },
    {
      'pictureUrl':'/static/images/xiaoyu_icon_logo.png'
    }],
    "user": { //用户信息
      "createdDate": "2014年-10月-31日 12:25:37",
      "id": 1,
      "money": 12,
      "name": "刘伟光",
      "phone": "18601391001",
      "points": 8888888,
      "role": null,
      "sex": 1,
      "status": 1,
      "times": 221,
      "type": 1,
      "updatedDate": "2014年-10月-31日 12:26:14",
      "weixinId": "12",
      "weixinToken": "132132123"
    },
    "userAddress": { //用户默认地址
      "address": {
        'id': 1,
        'name': '曙光花园小区',
        'parent': {
          'id': 3,
          'name': '北京',
          'parent': null,
          'status': 0,
          'type': 0
        },
        'status': 0,
        'type': 0
      },
      "comment": "地下车库205",
      "default": true,
      "id": 3,
      "status": 2,
      "type": 2,
      "user": null
    },
    "userCar": 
    {
      "car": {
        "id": 2,
        "name": "大奔",
        "parent": null,
        "pic": "",
        "status": 1,
        "type": 2
      },
      "carNo": "京J 99999",
      "color": '黑色',
      "createdTime": "2014年-10月-30日 12:27:19",
      "default": false,
      "id": 2,
      "status": 0,
      "type": 1
    }

  };

    


  res.send({
    errorCode: 0,
    errorDescription: "",
    item: data
  });
});



app.get('/rest/Order/:uid/DefaultOrder', function(req, res) {
  console.log(req.params.uid);
  var data = {


    "countPrice": 0,
    "endOrderTime": null,
    "id": 0,
    "orderStatus": [],
    "startOrderTime": "2014年-11月-03日 10:34:24",
    "status": 0,
    "type": 0,
    "user": { //用户信息
      "createdDate": "2014年-10月-31日 12:25:37",
      "id": 1,
      "money": 12,
      "name": "刘伟光",
      "phone": "18601391001",
      "points": 8888888,
      "role": null,
      "sex": 1,
      "status": 1,
      "times": 221,
      "type": 1,
      "updatedDate": "2014年-10月-31日 12:26:14",
      "weixinId": "12",
      "weixinToken": "132132123"
    },
    "userAddress": { //用户默认地址
      "address": {
        'id': 1,
        'name': '曙光花园小区',
        'parent': {
          'id': 3,
          'name': '北京',
          'parent': null,
          'status': 0,
          'type': 0
        },
        'status': 0,
        'type': 0
      },
      "comment": "地下车库205",
      "default": true,
      "id": 3,
      "status": 2,
      "type": 2,
      "user": null
    },
    "userCar": { //用户默认车辆
      "car": {
        'id': 4,
        'name': '丰田霸道',
        'parent': null,
        'pic': '',
        'status': 1,
        'type': 2
      },
      "carNo": "京B 88888",
      "color": 0,
      "createdTime": "2014年-10月-31日 12:27:19",
      "default": true,
      "id": 1,
      "status": 0,
      "type": 0,
      "user": null
    }

  };

  res.send({
    errorCode: 0,
    errorDescription: "",
    item: data
  });
});



app.get('/rest/time/address/:addressId/occupiedTime',function(req,res){
  var data = [{
    'time':'2014-12-31 09:00:00.000'
  },
  {
    'time':'2015-01-07 22:00:00.000'
  },
  {
    'time':'2015-01-12 10:00:00.000'
  },
  {
    'time':'2015-01-22 12:00:00.000'
  },
  {
    'time':'2015-02-04 19:00:00.000'
  }];
  res.send({
    errorCode: 0,
    errorDescription: "",
    item: data
  });


});






app.get('/rest/Activity/user/:userId/ListAll',function(req,res){
  console.log(req.params);
  // var data = [{
  //    'id': 1,
  //    'startDate':'2014/10/12',
  //    'endDate':'2014/12/12',
  //    'name':'',
  //    'type': 3 , //代金卷1，打折卷2 ,  免费洗车 3 
  //    'count':'' ,  //代金卷是钱 ，打折卷是比例 60 就是60% 
  //    'status':0  // 0 有效  1 删除 2 无效
  // },
  // {
  //   'id': 2,
  //    'startDate':'2014/10/12',
  //    'endDate':'2015/01/12',
  //    'name':'',
  //    'type': 3 , //代金卷1，打折卷2 ,  免费洗车 3 
  //    'count':'' ,  //代金卷是钱 ，打折卷是比例 60 就是60% 
  //    'status':0  // 0 有效  1 删除 2 无效
  // }];
  var data = [   
  {
    "activity":     {
      "activityName": "免费洗车一次",
      "discount": 0,
      "id": 1,
      "inMoney": 0,
      "outPoints": 0,
      "picUrl": "/static/images/xiaoyu_icon_youhuiquan.png",
      "status": 0,
      "type": 3,
      "washPoints": 0
    },
    "endDate": "2015年-01月-31日",
    "id": 1,
    "name": "免费洗车一次",
    "startDate": "2015年-01月-28日",
    "status": 0,
    "type": 0,
    "useDate": null,
    "user":     {
      "badgeId": "1",
      "createdDate": "2015年-01月-26日 18:49:30",
      "email": "xuyanbj@cn.ibm.com",
      "id": 1,
      "money": 11,
      "name": "xuyan",
      "password": "1",
      "phone": "18511897539",
      "points": 2,
      "role":       {
        "id": 2,
        "name": "洗车员",
        "status": "0",
        "type": 0
      },
      "sex": 1,
      "status": 0,
      "times": 2,
      "type": 0,
      "updatedDate": "2015年-01月-26日 18:50:18",
      "weixinId": "zz",
      "weixinToken": "zz"
    }
  },
  {
    "activity":     {
      "activityName": "免费洗车一次",
      "discount": 0,
      "id": 1,
      "inMoney": 0,
      "outPoints": 0,
      "picUrl": "/static/images/xiaoyu_icon_youhuiquan.png",
      "status": 0,
      "type": 3,
      "washPoints": 0
    },
    "endDate": "2015年-01月-31日",
    "id": 2,
    "name": "免费洗车一次",
    "startDate": "2015年-01月-28日",
    "status": 0,
    "type": 0,
    "useDate": null,
    "user":     {
      "badgeId": "1",
      "createdDate": "2015年-01月-26日 18:49:30",
      "email": "xuyanbj@cn.ibm.com",
      "id": 1,
      "money": 11,
      "name": "xuyan",
      "password": "1",
      "phone": "18511897539",
      "points": 2,
      "role":       {
        "id": 2,
        "name": "洗车员",
        "status": "0",
        "type": 0
      },
      "sex": 1,
      "status": 0,
      "times": 2,
      "type": 0,
      "updatedDate": "2015年-01月-26日 18:50:18",
      "weixinId": "zz",
      "weixinToken": "zz"
    }
  }

  ];
  res.send({
    errorCode: 0,
    errorDescription: "",
    item: data
  });


});



app.get('/rest/Order/:userId/MyOrders', function(req, res) {
console.log(req.params.userId);
var data = [{
  "countPrice": 100,
  "endOrderTime": null,
  "id": 1,
  'washStartTime': '2014-10-12 3:00',
  'comment': '无',
  "startOrderTime": "2014年-11月-04日 21:21:02",
  "status": 1,
  "type": 2,
  "user": {
    "createdDate": "2014年-10月-31日 12:25:37",
    "id": 1,
    "money": 12,
    "name": "刘伟光",
    "phone": "18601391001",
    "points": 8888888,
    "role": null,
    "sex": 1,
    "status": 1,
    "times": 221,
    "type": 1,
    "updatedDate": "2014年-10月-31日 12:26:14",
    "weixinId": "12",
    "weixinToken": "132132123"
  },
  "userAddress": {
    'address': {
      'id': 1,
      'name': '曙光花园小区',
      'parent': {
        'id': 3,
        'name': '北京',
        'parent': null,
        'status': 0,
        'type': 0
      },
      'status': 0,
      'type': 0
    },
    "comment": "车库306",
    "default": false,
    "id": 1,
    "status": 0,
    "type": 0,
    "user": null
  },
  "userCar": {
    'car': {
      'id': 4,
      'name': '丰田霸道',
      'parent': null,
      'pic': '',
      'status': 1,
      'type': 2
    },
    "carNo": "京A 88888",
    "color": "黑色",
    "createdTime": "2014年-10月-31日 12:27:19",
    "default": true,
    "id": 1,
    "status": 0,
    "type": 0,
    "user": null
  }
}, {
  "countPrice": 100,
  "endOrderTime": null,
  "id": 2,
  'washStartTime': '2014-10-12 3:00',
  'duration': 1,
  "startOrderTime": "2014年-11月-04日 21:21:02",
  "status": 2,
  "type": 3,
  "user": {
    "createdDate": "2014年-10月-31日 12:25:37",
    "id": 1,
    "money": 12,
    "name": "刘伟光",
    "phone": "18601391001",
    "points": 8888888,
    "role": null,
    "sex": 1,
    "status": 1,
    "times": 221,
    "type": 1,
    "updatedDate": "2014年-10月-31日 12:26:14",
    "weixinId": "12",
    "weixinToken": "132132123"
  },
  "userAddress": {
    "address": null,
    "comment": "2134234",
    "default": true,
    "id": 3,
    "status": 2,
    "type": 2,
    "user": null
  },
  "userCar": {
    'car': {
      'id': 4,
      'name': '丰田霸道',
      'parent': null,
      'pic': '',
      'status': 1,
      'type': 2
    },
    "carNo": "京A 88888",
    "color": "黑色",
    "createdTime": "2014年-10月-31日 12:27:19",
    "default": true,
    "id": 1,
    "status": 0,
    "type": 0,
    "user": null
  }
}, {
  "countPrice": 100,
  "endOrderTime": null,
  "id": 3,
  "startOrderTime": "2014年-11月-04日 21:21:02",
  "status": 3,
  "type": 2,
  "user": {
    "createdDate": "2014年-10月-31日 12:25:37",
    "id": 1,
    "money": 12,
    "name": "刘伟光",
    "phone": "18601391001",
    "points": 8888888,
    "role": null,
    "sex": 1,
    "status": 1,
    "times": 221,
    "type": 1,
    "updatedDate": "2014年-10月-31日 12:26:14",
    "weixinId": "12",
    "weixinToken": "132132123"
  },
  "userAddress": {
    "address": null,
    "comment": "2134234",
    "default": true,
    "id": 3,
    "status": 2,
    "type": 2,
    "user": null
  },
  "userCar": {
    "car": null,
    "carNo": "88888",
    "color": "黑色",
    "createdTime": "2014年-10月-31日 12:27:19",
    "default": true,
    "id": 1,
    "status": 0,
    "type": 0,
    "user": null
  }
}, {
  "countPrice": 100,
  "endOrderTime": null,
  "id": 4,
  "startOrderTime": "2014年-11月-04日 21:21:02",
  "status": 4,
  "type": 2,
  "user": {
    "createdDate": "2014年-10月-31日 12:25:37",
    "id": 1,
    "money": 12,
    "name": "刘伟光",
    "phone": "18601391001",
    "points": 8888888,
    "role": null,
    "sex": 1,
    "status": 1,
    "times": 221,
    "type": 1,
    "updatedDate": "2014年-10月-31日 12:26:14",
    "weixinId": "12",
    "weixinToken": "132132123"
  },
  "userAddress": {
    "address": null,
    "comment": "2134234",
    "default": true,
    "id": 3,
    "status": 2,
    "type": 2,
    "user": null
  },
  "userCar": {
    "car": null,
    "carNo": "884488",
    "color": "黑色",
    "createdTime": "2014年-10月-31日 12:27:19",
    "default": true,
    "id": 1,
    "status": 0,
    "type": 0,
    "user": null
  }
}, {
  "countPrice": 100,
  "endOrderTime": null,
  "id": 5,
  "startOrderTime": "2014年-11月-04日 21:21:02",
  "status": 7,
  "type": 2,
  "user": {
    "createdDate": "2014年-10月-31日 12:25:37",
    "id": 1,
    "money": 12,
    "name": "刘伟光",
    "phone": "18601391001",
    "points": 8888888,
    "role": null,
    "sex": 1,
    "status": 1,
    "times": 221,
    "type": 1,
    "updatedDate": "2014年-10月-31日 12:26:14",
    "weixinId": "12",
    "weixinToken": "132132123"
  },
  "userAddress": {
    "address": null,
    "comment": "2134234",
    "default": true,
    "id": 3,
    "status": 2,
    "type": 2,
    "user": null
  },
  "userCar": {
    "car": null,
    "carNo": "886788",
    "color": "黑色",
    "createdTime": "2014年-10月-31日 12:27:19",
    "default": true,
    "id": 1,
    "status": 0,
    "type": 0,
    "user": null
  }
}, {
  "countPrice": 100,
  "endOrderTime": null,
  "id": 6,
  "startOrderTime": "2014年-11月-04日 21:21:02",
  "status": 6,
  "type": 2,
  "user": {
    "createdDate": "2014年-10月-31日 12:25:37",
    "id": 1,
    "money": 12,
    "name": "刘伟光",
    "phone": "18601391001",
    "points": 8888888,
    "role": null,
    "sex": 1,
    "status": 1,
    "times": 221,
    "type": 1,
    "updatedDate": "2014年-10月-31日 12:26:14",
    "weixinId": "12",
    "weixinToken": "132132123"
  },
  "userAddress": {
    "address": {
      'id': 1,
      'name': '曙光花园小区',
      'parent': {
        'id': 3,
        'name': '北京',
        'parent': null,
        'status': 0,
        'type': 0
      },
      'status': 0,
      'type': 0
    },
    "comment": "2134234",
    "default": true,
    "id": 3,
    "status": 2,
    "type": 2,
    "user": null
  },
  "userCar": {
    "car": {
      'id': 4,
      'name': '丰田霸道',
      'parent': null,
      'pic': '',
      'status': 1,
      'type': 2
    },
    "carNo": "88888",
    "color": "黑色",
    "createdTime": "2014年-10月-31日 12:27:19",
    "default": true,
    "id": 1,
    "status": 0,
    "type": 0,
    "user": null
  }
}];

res.send({
  errorCode: 0,
  errorDescription: "",
  item: data
});

});




app.post('/rest/Order/:userId/:orderId/comment',function (req,res) {
  console.log(req.params);
  console.log(req.body);
  var result = {
      errorCode: 0,
      errorDescription: "",
      item: "SUCESS"
    };
    res.send(result);
   
});

app.get('/rest/Order/:userId/MyLongTerms', function(req, res) {
console.log(req.params.userId);
var data = [{
  "countPrice": 100,
  "endOrderTime": null,
  "id": 1,
  'washStartTime': '2014/10/12 3:00',
  'comment': '无',
  "startOrderTime": "2014年-11月-04日 21:21:02",
  "status": 1,
  "type": 3,
  "user": {
    "createdDate": "2014年-10月-31日 12:25:37",
    "id": 1,
    "money": 12,
    "name": "刘伟光",
    "phone": "18601391001",
    "points": 8888888,
    "role": null,
    "sex": 1,
    "status": 1,
    "times": 221,
    "type": 1,
    "updatedDate": "2014年-10月-31日 12:26:14",
    "weixinId": "12",
    "weixinToken": "132132123"
  },
  "userAddress": {
    'address': {
      'id': 1,
      'name': '曙光花园小区',
      'parent': {
        'id': 3,
        'name': '北京',
        'parent': null,
        'status': 0,
        'type': 0
      },
      'status': 0,
      'type': 0
    },
    "comment": "车库306",
    "default": false,
    "id": 1,
    "status": 0,
    "type": 0,
    "user": null
  },
  "userCar": {
    'car': {
      'id': 4,
      'name': '丰田霸道',
      'parent': null,
      'pic': '',
      'status': 1,
      'type': 2
    },
    "carNo": "京A 88888",
    "color": "黑色",
    "createdTime": "2014年-10月-31日 12:27:19",
    "default": true,
    "id": 1,
    "status": 0,
    "type": 0,
    "user": null
  }
}, {
  "countPrice": 100,
  "endOrderTime": null,
  "id": 2,
  "startOrderTime": "2014年-11月-04日 21:21:02",
  "status": 2,
  "type": 3,
  "user": {
    "createdDate": "2014年-10月-31日 12:25:37",
    "id": 1,
    "money": 12,
    "name": "刘伟光",
    "phone": "18601391001",
    "points": 8888888,
    "role": null,
    "sex": 1,
    "status": 1,
    "times": 221,
    "type": 1,
    "updatedDate": "2014年-10月-31日 12:26:14",
    "weixinId": "12",
    "weixinToken": "132132123"
  },
  "userAddress": {
    "address": null,
    "comment": "2134234",
    "default": true,
    "id": 3,
    "status": 2,
    "type": 2,
    "user": null
  },
  "userCar": {
    "car": null,
    "carNo": "88888",
    "color": "黑色",
    "createdTime": "2014年-10月-31日 12:27:19",
    "default": true,
    "id": 1,
    "status": 0,
    "type": 0,
    "user": null
  }
}, {
  "countPrice": 100,
  "endOrderTime": null,
  "id": 3,
  "startOrderTime": "2014年-11月-04日 21:21:02",
  "status": 7,
  "type": 3,
  "user": {
    "createdDate": "2014年-10月-31日 12:25:37",
    "id": 1,
    "money": 12,
    "name": "刘伟光",
    "phone": "18601391001",
    "points": 8888888,
    "role": null,
    "sex": 1,
    "status": 1,
    "times": 221,
    "type": 1,
    "updatedDate": "2014年-10月-31日 12:26:14",
    "weixinId": "12",
    "weixinToken": "132132123"
  },
  "userAddress": {
    "address": null,
    "comment": "2134234",
    "default": true,
    "id": 3,
    "status": 2,
    "type": 2,
    "user": null
  },
  "userCar": {
    "car": null,
    "carNo": "86688",
    "color": "黑色",
    "createdTime": "2014年-10月-31日 12:27:19",
    "default": true,
    "id": 1,
    "status": 0,
    "type": 0,
    "user": null
  }
}, {
  "countPrice": 100,
  "endOrderTime": null,
  "id": 4,
  "startOrderTime": "2014年-11月-04日 21:21:02",
  "status": 4,
  "type": 3,
  "user": {
    "createdDate": "2014年-10月-31日 12:25:37",
    "id": 1,
    "money": 12,
    "name": "刘伟光",
    "phone": "18601391001",
    "points": 8888888,
    "role": null,
    "sex": 1,
    "status": 1,
    "times": 221,
    "type": 1,
    "updatedDate": "2014年-10月-31日 12:26:14",
    "weixinId": "12",
    "weixinToken": "132132123"
  },
  "userAddress": {
    "address": null,
    "comment": "2134234",
    "default": true,
    "id": 3,
    "status": 2,
    "type": 2,
    "user": null
  },
  "userCar": {
    "car": null,
    "carNo": "88788",
    "color": "黑色",
    "createdTime": "2014年-10月-31日 12:27:19",
    "default": true,
    "id": 1,
    "status": 0,
    "type": 0,
    "user": null
  }
}, {
  "countPrice": 100,
  "endOrderTime": null,
  "id": 5,
  "startOrderTime": "2014年-11月-04日 21:21:02",
  "status": 5,
  "type": 3,
  "user": {
    "createdDate": "2014年-10月-31日 12:25:37",
    "id": 1,
    "money": 12,
    "name": "刘伟光",
    "phone": "18601391001",
    "points": 8888888,
    "role": null,
    "sex": 1,
    "status": 1,
    "times": 221,
    "type": 1,
    "updatedDate": "2014年-10月-31日 12:26:14",
    "weixinId": "12",
    "weixinToken": "132132123"
  },
  "userAddress": {
    "address": null,
    "comment": "2134234",
    "default": true,
    "id": 3,
    "status": 2,
    "type": 2,
    "user": null
  },
  "userCar": {
    "car": null,
    "carNo": "88888",
    "color": "黑色",
    "createdTime": "2014年-10月-31日 12:27:19",
    "default": true,
    "id": 1,
    "status": 0,
    "type": 0,
    "user": null
  }
}, {
  "countPrice": 100,
  "endOrderTime": null,
  "id": 6,
  "startOrderTime": "2014年-11月-04日 21:21:02",
  "status": 6,
  "type": 3,
  "user": {
    "createdDate": "2014年-10月-31日 12:25:37",
    "id": 1,
    "money": 12,
    "name": "刘伟光",
    "phone": "18601391001",
    "points": 8888888,
    "role": null,
    "sex": 1,
    "status": 1,
    "times": 221,
    "type": 1,
    "updatedDate": "2014年-10月-31日 12:26:14",
    "weixinId": "12",
    "weixinToken": "132132123"
  },
  "userAddress": {
    "address": {
      'id': 1,
      'name': '曙光花园小区',
      'parent': {
        'id': 3,
        'name': '北京',
        'parent': null,
        'status': 0,
        'type': 0
      },
      'status': 0,
      'type': 0
    },
    "comment": "2134234",
    "default": true,
    "id": 3,
    "status": 2,
    "type": 2,
    "user": null
  },
  "userCar": {
    "car": {
      'id': 4,
      'name': '丰田霸道',
      'parent': null,
      'pic': '',
      'status': 1,
      'type': 2
    },
    "carNo": "88888",
    "color": "黑色",
    "createdTime": "2014年-10月-31日 12:27:19",
    "default": true,
    "id": 1,
    "status": 0,
    "type": 0,
    "user": null
  }
}];

res.send({
  errorCode: 0,
  errorDescription: "",
  item: data
});

});


});