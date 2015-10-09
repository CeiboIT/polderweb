angular.module('polderweb')
  .factory('SoortBetaling',
  ['GLOBALS', '$http', '$rootScope','$q','userService',
    function (GLOBALS, $http, $rootScope,$q,userService)
     {
      var currentUser = userService.get(); //20150801
      var lastId="";
      var mySoortBetaling = new TSoortBetaling();
      return {
        findAll: function () {
//			$rootScope.display.soortbetalingSoortBetaling=true;       //20150801 always display
//			$rootScope.display.soortbetalingOmschrijving=true;
			$rootScope.display.soortbetalingSoortBetaling=true;
			$rootScope.display.soortbetalingOmschrijving=true;
			$rootScope.display.soortbetalingNegatief=true;
			$rootScope.display.soortbetalingEenmalig=true;
			$rootScope.display.soortbetalingBedrag=true;
			$rootScope.display.soortbetalingAantalTermijnen=true;
			$rootScope.display.soortbetalingDefaultTermijn=true;
			$rootScope.display.soortbetalingActief=true;
			$rootScope.display.soortbetalingVolgorde=true;
			$rootScope.display.soortbetalingBTWCode=true;
			$rootScope.display.soortbetalingIndProlongeren=true;

			var defer = $q.defer();
            userService.get().then(function(res){
                mySoortBetaling.fromObject({Bedrijf : res.Bedrijf
				                          , SoortBetaling : ''
										  , Omschrijving : ''
    									  , Negatief : false
    									  , Eenmalig : false
    									  , Bedrag : 0
    									  , AantalTermijnen : 0
    									  , DefaultTermijn : ''
    									  , Actief : false
    									  , Volgorde : 0
    									  , BTWCode : ''
    									  , IndProlongeren : false
										  });
                Service.SvcSoortBetaling("R", res.Username, mySoortBetaling, function(result) {
                    defer.resolve(result.toObject());
//          alert(JSON.stringify(mySoortBetaling));
//          alert(JSON.stringify(result.toObject()));
                });
            });
             return defer.promise;
        },

        getSoortBetaling: function (soortbetalingId) {
            var defer = $q.defer();
             userService.get().then(function(res){
             mySoortBetaling.fromObject({Bedrijf : res.Bedrijf
				                          , SoortBetaling : soortbetalingId
										  , Omschrijving : ''
    									  , Negatief : false
    									  , Eenmalig : false
    									  , Bedrag : 0
    									  , AantalTermijnen : 0
    									  , DefaultTermijn : ''
    									  , Actief : false
    									  , Volgorde : 0
    									  , BTWCode : ''
    									  , IndProlongeren : false
										  });
             Service.SvcSoortBetaling("R", res.Username, mySoortBetaling, function(result) {
                var data = _.find(result.toObject(), {'SoortBetaling':soortbetalingId});
                defer.resolve(data);
             });
            });
            return defer.promise;
        },

        addSoortBetaling: function (soortbetalingData) {
           userService.get().then(function(res){
                mySoortBetaling.fromObject({Bedrijf : res.Bedrijf
 	 			                          , SoortBetaling : soortbetalingData.SoortBetaling
										  , Omschrijving : soortbetalingData.Omschrijving
    									  , Negatief : false
    									  , Eenmalig : false
    									  , Bedrag : Bedrag
    									  , AantalTermijnen : 0
    									  , DefaultTermijn : ''
    									  , Actief : false
    									  , Volgorde : 0
    									  , BTWCode : ''
    									  , IndProlongeren : false
										  });
                Service.SvcSoortBetaling("C", res.Username, mySoortBetaling);
            });
        },

        updateSoortBetaling:function(soortbetalingData){
           userService.get().then(function(res){
                mySoortBetaling.fromObject({Bedrijf : res.Bedrijf
 	 			                          , SoortBetaling : soortbetalingData.SoortBetaling
										  , Omschrijving : soortbetalingData.Omschrijving
    									  , Negatief : false
    									  , Eenmalig : false
    									  , Bedrag : Bedrag
    									  , AantalTermijnen : 0
    									  , DefaultTermijn : ''
    									  , Actief : false
    									  , Volgorde : 0
    									  , BTWCode : ''
    									  , IndProlongeren : false
										  });
                Service.SvcSoortBetaling("U", res.Username, mySoortBetaling);
            });
        },

        delSoortBetaling: function(SoortBetaling, Omschrijving){
            var delSoortBetalingPromise = $q.defer();
            userService.get().then(function(res){
                mySoortBetaling.fromObject({Bedrijf : res.Bedrijf
 	 			                          , SoortBetaling : SoortBetaling
										  , Omschrijving : Omschrijving
    									  , Negatief : false
    									  , Eenmalig : false
    									  , Bedrag : Bedrag
    									  , AantalTermijnen : 0
    									  , DefaultTermijn : ''
    									  , Actief : false
    									  , Volgorde : 0
    									  , BTWCode : ''
    									  , IndProlongeren : false
										  });
                Service.SvcSoortBetaling("D", res.Username, mySoortBetaling, function(result){
                    console.log(result);

                    delSoortBetalingPromise.resolve(result)
                });
            });

            return delSoortBetalingPromise.promise;



          // _.remove($rootScope.soortbetaling,function(soortbetalings){
          //   return soortbetalings.soortbetaling===soortbetalingId;
          // });
        },
        nextSoortBetaling:function(soortbetalingId, cb){
          var index=_.findIndex($rootScope.soortbetaling, function(soortbetalings){
            return soortbetalings.SoortBetaling===soortbetalingId;
          });
          if(index===-1 || index+1 >= $rootScope.soortbetaling.length){
           // return cb();
           return cb($rootScope.soortbetaling[0]);
          }
          return cb($rootScope.soortbetaling[index+1]);
        },
        preSoortBetaling:function(soortbetalingId, cb){
          var index=_.findIndex($rootScope.soortbetaling, function(soortbetalings){
            return soortbetalings.SoortBetaling===soortbetalingId;
          });
          if(index===-1 || index===0){
           // return cb();
           return cb($rootScope.soortbetaling[0]);
          }
          return cb($rootScope.soortbetaling[index-1]);
        }
      };
    }]);
