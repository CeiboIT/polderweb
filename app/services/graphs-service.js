angular.module('polderweb')
  .factory('Graphs',
  ['GLOBALS', '$http', '$rootScope','$q','userService',
    function (GLOBALS, $http, $rootScope,$q,userService)
     {
      var currentUser = userService.get(); //20150801
      var myGraph1 = new TGraph1();
      var myGraph2 = new TGraph2();
      return {
        getGraph1: function () {
            var defer = $q.defer();
             userService.get().then(function(res){
             myGraph1.fromObject({
                Bedrijf : res.Bedrijf,
                Column1 : 0,
                Column2 : 0
             });

             Service.SvcCategorie("R", res.Username, myGraph1, function(result) {
                var data = _.find(result.toObject(), {});
                defer.resolve(data);
             });
            });
            return defer.promise;
        },
        getGraph2: function () {
            var defer = $q.defer();
             userService.get().then(function(res){
             myGraph2.fromObject({
                Bedrijf : res.Bedrijf,
                Column1 : 0,
                Column2 : 0
             });

             Service.SvcCategorie("R", res.Username, myGraph2, function(result) {
                var data = _.find(result.toObject(), {});
                defer.resolve(data);
             });
            });
            return defer.promise;
        },

      };
    }]);
