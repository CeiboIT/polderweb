angular.module('polderweb')
  .factory('Contriburieregels',
  ['GLOBALS', '$http', '$rootScope','$q','userService',
    function (GLOBALS, $http, $rootScope,$q,userService)
     {
      var currentUser = userService.get();
      var lastId="";
      var PersPeriIn = new TPersPeri();
      return {
        findAll: function (lidnr) {
            var defer = $q.defer();
            userService.get().then(function(res){
                PersPeriIn.fromObject({
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
                    Periode : 0,
                    TermijnNr : 0
                });
                Service.SvcPersPeri("R", res.Username, PersPeriIn, function(result) {
                    defer.resolve(result.toObject());
//          alert(JSON.stringify(PersPeriIn));
//          alert(JSON.stringify(result.toObject()));
                });
            });
             return defer.promise;
        },
        getContriburieregels: function (lidnr, groep) {
            var defer = $q.defer();
             userService.get().then(function(res){
             PersPeriIn.fromObject({
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
                    Groep : groep,
                    LidNr : lidnr, // master-field
                    Opmerking : '',
                    Periode : 0,
                    TermijnNr : 0
             });
             //PersPeriIn.fromObject({Bedrijf : res.Bedrijf,Contriburieregels : '', Omschrijving : ''});
             Service.SvcPersPeri("R", res.Username, PersPeriIn, function(result) {
                    defer.resolve(result.toObject());
             });
            });
            return defer.promise;
        },
        addContriburieregels: function (contriburieregelsData) {
           userService.get().then(function(res){
                PersPeriIn.fromObject({
                    Aantal : 0,
                    AantalTermijnen : 0,
                    BankRekNr : '',
                    Bedrag : 0,
                    BedragBetaald : 0,
                    Bedrijf : res.Bedrijf, // master-field
                    BetaalWijze : contriburieregelsData.BetaalWijze,
                    DatumBetaald : '1899-12-30T00:00:00',
                    DatumEind : contriburieregelsData.DatumEind,
                    DatumFactuur : '1899-12-30T00:00:00',
                    DatumIngang : contriburieregelsData.DatumIngang,
                    DatumVerstuurd : '1899-12-30T00:00:00',
                    Dispensatie : false,
                    Fatuurnr : '',
                    Groep : contriburieregelsData.Groep,
                    LidNr : parseInt(contriburieregelsData.LidNr), // master-field
                    Opmerking : contriburieregelsData.Opmerking,
                    Periode : contriburieregelsData.Periode,
                    TermijnNr : 0
                });
                Service.SvcPersPeri("C", res.Username, PersPeriIn);
            });

        },
        updateContriburieregels:function(contriburieregelsData){
           userService.get().then(function(res){
                PersPeriIn.fromObject({
                    Aantal : 0,
                    AantalTermijnen : 0,
                    BankRekNr : '',
                    Bedrag : 0,
                    BedragBetaald : 0,
                    Bedrijf : res.Bedrijf, // master-field
                    BetaalWijze : contriburieregelsData.BetaalWijze,
                    DatumBetaald : '1899-12-30T00:00:00',
                    DatumEind : contriburieregelsData.DatumEind,
                    DatumFactuur : '1899-12-30T00:00:00',
                    DatumIngang : contriburieregelsData.DatumIngang,
                    DatumVerstuurd : '1899-12-30T00:00:00',
                    Dispensatie : false,
                    Fatuurnr : '',
                    Groep : contriburieregelsData.Groep,
                    LidNr : contriburieregelsData.LidNr, // master-field
                    Opmerking : contriburieregelsData.Opmerking,
                    Periode : contriburieregelsData.Periode,
                    TermijnNr : 0                });
                Service.SvcPersPeri("U", res.Username, PersPeriIn);
            });
        },

        delContriburieregels: function(Contriburieregels,Omschrijving){

            var delContriburieregelsPromise = $q.defer();

            userService.get().then(function(res){
                PersPeriIn.fromObject({
                    Bedrijf : res.Bedrijf,
                    Contriburieregels : Contriburieregels,
                    Omschrijving : Omschrijving
                });
                Service.SvcPersPeri("D", res.Username, PersPeriIn, function(result){
                    console.log(result);

                    delContriburieregelsPromise.resolve(result)
                });
            });

            return delContriburieregelsPromise.promise;
        },

        nextContriburieregels:function(contriburieregelsId, cb){
          var index=_.findIndex($rootScope.contriburieregels, function(contriburieregels){
            return contriburieregels.Contriburieregels===contriburieregelsId;
          });
          if(index===-1 || index+1 >= $rootScope.contriburieregels.length){
           // return cb();
           return cb($rootScope.contriburieregels[0]);
          }
          return cb($rootScope.contriburieregels[index+1]);
        },

        preContriburieregels:function(contriburieregelsId, cb){
          var index=_.findIndex($rootScope.contriburieregels, function(contriburieregels){
            return contriburieregels.Contriburieregels===contriburieregelsId;
          });
          if(index===-1 || index===0){
           // return cb();
           return cb($rootScope.contriburieregels[0]);
          }
          return cb($rootScope.contriburieregels[index-1]);
        }

      };
    }]);
