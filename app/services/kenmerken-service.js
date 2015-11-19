angular.module('polderweb')
  .factory('Kenmerken',
  ['GLOBALS', '$http', '$rootScope','$q','userService',
    function (GLOBALS, $http, $rootScope,$q,userService)
     {
      var currentUser = userService.get();
      var lastId="";
      var PersKenmIn = new TPersKenm();
      return {
        findAll: function (lidnr) {
            var defer = $q.defer();
            userService.get().then(function(res){
                PersKenmIn.fromObject({
                    Aantal : 0,
                    AantalTermijnen : 0,
                    BankRekNr : '',
                    Bedrag : 0,
                    BedragBetaald : 0,
                    Bedrijf : res.Bedrijf, // master-field
                    BetaalWijze : '',
                    DatumBetaald : '1899-12-30T00:00:00',
                    DatumEind : '1899-12-30T00:00:00',
                    DatumFactuur : '1899-12-30T00:00:00',
                    DatumIngang : '1899-12-30T00:00:00',
                    DatumVerstuurd : '1899-12-30T00:00:00',
                    Dispensatie : false,
                    Fatuurnr : '',
                    Groep : '',
                    LidNr : lidnr, // master-field
                    Opmerking : '',
                    Periode : 2013,
                    TermijnNr : 0
                });
                Service.SvcPersKenm("R", res.Username, PersKenmIn, function(result) {
                    defer.resolve(result.toObject());
//          alert(JSON.stringify(PersKenmIn));
//          alert(JSON.stringify(result.toObject()));
                });
            });
             return defer.promise;
        },
        getKenmerken: function (lidNId) {
            var defer = $q.defer();
             userService.get().then(function(res){
             PersKenmIn.fromObject({
                Bedrijf : res.Bedrijf,
                Kenmerken : kenmerkenId,
                Omschrijving : ''
             });
             //PersKenmIn.fromObject({Bedrijf : res.Bedrijf,Kenmerken : '', Omschrijving : ''});
             Service.SvcPersKenm("R", res.Username, PersKenmIn, function(result) {
                var data = _.find(result.toObject(), {'Kenmerken':kenmerkenId});
                defer.resolve(data);
             });
            });
            return defer.promise;
        },
        addKenmerken: function (kenmerkenData) {
           userService.get().then(function(res){
                PersKenmIn.fromObject({
                    Aantal : 0,
                    AantalTermijnen : 0,
                    BankRekNr : '',
                    Bedrag : 0,
                    BedragBetaald : 0,
                    Bedrijf : res.Bedrijf, // master-field
                    BetaalWijze : kenmerkenData.BetaalWijze,
                    DatumBetaald : '1899-12-30T00:00:00',
                    DatumEind : kenmerkenData.DatumEind,
                    DatumFactuur : '1899-12-30T00:00:00',
                    DatumIngang : kenmerkenData.DatumIngang,
                    DatumVerstuurd : '1899-12-30T00:00:00',
                    Dispensatie : false,
                    Fatuurnr : '',
                    Groep : kenmerkenData.Groep,
                    LidNr : parseInt(kenmerkenData.LidNr), // master-field
                    Opmerking : kenmerkenData.Opmerking,
                    Periode : kenmerkenData.Periode,
                    TermijnNr : 0
                });
                Service.SvcPersKenm("C", res.Username, PersKenmIn);
            });

        },
        updateKenmerken:function(kenmerkenData){
           userService.get().then(function(res){
                PersKenmIn.fromObject({
                    Aantal : 0,
                    AantalTermijnen : 0,
                    BankRekNr : '',
                    Bedrag : 0,
                    BedragBetaald : 0,
                    Bedrijf : res.Bedrijf, // master-field
                    BetaalWijze : kenmerkenData.BetaalWijze,
                    DatumBetaald : '1899-12-30T00:00:00',
                    DatumEind : kenmerkenData.DatumEind,
                    DatumFactuur : '1899-12-30T00:00:00',
                    DatumIngang : kenmerkenData.DatumIngang,
                    DatumVerstuurd : '1899-12-30T00:00:00',
                    Dispensatie : false,
                    Fatuurnr : '',
                    Groep : kenmerkenData.Groep,
                    LidNr : kenmerkenData.LidNr, // master-field
                    Opmerking : kenmerkenData.Opmerking,
                    Periode : kenmerkenData.Periode,
                    TermijnNr : 0                });
                Service.SvcPersKenm("U", res.Username, PersKenmIn);
            });
        },

        delKenmerken: function(Kenmerken,Omschrijving){

            var delKenmerkenPromise = $q.defer();

            userService.get().then(function(res){
                PersKenmIn.fromObject({
                    Bedrijf : res.Bedrijf,
                    Kenmerken : Kenmerken,
                    Omschrijving : Omschrijving
                });
                Service.SvcPersKenm("D", res.Username, PersKenmIn, function(result){
                    console.log(result);

                    delKenmerkenPromise.resolve(result)
                });
            });

            return delKenmerkenPromise.promise;
        },

        nextKenmerken:function(kenmerkenId, cb){
          var index=_.findIndex($rootScope.kenmerken, function(kenmerken){
            return kenmerken.Kenmerken===kenmerkenId;
          });
          if(index===-1 || index+1 >= $rootScope.kenmerken.length){
           // return cb();
           return cb($rootScope.kenmerken[0]);
          }
          return cb($rootScope.kenmerken[index+1]);
        },

        preKenmerken:function(kenmerkenId, cb){
          var index=_.findIndex($rootScope.kenmerken, function(kenmerken){
            return kenmerken.Kenmerken===kenmerkenId;
          });
          if(index===-1 || index===0){
           // return cb();
           return cb($rootScope.kenmerken[0]);
          }
          return cb($rootScope.kenmerken[index-1]);
        }

      };
    }]);
