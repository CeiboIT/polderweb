angular.module('polderweb')
  .factory('Contriburieregels',
  ['GLOBALS', '$http', '$rootScope','$q','userService',
    function (GLOBALS, $http, $rootScope,$q,userService)
     {
      var currentUser = userService.get();
      var lastId="";
      var myContriburieregels = new TPersPeri();
      return {
        findAll: function (lidnr) {
            var defer = $q.defer();
            userService.get().then(function(res){
                myContriburieregels.fromObject({
                    Aantal : '',
                    AantalTermijnen : '',
                    Bedrag : '',
                    BedragBetaald : '',
                    Bedrijf : res.Bedrijf, // master-field
                    BetaalWijze : '',
                    DatumBetaald : '',
                    DatumEind : '',
                    DatumFactuur : '',
                    DatumIngang : '',
                    DatumVerstuurd : '',
                    Dispensatie : '',
                    Fatuurnr : '',
                    Groep : '',
                    LidNr : lidnr, // master-field
                    Opmerking : '',
                    Periode : '',
                    TermijnNr : ''
                });
                Service.SvcPersPeri("R", res.Username, myContriburieregels, function(result) {
                    defer.resolve(result.toObject());
//          alert(JSON.stringify(myContriburieregels));
//          alert(JSON.stringify(result.toObject()));
                });
            });
             return defer.promise;
        },
        getContriburieregels: function (contriburieregelsId) {
            var defer = $q.defer();
             userService.get().then(function(res){
             myContriburieregels.fromObject({
                Bedrijf : res.Bedrijf,
                Contriburieregels : contriburieregelsId,
                Omschrijving : ''
             });
             //myContriburieregels.fromObject({Bedrijf : res.Bedrijf,Contriburieregels : '', Omschrijving : ''});
             Service.SvcPersPeri("R", res.Username, myContriburieregels, function(result) {
                var data = _.find(result.toObject(), {'Contriburieregels':contriburieregelsId});
                defer.resolve(data);
             });
            });
            return defer.promise;
        },
        addContriburieregels: function (contriburieregelsData) {
           userService.get().then(function(res){
                myContriburieregels.fromObject({
                    Bedrijf : res.Bedrijf,
                    Contriburieregels : contriburieregelsData.Contriburieregels,
                    Omschrijving : contriburieregelsData.Omschrijving
                });
                Service.SvcPersPeri("C", res.Username, myContriburieregels);
            });

        },
        updateContriburieregels:function(contriburieregelsData){
           userService.get().then(function(res){
                myContriburieregels.fromObject({
                    Bedrijf : res.Bedrijf,
                    Contriburieregels : contriburieregelsData.Contriburieregels,
                    Omschrijving : contriburieregelsData.Omschrijving
                });
                Service.SvcPersPeri("U", res.Username, myContriburieregels);
            });
        },

        delContriburieregels: function(Contriburieregels,Omschrijving){

            var delContriburieregelsPromise = $q.defer();

            userService.get().then(function(res){
                myContriburieregels.fromObject({
                    Bedrijf : res.Bedrijf,
                    Contriburieregels : Contriburieregels,
                    Omschrijving : Omschrijving
                });
                Service.SvcPersPeri("D", res.Username, myContriburieregels, function(result){
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