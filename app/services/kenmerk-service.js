angular.module('polderweb')
  .factory('Kenmerk',
  ['GLOBALS', '$http', '$rootScope','$q','userService',
    function (GLOBALS, $http, $rootScope,$q,userService)
     {
      var currentUser = userService.get(); //20150801
  	  var lastId="";
      var myKenmerk = new TKenmerk();
      return {
        findAll: function () {
			$rootScope.display.kenmerkKenmerk=true;       //20150801 always display
			$rootScope.display.kenmerkOmschrijving=true;
           var defer = $q.defer();
            userService.get().$promise.then(function(res){
                myKenmerk.fromObject({Bedrijf : res.bedrijf
				                    , Kenmerk : ''
									, Omschrijving : ''
				                    , IndNieuw : false});
                Service.SvcKenmerk("R", currentUser.username, myKenmerk, function(result) { 
                    defer.resolve(result.toObject());
                }); //20150801
            });
             return defer.promise;
        },
        getKenmerk: function (kenmerkId) {
            var defer = $q.defer();
             userService.get().$promise.then(function(res){
             myKenmerk.fromObject({Bedrijf : res.bedrijf
			                     , Kenmerk : ''
								 , Omschrijving : ''
								 , IndNieuw : false});
             Service.SvcKenmerk("R", currentUser.username, myKenmerk, function(result) {
                var data = _.find(result.toObject(), {'Kenmerk':kenmerkId});
                defer.resolve(data);
             });
            });
            return defer.promise;
        },
        addKenmerk: function (Kenmerk,Omschrijving) {
           userService.get().$promise.then(function(res){
                myKenmerk.fromObject({Bedrijf : res.bedrijf
				                    , Kenmerk : Kenmerk
									, Omschrijving : Omschrijving
									, IndNieuw : false});
                Service.SvcKenmerk("C", currentUser.username, myKenmerk);
            });
        },
        updateKenmerk:function(Kenmerk,Omschrijving){
           userService.get().$promise.then(function(res){
                myKenmerk.fromObject({Bedrijf : res.bedrijf
				                    , Kenmerk : Kenmerk
									, Omschrijving : Omschrijving
									, IndNieuw : false});
                Service.SvcKenmerk("U", currentUser.username, myKenmerk);
            });
        },
        delKenmerk:function(Kenmerk,Omschrijving){
         userService.get().$promise.then(function(res){
                myKenmerk.fromObject({Bedrijf : res.bedrijf
				                    , Kenmerk : Kenmerk
									, Omschrijving : Omschrijving
									, IndNieuw : false});
             Service.SvcKenmerk("D", currentUser.username, myKenmerk);
         });
         // _.remove($rootScope.kenmerk,function(kenmerks){
         //   return kenmerks.kenmerk===kenmerkId;
         // });
        },
        nextKenmerk:function(kenmerkId, cb){
          var index=_.findIndex($rootScope.kenmerk, function(kenmerks){
            return kenmerks.Kenmerk===kenmerkId;
          });
          if(index===-1 || index+1 >= $rootScope.kenmerk.length){
           // return cb();
           return cb($rootScope.kenmerk[0]);
          }
          return cb($rootScope.kenmerk[index+1]);
        },
        preKenmerk:function(kenmerkId, cb){
          var index=_.findIndex($rootScope.kenmerk, function(kenmerks){
            return kenmerks.Kenmerk===kenmerkId;
          });
          if(index===-1 || index===0){
           // return cb();
           return cb($rootScope.kenmerk[0]);
          }
          return cb($rootScope.kenmerk[index-1]);
        }
      };
    }]);
