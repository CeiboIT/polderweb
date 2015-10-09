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
//			$rootScope.display.titelTitel=true;       //20150801 always display
//			$rootScope.display.titelOmschrijving=true;
			var defer = $q.defer();
            userService.get().then(function(res){
                myTitel.fromObject({Bedrijf : res.Bedrijf,Titel : '', Omschrijving : ''});
                Service.SvcTitel("R", res.Username, myTitel, function(result) {
                    defer.resolve(result.toObject());
//          alert(JSON.stringify(myTitel));
//          alert(JSON.stringify(result.toObject()));
                });
            });
             return defer.promise;
        },
        getTitel: function (titelId) {
            var defer = $q.defer();
             userService.get().then(function(res){
             myTitel.fromObject({Bedrijf : res.Bedrijf,Titel : titelId, Omschrijving : ''});
             //myTitel.fromObject({Bedrijf : res.Bedrijf,Titel : '', Omschrijving : ''});
             Service.SvcTitel("R", res.Username, myTitel, function(result) {
                var data = _.find(result.toObject(), {'Titel':titelId});
                defer.resolve(data);
             });
            });
            return defer.promise;
        },
        addTitel: function (titelData) {
           userService.get().then(function(res){
                myTitel.fromObject({Bedrijf : res.Bedrijf,Titel : titelData.Titel, Omschrijving : titelData.Omschrijving});
                Service.SvcTitel("C", res.Username, myTitel);
            });

        },
        updateTitel:function(titelData){
           userService.get().then(function(res){
                myTitel.fromObject({Bedrijf : res.Bedrijf,Titel : titelData.Titel, Omschrijving : titelData.Omschrijving});
                Service.SvcTitel("U", res.Username, myTitel);
            });
        },

        delTitel: function(Titel,Omschrijving){

            var delTitelPromise = $q.defer();

            userService.get().then(function(res){
                myTitel.fromObject({Bedrijf : res.Bedrijf,Titel : Titel, Omschrijving : Omschrijving});
                Service.SvcTitel("D", res.Username, myTitel, function(result){
                    console.log(result);

                    delTitelPromise.resolve(result)
                });
            });

            return delTitelPromise.promise;



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
