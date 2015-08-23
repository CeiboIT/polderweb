angular.module('polderweb')
  .factory('Functie',
  ['GLOBALS', '$http', '$rootScope','$q','userService',
    function (GLOBALS, $http, $rootScope,$q,userService)
     {
      var currentUser = userService.get(); //20150801
  	  var lastId="";
      var myFunctie = new TFunctie();
      return {
        findAll: function () {
			$rootScope.display.functieFunctie=true;       //20150801 always display
			$rootScope.display.functieOmschrijving=true;
           var defer = $q.defer();
            userService.get().$promise.then(function(res){
                myFunctie.fromObject({Bedrijf : res.bedrijf,Functie : '', Omschrijving : ''});
                Service.SvcFunctie("R", currentUser.username, myFunctie, function(result) { 
                    defer.resolve(result.toObject());
                }); //20150801
            });
             return defer.promise;
        },
        getFunctie: function (functieId) {
            var defer = $q.defer();
             userService.get().$promise.then(function(res){
             myFunctie.fromObject({Bedrijf : res.bedrijf,Functie : '', Omschrijving : ''});
             Service.SvcFunctie("R", currentUser.username, myFunctie, function(result) {
                var data = _.find(result.toObject(), {'Functie':functieId});
                defer.resolve(data);
             });
            });
            return defer.promise;
        },
        addFunctie: function (Functie,Omschrijving) {
           userService.get().$promise.then(function(res){
                myFunctie.fromObject({Bedrijf : res.bedrijf,Functie : Functie, Omschrijving : Omschrijving});
                Service.SvcFunctie("C", currentUser.username, myFunctie);
            });

        },
        updateFunctie:function(Functie,Omschrijving){
           userService.get().$promise.then(function(res){
                myFunctie.fromObject({Bedrijf : res.bedrijf,Functie : Functie, Omschrijving : Omschrijving});
                Service.SvcFunctie("U", currentUser.username, myFunctie);
            });
        },
        delFunctie:function(Functie,Omschrijving){
         userService.get().$promise.then(function(res){
                myFunctie.fromObject({Bedrijf : res.bedrijf,Functie : Functie, Omschrijving : Omschrijving});
             Service.SvcFunctie("D", currentUser.username, myFunctie);
         });

          // _.remove($rootScope.functie,function(functies){
          //   return functies.functie===functieId;
          // });
        },
        nextFunctie:function(functieId, cb){
          var index=_.findIndex($rootScope.functie, function(functies){
            return functies.Functie===functieId;
          });
          if(index===-1 || index+1 >= $rootScope.functie.length){
           // return cb();
           return cb($rootScope.functie[0]);
          }
          return cb($rootScope.functie[index+1]);
        },
        preFunctie:function(functieId, cb){
          var index=_.findIndex($rootScope.functie, function(functies){
            return functies.Functie===functieId;
          });
          if(index===-1 || index===0){
           // return cb();
           return cb($rootScope.functie[0]);
          }
          return cb($rootScope.functie[index-1]);
        }
      };
    }]);
