angular.module('polderweb')
  .factory('DashBoard',
  ['GLOBALS', '$http', '$rootScope','$q','userService',
    function (GLOBALS, $http, $rootScope,$q,userService)
     {
      var currentUser = userService.get(); //20150801
      var lastId="";
      var myDashBoard = new TDashBoard();
      return {

        getDashBoard: function () {
            var defer = $q.defer();
             userService.get().$promise.then(function(res){
               myDashBoard.fromObject({Bedrijf : res.bedrijf, Omschrijving : ''});
               Service.SvcDashBoard("R", currentUser.username, myDashBoard, function(result) {
                    defer.resolve(result.toObject());
               });
            });
            return defer.promise;
        }

      };
    }]);
