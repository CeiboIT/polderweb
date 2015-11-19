angular.module('polderweb')
  .factory('Betalingen',
  ['GLOBALS', '$http', '$rootScope','$q','userService',
    function (GLOBALS, $http, $rootScope,$q,userService)
     {
      var currentUser = userService.get();
      var lastId="";
      var PersBetIn = new TPersBet();
      return {
        findAll: function (lidnr) {
            var defer = $q.defer();
            userService.get().then(function(res){
                PersBetIn.fromObject({
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
                Service.SvcPersBet("R", res.Username, PersBetIn, function(result) {
                    defer.resolve(result.toObject());
//          alert(JSON.stringify(PersBetIn));
//          alert(JSON.stringify(result.toObject()));
                });
            });
             return defer.promise;
        },
        getBetalingen: function (lidNId) {
            var defer = $q.defer();
             userService.get().then(function(res){
             PersBetIn.fromObject({
                Bedrijf : res.Bedrijf,
                Betalingen : betalingenId,
                Omschrijving : ''
             });
             //PersBetIn.fromObject({Bedrijf : res.Bedrijf,Betalingen : '', Omschrijving : ''});
             Service.SvcPersBet("R", res.Username, PersBetIn, function(result) {
                var data = _.find(result.toObject(), {'Betalingen':betalingenId});
                defer.resolve(data);
             });
            });
            return defer.promise;
        },
        addBetalingen: function (betalingenData) {
           userService.get().then(function(res){
                PersBetIn.fromObject({
                    Aantal : 0,
                    AantalTermijnen : 0,
                    BankRekNr : '',
                    Bedrag : 0,
                    BedragBetaald : 0,
                    Bedrijf : res.Bedrijf, // master-field
                    BetaalWijze : betalingenData.BetaalWijze,
                    DatumBetaald : '1899-12-30T00:00:00',
                    DatumEind : betalingenData.DatumEind,
                    DatumFactuur : '1899-12-30T00:00:00',
                    DatumIngang : betalingenData.DatumIngang,
                    DatumVerstuurd : '1899-12-30T00:00:00',
                    Dispensatie : false,
                    Fatuurnr : '',
                    Groep : betalingenData.Groep,
                    LidNr : parseInt(betalingenData.LidNr), // master-field
                    Opmerking : betalingenData.Opmerking,
                    Periode : betalingenData.Periode,
                    TermijnNr : 0
                });
                Service.SvcPersBet("C", res.Username, PersBetIn);
            });

        },
        updateBetalingen:function(betalingenData){
           userService.get().then(function(res){
                PersBetIn.fromObject({
                    Aantal : 0,
                    AantalTermijnen : 0,
                    BankRekNr : '',
                    Bedrag : 0,
                    BedragBetaald : 0,
                    Bedrijf : res.Bedrijf, // master-field
                    BetaalWijze : betalingenData.BetaalWijze,
                    DatumBetaald : '1899-12-30T00:00:00',
                    DatumEind : betalingenData.DatumEind,
                    DatumFactuur : '1899-12-30T00:00:00',
                    DatumIngang : betalingenData.DatumIngang,
                    DatumVerstuurd : '1899-12-30T00:00:00',
                    Dispensatie : false,
                    Fatuurnr : '',
                    Groep : betalingenData.Groep,
                    LidNr : betalingenData.LidNr, // master-field
                    Opmerking : betalingenData.Opmerking,
                    Periode : betalingenData.Periode,
                    TermijnNr : 0                });
                Service.SvcPersBet("U", res.Username, PersBetIn);
            });
        },

        delBetalingen: function(Betalingen,Omschrijving){

            var delBetalingenPromise = $q.defer();

            userService.get().then(function(res){
                PersBetIn.fromObject({
                    Bedrijf : res.Bedrijf,
                    Betalingen : Betalingen,
                    Omschrijving : Omschrijving
                });
                Service.SvcPersBet("D", res.Username, PersBetIn, function(result){
                    console.log(result);

                    delBetalingenPromise.resolve(result)
                });
            });

            return delBetalingenPromise.promise;
        },

        nextBetalingen:function(betalingenId, cb){
          var index=_.findIndex($rootScope.betalingen, function(betalingen){
            return betalingen.Betalingen===betalingenId;
          });
          if(index===-1 || index+1 >= $rootScope.betalingen.length){
           // return cb();
           return cb($rootScope.betalingen[0]);
          }
          return cb($rootScope.betalingen[index+1]);
        },

        preBetalingen:function(betalingenId, cb){
          var index=_.findIndex($rootScope.betalingen, function(betalingen){
            return betalingen.Betalingen===betalingenId;
          });
          if(index===-1 || index===0){
           // return cb();
           return cb($rootScope.betalingen[0]);
          }
          return cb($rootScope.betalingen[index-1]);
        }

      };
    }]);
