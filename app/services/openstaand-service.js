angular.module('polderweb')
  .factory('Openstaand',
  ['GLOBALS', '$http', '$rootScope','$q','userService',
    function (GLOBALS, $http, $rootScope,$q,userService)
     {
      var currentUser = userService.get(); //20150801
      var lastId="";

      var myOpenstaandIn = new TOpenstaandIn();
/*
    this.Bedrag = {dataType : "Currency", value : null};
    this.BedragBetaald = {dataType : "Currency", value : null};
    this.Bedrijf = {dataType : "Integer", value : null};
    this.BetaalWijze = {dataType : "AnsiString", value : null};
    this.DatumTotMet = {dataType : "AnsiString", value : null};
    this.DatumVan = {dataType : "AnsiString", value : null};
    this.LidNr = {dataType : "Integer", value : null};
    this.Naam = {dataType : "AnsiString", value : null};
*/
      return {
        findAll: function () {
            var defer = $q.defer();
            userService.get().then(function(res){
            myOpenstaandIn.fromObject({Bedrijf : res.Bedrijf
			                        , Bedrag : 0
			                        , BedragBetaald : 0
									, BetaalWijze : ''
//									, DatumTotMet : '' // '1899-12-30T00:00:00'
//									, DatumVan : '' // '1899-12-30T00:00:00'
			                        , LidNr : 0
									, Naam : ''
									});
//            myOpenstaand.fromObject({ OpenstaandArray : null
//									, Totaal : 0
//			                        , TotaalOpenstaand : 0
//									});
//       alert(JSON.stringify(myOpenstaandIn));
	   Service.SvcOpenstaand("R", res.Username, myOpenstaandIn, function(result) {
                    defer.resolve(result.toObject());
//       alert(JSON.stringify(result.toObject()));
                });
            });
             return defer.promise;
        },

        getOpenstaand: function (openstaandId) {
            var defer = $q.defer();
             userService.get().then(function(res){
            myOpenstaand.fromObject({Bedrijf : res.Bedrijf
			                        , Bedrag : 0
			                        , BedragBetaald : 0
			                        , BedragOpenstaand : 0
									, BetaalWijze : ''
									, DatumTotMet : '1899-12-30T00:00:00'
									, DatumVan : '1899-12-30T00:00:00'
			                        , AantalTermijnen : 0
			                        , LidNr : 0
									, Naam : ''
									});
             //myOpenstaand.fromObject({Bedrijf : res.Bedrijf,Openstaand : '', Omschrijving : ''});
             Service.SvcOpenstaand("R", res.Username, myOpenstaand, function(result) {
                var data = _.find(result.toObject(), {'Openstaand':openstaandId});
                defer.resolve(data);
             });
            });
            return defer.promise;
        },

        addOpenstaand: function (openstaandData) {
           userService.get().then(function(res){
                myOpenstaand.fromObject({Bedrijf : res.Bedrijf,Openstaand : openstaandData.Openstaand, Omschrijving : openstaandData.Omschrijving, IndNieuw : openstaandData.IndNieuw});
                Service.SvcOpenstaand("C", res.Username, myOpenstaand);
            });
        },

        updateOpenstaand:function(openstaandData){
           userService.get().then(function(res){
                myOpenstaand.fromObject({Bedrijf : res.Bedrijf,Openstaand : openstaandData.Openstaand, Omschrijving : openstaandData.Omschrijving, IndNieuw : openstaandData.IndNieuw});
                Service.SvcOpenstaand("U", res.Username, myOpenstaand);
            });
        },

        delOpenstaand: function(Openstaand,Omschrijving){
            var delOpenstaandPromise = $q.defer();
            userService.get().then(function(res){
                myOpenstaand.fromObject({Bedrijf : res.Bedrijf,Openstaand : Openstaand, Omschrijving : Omschrijving});
                Service.SvcOpenstaand("D", res.Username, myOpenstaand, function(result){
                    console.log(result);
                    delOpenstaandPromise.resolve(result)
                });
            });
            return delOpenstaandPromise.promise;
          // _.remove($rootScope.openstaand,function(openstaands){
          //   return openstaands.openstaand===openstaandId;
          // });
        },

        nextOpenstaand:function(openstaandId, cb){
          var index=_.findIndex($rootScope.openstaand, function(openstaands){
            return openstaands.Openstaand===openstaandId;
          });
          if(index===-1 || index+1 >= $rootScope.openstaand.length){
           // return cb();
           return cb($rootScope.openstaand[0]);
          }
          return cb($rootScope.openstaand[index+1]);
        },

        preOpenstaand:function(openstaandId, cb){
          var index=_.findIndex($rootScope.openstaand, function(openstaands){
            return openstaands.Openstaand===openstaandId;
          });
          if(index===-1 || index===0){
           // return cb();
           return cb($rootScope.openstaand[0]);
          }
          return cb($rootScope.openstaand[index-1]);
        }
      };
    }]);
