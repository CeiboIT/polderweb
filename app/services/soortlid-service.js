angular.module('polderweb')
  .factory('Soortlid',[
    'GLOBALS', '$http', '$rootScope', '$q','userService',
    function (GLOBALS, $http, $rootScope, $q,userService) {
      var currentUser = userService.get(); //20150801
      var lastId="";
      var myRslt     = true;
      var myMsg      = '';
      var mySoortLid = new TSoortLid();
      return {

	    findAll: function () {
			$rootScope.display.soortlidSoortLid=true;       //20150801 always display
			$rootScope.display.soortlidOmschrijving=true;
            var defer = $q.defer();
            userService.get().$promise.then(function(res){
            mySoortLid.fromObject({ Bedrijf : res.bedrijf,SoortLid : '', Omschrijving : '' });
            Service.SvcSoortLid("R", currentUser.username, mySoortLid, function(result) {
            defer.resolve(result.toObject());
            });
          });
          return defer.promise;
        },

        getSoortlid: function (soortlid) {
            var defer = $q.defer();
			userService.get().$promise.then(function(res){
            // mySoortLid.fromObject({ Bedrijf : res.bedrijf,SoortLid : '', Omschrijving : ''});
            // Service.SvcSoortLid("R", currentUser.username, mySoortLid, function(result) {
            //   var data = _.find(result.toObject(), {'SoortLid':soortlid});
            //   defer.resolve(data);
			// niet gehele tabel lezen
            //mySoortLid.fromObject({ Bedrijf : res.bedrijf,SoortLid : soortlid, Omschrijving : ''});
            mySoortLid.fromObject({ Bedrijf : res.bedrijf,SoortLid : '', Omschrijving : ''});
            Service.SvcSoortLid("R", currentUser.username, mySoortLid, function(result) {
            var data = _.find(result.toObject(), {'SoortLid':soortlid});
            //var data = result.toObject()[0]; //niet zoeken in array maar tonen gevonden regel
            defer.resolve(data);
//console.log('soortlid3 ' + soortlid);
//console.log(JSON.stringify(result.toObject()));
//console.log(JSON.stringify(result.toObject()[0]));
//console.log(JSON.stringify(result.toObject()[0].SoortLid));
//console.log(JSON.stringify(result.toObject()[0].Omschrijving));
            });
          });
          return defer.promise;
        },

        addSoortlid: function (soortlid,omschrijving) {
          userService.get().$promise.then(function(res){
                 mySoortLid.fromObject({ Bedrijf : res.bedrijf,SoortLid : soortlid, Omschrijving : omschrijving });
                 Service.SvcSoortLid("C", currentUser.username, mySoortLid);
           });
        },

        updateSoortlid:function(soortlid,omschrijving){
          userService.get().$promise.then(function(res){
                 mySoortLid.fromObject({ Bedrijf : res.bedrijf,SoortLid : soortlid, Omschrijving : omschrijving });
                 Service.SvcSoortLid("U", currentUser.username, mySoortLid);
          });
        },
        delSoortlid:function(soortlid,omschrijving){
            userService.get().$promise.then(function(res){
                mySoortLid.fromObject({ Bedrijf : res.bedrijf,SoortLid : soortlid, Omschrijving : omschrijving });
                Service.SvcSoortLid("D", currentUser.username, mySoortLid);
            });
        },
        nextSoortlid:function(soortlid, cb){
          var index=_.findIndex(
            $rootScope.soortl, function(soortl){
            return soortl.SoortLid===soortlid;
          });
          if(index===-1 || index+1 >= $rootScope.soortl.length){
            //return cb();
            return cb($rootScope.soortl[0]);
          }
          return cb($rootScope.soortl[index+1]);
        },
        preSoortlid:function(soortlid, cb){
          var index=_.findIndex($rootScope.soortl, function(soortl){
            return soortl.SoortLid===soortlid;
          });
          if(index===-1 || index===0){
            //return cb();
            return cb($rootScope.soortl[0]);
          }
          return cb($rootScope.soortl[index-1]);
        }
      };
    }]);

