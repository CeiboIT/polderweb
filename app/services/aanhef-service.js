angular.module('polderweb')
  .factory('Aanhef',
//  ['GLOBALS', '$http', '$rootScope','$q','userService', '$cookieStore',
//    function (GLOBALS, $http, $rootScope,$q,userService, $cookieStore)
  ['GLOBALS', '$http', '$rootScope','$q','userService', 
    function (GLOBALS, $http, $rootScope,$q,userService)
     {
//         var Bedrijf =  $cookieStore.get('user').Bedrijf;
      var currentUser = userService.get(); //20150801
      var lastId="";
      var myAanhef = new TAanhef();
      return {
        findAll: function () {
//			$rootScope.display.aanhefAanhef=true;       //20150801 always display
//			$rootScope.display.aanhefOmschrijving=true;
			var defer = $q.defer();
            userService.get().then(function(res){
                myAanhef.fromObject({Bedrijf : res.Bedrijf, Aanhef : '', Omschrijving : ''});
//                Service.SvcAanhef("R", res.Username, myAanhef, function(result) {
                Service.SvcAanhef("R", res.Username, myAanhef, function(result) {
                    defer.resolve(result.toObject());
//          alert(JSON.stringify(myAanhef));
//          alert(JSON.stringify(result.toObject()));
                });
            });
             return defer.promise;
        },
        getAanhef: function (aanhefId) {
            var defer = $q.defer();
             userService.get().then(function(res){
             myAanhef.fromObject({Bedrijf : res.Bedrijf,Aanhef : aanhefId, Omschrijving : ''});
             Service.SvcAanhef("R", res.Username, myAanhef, function(result) {
                var data = _.find(result.toObject(), {'Aanhef':aanhefId});
                defer.resolve(data);
             });
            });
            return defer.promise;
        },
        addAanhef: function (aanhefData) {
           userService.get().then(function(res){
                myAanhef.fromObject({Bedrijf : res.Bedrijf,Aanhef : aanhefData.Aanhef, Omschrijving : aanhefData.Omschrijving, Geslacht: aanhefData.Geslacht });
                Service.SvcAanhef("C", res.Username, myAanhef);
            });

        },
        updateAanhef:function(aanhefData){
           userService.get().then(function(res){
                myAanhef.fromObject({Bedrijf : res.Bedrijf,Aanhef : aanhefData.Aanhef, Omschrijving : aanhefData.Omschrijving, Geslacht: aanhefData.Geslacht });
                Service.SvcAanhef("U", res.Username, myAanhef);
            });
        },

        delAanhef: function(Aanhef,Omschrijving){

            var delAanhefPromise = $q.defer();

            userService.get().then(function(res){
                myAanhef.fromObject({Bedrijf : res.Bedrijf,Aanhef : Aanhef, Omschrijving : Omschrijving});
                Service.SvcAanhef("D", res.Username, myAanhef, function(result){
                    console.log(result);

                    delAanhefPromise.resolve(result)
                });
            });

            return delAanhefPromise.promise;

          // _.remove($rootScope.aanhef,function(aanhefs){
          //   return aanhefs.aanhef===aanhefId;
          // });
        },
        nextAanhef:function(aanhefId, cb){
          var index=_.findIndex($rootScope.aanhef, function(aanhefs){
            return aanhefs.Aanhef===aanhefId;
          });
          if(index===-1 || index+1 >= $rootScope.aanhef.length){
           // return cb();
           return cb($rootScope.aanhef[0]);
          }
          return cb($rootScope.aanhef[index+1]);
        },
        preAanhef:function(aanhefId, cb){
          var index=_.findIndex($rootScope.aanhef, function(aanhefs){
            return aanhefs.Aanhef===aanhefId;
          });
          if(index===-1 || index===0){
           // return cb();
           return cb($rootScope.aanhef[0]);
          }
          return cb($rootScope.aanhef[index-1]);
        }
      };
    }]);
