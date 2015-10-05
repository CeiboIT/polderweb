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
//			$rootScope.display.functieFunctie=true;       //20150801 always display
//			$rootScope.display.functieOmschrijving=true;
			var defer = $q.defer();
            userService.get().then(function(res){
                myFunctie.fromObject({Bedrijf : res.Bedrijf,Functie : '', Omschrijving : ''});
                Service.SvcFunctie("R", currentUser.username, myFunctie, function(result) {
                    defer.resolve(result.toObject());
//          alert(JSON.stringify(myFunctie));
//          alert(JSON.stringify(result.toObject()));
                });
            });
             return defer.promise;
        },
        getFunctie: function (functieId) {
            var defer = $q.defer();
             userService.get().then(function(res){
             myFunctie.fromObject({Bedrijf : res.Bedrijf,Functie : functieId, Omschrijving : ''});
             //myFunctie.fromObject({Bedrijf : res.Bedrijf,Functie : '', Omschrijving : ''});
             Service.SvcFunctie("R", currentUser.username, myFunctie, function(result) {
                var data = _.find(result.toObject(), {'Functie':functieId});
                defer.resolve(data);
             });
            });
            return defer.promise;
        },
        addFunctie: function (functieData) {
           userService.get().then(function(res){
                myFunctie.fromObject({Bedrijf : res.Bedrijf,Functie : functieData.Functie, Omschrijving : functieData.Omschrijving});
                Service.SvcFunctie("C", currentUser.username, myFunctie);
            });

        },
        updateFunctie:function(functieData){
           userService.get().then(function(res){
                myFunctie.fromObject({Bedrijf : res.Bedrijf,Functie : functieData.Functie, Omschrijving : functieData.Omschrijving});
                Service.SvcFunctie("U", currentUser.username, myFunctie);
            });
        },

        delFunctie: function(Functie,Omschrijving){

            var delFunctiePromise = $q.defer();

            userService.get().then(function(res){
                myFunctie.fromObject({Bedrijf : res.Bedrijf,Functie : Functie, Omschrijving : Omschrijving});
                Service.SvcFunctie("D", currentUser.username, myFunctie, function(result){
                    console.log(result);

                    delFunctiePromise.resolve(result)
                });
            });

            return delFunctiePromise.promise;



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
