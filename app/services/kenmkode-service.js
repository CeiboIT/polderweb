angular.module('polderweb')
  .factory('KenmKode',
  ['GLOBALS', '$http', '$rootScope','$q','userService',
    function (GLOBALS, $http, $rootScope,$q,userService)
     {
      var currentUser = userService.get(); 
  	  var lastId="";
      var myKenmKode = new TKenmKode();
      return {
        findAll: function () {
			$rootScope.display.kenmkodeKenmerk=true; 
			$rootScope.display.kenmkodeKode=true; 
			$rootScope.display.kenmkodeOmschrijving=true;
            var defer = $q.defer();
            userService.get().$promise.then(function(res){
                myKenmKode.fromObject({Bedrijf : res.bedrijf, Kenmerk : '', Kode : '', Omschrijving : '', Extra1 : '', Extra2: '', Extra3: ''});
                Service.SvcKenmKode("R", currentUser.username, myKenmKode, function(result) { defer.resolve(result.toObject()); }); 
            });
            return defer.promise;
        },

        getKenmKode: function (kenmerkId, kodeId) { //master-detail
            var defer = $q.defer();
             userService.get().$promise.then(function(res){
             myKenmKode.fromObject({Bedrijf : res.bedrijf, Kenmerk : '', Kode : '', Omschrijving : '', Extra1 : '', Extra2: '', Extra3: ''});
             Service.SvcKenmKode("R", currentUser.username, myKenmKode, function(result) {
                var data = _.find(result.toObject(), {'Kenmerk':kenmerkId, 'Kode':kodeId});
                defer.resolve(data);
             });
            });
            return defer.promise;
        },

        addKenmKode: function (KenmKode, Omschrijving) {
           userService.get().$promise.then(function(res){
				myKenmKode.fromObject({Bedrijf : res.bedrijf, Kenmerk : Kenmerk, Kode : Kode, Omschrijving : Omschrijving, Extra1 : '', Extra2: '', Extra3: ''});
                Service.SvcKenmKode("C", currentUser.username, myKenmKode);
			});
        },

        updateKenmKode:function(KenmKode, Omschrijving){
           userService.get().$promise.then(function(res){
				myKenmKode.fromObject({Bedrijf : res.bedrijf, Kenmerk : Kenmerk, Kode : Kode, Omschrijving : Omschrijving, Extra1 : '', Extra2: '', Extra3: ''});
                Service.SvcKenmKode("U", currentUser.username, myKenmKode);
            });
        },

        delKenmKode:function(KenmKode, Omschrijving){
         userService.get().$promise.then(function(res){
				myKenmKode.fromObject({Bedrijf : res.bedrijf, Kenmerk : Kenmerk, Kode : Kode, Omschrijving : Omschrijving, Extra1 : '', Extra2: '', Extra3: ''});
             Service.SvcKenmKode("D", currentUser.username, myKenmKode);
         });
         // _.remove($rootScope.kenmkode,function(kenmkodes){
         //   return kenmkodes.kenmkode===kenmkodeId;
         // });
        },

        nextKenmKode:function(kenmkodeId, cb){
          var index=_.findIndex($rootScope.kenmkode, function(kenmkodes){
            return kenmkodes.Kode===kode;
          });
          if(index===-1 || index+1 >= $rootScope.kenmkode.length){
           // return cb();
           return cb($rootScope.kenmkode[0]);
          }
          return cb($rootScope.kenmkode[index+1]);
        },

        preKenmKode:function(kenmkodeId, cb){
          var index=_.findIndex($rootScope.kenmkode, function(kenmkodes){
            return kenmkodes.Kode===kode;
          });
          if(index===-1 || index===0){
           // return cb();
           return cb($rootScope.kenmkode[0]);
          }
          return cb($rootScope.kenmkode[index-1]);
        }
      };
    }]);
