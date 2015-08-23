angular.module('polderweb')
  .factory('Titel',
  ['GLOBALS', '$http', '$rootScope','$q','userService',
    function (GLOBALS, $http, $rootScope,$q,userService)
     {
      var currentUser = userService.get(); //20150801
      var lastId="";
      var myTitel = new TTitel();
      return {
        findAll: function () {
			$rootScope.display.titelTitel=true;       //20150801 always display
			$rootScope.display.titelOmschrijving=true;
           var defer = $q.defer();
            userService.get().$promise.then(function(res){
                myTitel.fromObject({Bedrijf : res.bedrijf,Titel : '', Omschrijving : ''});
                Service.SvcTitel("R", currentUser.username, myTitel, function(result) {
                    defer.resolve(result.toObject());
                });
            });
             return defer.promise;
        },
        getTitel: function (titelId) {
            var defer = $q.defer();
             userService.get().$promise.then(function(res){
             myTitel.fromObject({Bedrijf : res.bedrijf,Titel : '', Omschrijving : ''});
             Service.SvcTitel("R", currentUser.username, myTitel, function(result) {
                var data = _.find(result.toObject(), {'Titel':titelId});
                defer.resolve(data);
             });
            });
            return defer.promise;
        },
        addTitel: function (Titel,Omschrijving) {
           userService.get().$promise.then(function(res){
                myTitel.fromObject({Bedrijf : res.bedrijf,Titel : Titel, Omschrijving : Omschrijving});
                Service.SvcTitel("C", currentUser.username, myTitel);
            });

        },
        updateTitel:function(Titel,Omschrijving){
           userService.get().$promise.then(function(res){
                myTitel.fromObject({Bedrijf : res.bedrijf,Titel : Titel, Omschrijving : Omschrijving});
                Service.SvcTitel("U", currentUser.username, myTitel);
            });
        },
        delTitel:function(Titel,Omschrijving){
         userService.get().$promise.then(function(res){
                myTitel.fromObject({Bedrijf : res.bedrijf,Titel : Titel, Omschrijving : Omschrijving});
             Service.SvcTitel("D", currentUser.username, myTitel);
         });

          // _.remove($rootScope.titel,function(titels){
          //   return titels.titel===titelId;
          // });
        },
        nextTitel:function(titelId, cb){
          var index=_.findIndex($rootScope.titel, function(titels){
            return titels.Titel===titelId;
          });
          if(index===-1 || index+1 >= $rootScope.titel.length){
           // return cb();
           return cb($rootScope.titel[0]);
          }
          return cb($rootScope.titel[index+1]);
        },
        preTitel:function(titelId, cb){
          var index=_.findIndex($rootScope.titel, function(titels){
            return titels.Titel===titelId;
          });
          if(index===-1 || index===0){
           // return cb();
           return cb($rootScope.titel[0]);
          }
          return cb($rootScope.titel[index-1]);
        }
      };
    }]);
