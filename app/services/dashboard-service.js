angular.module('polderweb')
  .factory('DashBoard',
  ['GLOBALS', '$http', '$rootScope','$q','userService',
    function (GLOBALS, $http, $rootScope,$q,userService)
     {
      var currentUser = userService.get(); //20150801
      var lastId="";
      var myDashBoard = new TDashBoard();
      return {
        findAll: function () {
            var defer = $q.defer();
            userService.get().$promise.then(function(res){
                myDashBoard.fromObject({Bedrijf : res.bedrijf,DashBoard : '', Omschrijving : ''});
                Service.SvcDashBoard("R", currentUser.username, myDashBoard, function(result) {
                    defer.resolve(result.toObject());
                });
            });
             return defer.promise;
        },
        getDashBoard: function (dashboardId) {
            var defer = $q.defer();
             userService.get().$promise.then(function(res){
             myDashBoard.fromObject({Bedrijf : res.bedrijf,DashBoard : dashboardId, Omschrijving : ''});
             //myDashBoard.fromObject({Bedrijf : res.bedrijf,DashBoard : '', Omschrijving : ''});
             Service.SvcDashBoard("R", currentUser.username, myDashBoard, function(result) {
                var data = _.find(result.toObject(), {'DashBoard':dashboardId});
                defer.resolve(data);
             });
            });
            return defer.promise;
        },
        addDashBoard: function (dashboardData) {
           userService.get().$promise.then(function(res){
                myDashBoard.fromObject({Bedrijf : res.bedrijf,DashBoard : dashboardData.DashBoard, Omschrijving : dashboardData.Omschrijving});
                Service.SvcDashBoard("C", currentUser.username, myDashBoard);
            });

        },
        updateDashBoard:function(dashboardData){
           userService.get().$promise.then(function(res){
                myDashBoard.fromObject({Bedrijf : res.bedrijf,DashBoard : dashboardData.DashBoard, Omschrijving : dashboardData.Omschrijving});
                Service.SvcDashBoard("U", currentUser.username, myDashBoard);
            });
        },

        delDashBoard: function(DashBoard,Omschrijving){

            var delDashBoardPromise = $q.defer();

            userService.get().$promise.then(function(res){
                myDashBoard.fromObject({Bedrijf : res.bedrijf,DashBoard : DashBoard, Omschrijving : Omschrijving});
                Service.SvcDashBoard("D", currentUser.username, myDashBoard, function(result){
                    console.log(result);

                    delDashBoardPromise.resolve(result)
                });
            });

            return delDashBoardPromise.promise;



          // _.remove($rootScope.dashboard,function(dashboards){
          //   return dashboards.dashboard===dashboardId;
          // });
        },
        nextDashBoard:function(dashboardId, cb){
          var index=_.findIndex($rootScope.dashboard, function(dashboards){
            return dashboards.DashBoard===dashboardId;
          });
          if(index===-1 || index+1 >= $rootScope.dashboard.length){
           // return cb();
           return cb($rootScope.dashboard[0]);
          }
          return cb($rootScope.dashboard[index+1]);
        },
        preDashBoard:function(dashboardId, cb){
          var index=_.findIndex($rootScope.dashboard, function(dashboards){
            return dashboards.DashBoard===dashboardId;
          });
          if(index===-1 || index===0){
           // return cb();
           return cb($rootScope.dashboard[0]);
          }
          return cb($rootScope.dashboard[index-1]);
        }
      };
    }]);
