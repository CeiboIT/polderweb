angular.module('polderweb')
  .factory('KenmKode',
  ['GLOBALS', '$http', '$rootScope','$q','userService',
    function (GLOBALS, $http, $rootScope,$q,userService)
     {
      var currentUser = userService.get(); //20150801
      var lastId="";
      var myKenmKode = new TKenmKode();
      return {
//20151020        findAll: function () {
        findAll: function (kenmerkId) {
//			$rootScope.display.kenmkodeKenmKode=true;       //20150801 always display
//			$rootScope.display.kenmkodeOmschrijving=true;
			var defer = $q.defer();
            userService.get().then(function(res){
                myKenmKode.fromObject({Bedrijf : res.Bedrijf
//20151020							 , Kenmerk : ''
									 , Kenmerk : kenmerkId
									 , Kode : ''
									 , Omschrijving : ''
									 , Extra1 : ''
									 , Extra2 : ''
									 , Extra3 : ''});
                Service.SvcKenmKode("R", res.Username, myKenmKode, function(result) {
                    defer.resolve(result.toObject());
//          alert(JSON.stringify(myKenmKode));
//                  alert(JSON.stringify(result.toObject()));
                });
            });
             return defer.promise;
        },

//        getKenmKode: function (kenmkodeId) {
        getKenmKode: function (kenmerk, kode) {
            var defer = $q.defer();
             userService.get().then(function(res){
             myKenmKode.fromObject({Bedrijf : res.Bedrijf
								, Kenmerk : kenmerk
//								, Kode : kenmkodeId
								, Kode : kode
								, Omschrijving : ''
								, Extra1 : ''
								, Extra2 : ''
								, Extra3 : ''});
             Service.SvcKenmKode("R", res.Username, myKenmKode, function(result) {
//                var data = _.find(result.toObject(), {'Kode':kenmkodeId});
//HowTo : what's happening here. Is this necessary ?
                var data = _.find(result.toObject(), {'Kenmerk':kenmerk, 'Kode':kode});
                defer.resolve(data);
             });
            });
            return defer.promise;
        },

        addKenmKode: function (kenmkodeData) {
           userService.get().then(function(res){
                myKenmKode.fromObject({Bedrijf : res.Bedrijf
							         , Kenmerk : kenmkodeData.Kenmerk
									 , Kode : kenmkodeData.Kode
									 , Omschrijving : kenmkodeData.Omschrijving
									 , Extra1 : kenmkodeData.Extra1
									 , Extra2 : kenmkodeData.Extra2
									 , Extra3 : kenmkodeData.Extra3});
                Service.SvcKenmKode("C", res.Username, myKenmKode);
            });

        },

        updateKenmKode:function(kenmkodeData){
           userService.get().then(function(res){
                myKenmKode.fromObject({Bedrijf : res.Bedrijf
				                     , Kenmerk : kenmkodeData.Kenmerk
									 , Kode : kenmkodeData.Kode
									 , Omschrijving : kenmkodeData.Omschrijving
									 , Extra1 : kenmkodeData.Extra1
									 , Extra2 : kenmkodeData.Extra2
									 , Extra3 : kenmkodeData.Extra3});
                Service.SvcKenmKode("U", res.Username, myKenmKode);
            });
        },

        delKenmKode: function(Kode, Kenmerk, Omschrijving){
            var delKenmKodePromise = $q.defer();
            userService.get().then(function(res){
                myKenmKode.fromObject({Bedrijf : res.Bedrijf
				                     , Kenmerk : Kenmerk
									 , Kode : Kode
									 , Omschrijving : Omschrijving
									 , Extra1 : ''
									 , Extra2 : ''
									 , Extra3 : ''});
                Service.SvcKenmKode("D", res.Username, myKenmKode, function(result){
                    console.log(result);
                    delKenmKodePromise.resolve(result)
                });
            });
            return delKenmKodePromise.promise;
          // _.remove($rootScope.kenmkode,function(kenmkodes){
          //   return kenmkodes.kenmkode===kenmkodeId;
          // });
        },

        nextKenmKode:function(kenmkodeId, cb){
          var index=_.findIndex($rootScope.kenmkode, function(kenmkodes){
            return kenmkodes.KenmKode===kenmkodeId;
          });
          if(index===-1 || index+1 >= $rootScope.kenmkode.length){
           // return cb();
           return cb($rootScope.kenmkode[0]);
          }
          return cb($rootScope.kenmkode[index+1]);
        },

        preKenmKode:function(kenmkodeId, cb){
          var index=_.findIndex($rootScope.kenmkode, function(kenmkodes){
            return kenmkodes.KenmKode===kenmkodeId;
          });
          if(index===-1 || index===0){
           // return cb();
           return cb($rootScope.kenmkode[0]);
          }
          return cb($rootScope.kenmkode[index-1]);
        }
      };
    }]);
