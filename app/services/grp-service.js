angular.module('polderweb')
  .factory('Grp',
  ['GLOBALS', '$http', '$rootScope','$q','userService',
    function (GLOBALS, $http, $rootScope,$q,userService)
     {
      var currentUser = userService.get(); //20150801
 	  var lastId="";
      var myGrp = new TGrp();
      return {
        findAll: function () {
			$rootScope.display.grpGrp=true; //20150801
			$rootScope.display.grpOmschrijving=true; //20150801
			var defer = $q.defer();
            userService.get().$promise.then(function(res){
                myGrp.fromObject({Bedrijf : res.bedrijf, Grp : '', Omschrijving : ''});
                Service.SvcGrp("R", currentUser.username, myGrp, function(result) {
                    defer.resolve(result.toObject());
                });
            });
             return defer.promise;
        },
        getGrp: function (grpId) {
            var defer = $q.defer();
             userService.get().$promise.then(function(res){
             myGrp.fromObject({Bedrijf : res.bedrijf, Grp : '', Omschrijving : ''});
             Service.SvcGrp("R", currentUser.username, myGrp, function(result) {
                var data = _.find(result.toObject(), {'Grp':grpId});
                defer.resolve(data);
             });
            });
            return defer.promise;
        },
        addGrp: function (Grp,Omschrijving) {
           userService.get().$promise.then(function(res){
                myGrp.fromObject({Bedrijf : res.bedrijf, Grp : Grp, Omschrijving : Omschrijving});
                Service.SvcGrp("C", currentUser.username, myGrp);
            });

        },
        updateGrp:function(Grp,Omschrijving){
           userService.get().$promise.then(function(res){
                myGrp.fromObject({Bedrijf : res.bedrijf, Grp : Grp, Omschrijving : Omschrijving});
                Service.SvcGrp("U", currentUser.username, myGrp);
            });
        },
        delGrp:function(Grp,Omschrijving){
         userService.get().$promise.then(function(res){
                myGrp.fromObject({Bedrijf : res.bedrijf, Grp : Grp, Omschrijving : Omschrijving});
             Service.SvcGrp("D", currentUser.username, myGrp);
         });

          // _.remove($rootScope.grp,function(grps){
          //   return grps.grp===grpId;
          // });
        },
        nextGrp:function(grpId, cb){
          var index=_.findIndex($rootScope.grp, function(grps){
            return grps.Grp===grpId;
          });
          if(index===-1 || index+1 >= $rootScope.grp.length){
           // return cb();
           return cb($rootScope.grp[0]);
          }
          return cb($rootScope.grp[index+1]);
        },
        preGrp:function(grpId, cb){
          var index=_.findIndex($rootScope.grp, function(grps){
            return grps.Grp===grpId;
          });
          if(index===-1 || index===0){
           // return cb();
           return cb($rootScope.grp[0]);
          }
          return cb($rootScope.grp[index-1]);
        }
      };
    }]);
