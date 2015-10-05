angular.module('polderweb')
  .factory('DashBoard',
  ['GLOBALS', '$http', '$rootScope','$q','userService',
    function (GLOBALS, $http, $rootScope,$q,userService)
     {
      var currentUser = userService.get(); //20150801
      var lastId="";
      var myDashBoard = new TDashBoard();
      return {
//      getDashBoard: function () {
        findAll: function ($cookieStore) {
            var defer = $q.defer();
             userService.get().$promise.then(function(res){
               myDashBoard.fromObject({Bedrijf : res.bedrijf
			                         , Aantal : 0
			                         , Bedrag : 0
			                         , Omschrijving : ''
			                         , Periode : 0
			                         , Vlag1 : false
			                         , Vlag2 : false
			                         , Vlag3 : false
			                         , Vlag4 : false
									 });
               Service.SvcDashBoard("R", currentUser.username, myDashBoard, function(result) {
                    defer.resolve(result.toObject());
//          alert(JSON.stringify(result.toObject()));
               });
            });
            return defer.promise;
        }
      };
    }]);
