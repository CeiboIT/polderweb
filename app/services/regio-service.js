angular.module('polderweb')
  .factory('Regio',
  ['GLOBALS', '$http', '$rootScope','$q','userService',
    function (GLOBALS, $http, $rootScope,$q,userService)
     {
      var currentUser = userService.get(); //20150801
 	  var lastId="";
      var myRegio = new TRegio();
      return {
        findAll: function () {
			$rootScope.display.regioRegio=true; //20150801
			$rootScope.display.regioOmschrijving=true; //20150801
			var defer = $q.defer();
            userService.get().$promise.then(function(res){
                myRegio.fromObject({Bedrijf : res.bedrijf,Regio : '', Omschrijving : ''});
                Service.SvcRegio("R", currentUser.username, myRegio, function(result) {
                    defer.resolve(result.toObject());
//     alert(JSON.stringify(myRegio));
//       alert(JSON.stringify(result.toObject()[1]));
                });
            });
             return defer.promise;
        },
        getRegio: function (regioId) {
            var defer = $q.defer();
             userService.get().$promise.then(function(res){
             //myRegio.fromObject({Bedrijf : res.bedrijf,Regio : '', Omschrijving : ''});
             myRegio.fromObject({Bedrijf : res.bedrijf,Regio : regioId, Omschrijving : ''});
             Service.SvcRegio("R", currentUser.username, myRegio, function(result) {
                //var data = _.find(result.toObject(), {'Regio':regioId});
				//indien gevonden 
                if(result.toObject().length > 0) {
                  var data = result.toObject()[0];
                  defer.resolve(data);
				}  
             });
            });
            return defer.promise;
        },
        addRegio: function (Regio,Omschrijving) {
           userService.get().$promise.then(function(res){
                myRegio.fromObject({Bedrijf : res.bedrijf,Regio : Regio, Omschrijving : Omschrijving});
                Service.SvcRegio("C", currentUser.username, myRegio);
            });

        },
        updateRegio:function(Regio,Omschrijving){
           userService.get().$promise.then(function(res){
                myRegio.fromObject({Bedrijf : res.bedrijf,Regio : Regio, Omschrijving : Omschrijving});
                Service.SvcRegio("U", currentUser.username, myRegio);
            });
        },
        delRegio:function(Regio,Omschrijving){
         userService.get().$promise.then(function(res){
                myRegio.fromObject({Bedrijf : res.bedrijf,Regio : Regio, Omschrijving : Omschrijving});
             Service.SvcRegio("D", currentUser.username, myRegio);
         });

          // _.remove($rootScope.regio,function(regios){
          //   return regios.regio===regioId;
          // });
        },
        nextRegio:function(regioId, cb){
          var index=_.findIndex($rootScope.regio, function(regios){
            return regios.Regio===regioId;
          });
          if(index===-1 || index+1 >= $rootScope.regio.length){
           // return cb();
           return cb($rootScope.regio[0]);
          }
          return cb($rootScope.regio[index+1]);
        },
        preRegio:function(regioId, cb){
          var index=_.findIndex($rootScope.regio, function(regios){
            return regios.Regio===regioId;
          });
          if(index===-1 || index===0){
           // return cb();
           return cb($rootScope.regio[0]);
          }
          return cb($rootScope.regio[index-1]);
        }
      };
    }]);
