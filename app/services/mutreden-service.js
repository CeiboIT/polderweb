angular.module('polderweb')
  .factory('MutReden',
  ['GLOBALS', '$http', '$rootScope','$q','userService',
    function (GLOBALS, $http, $rootScope,$q,userService)
     {
      var currentUser = userService.get(); //20150801
      var lastId="";
      var myMutReden = new TMutReden();
      return {
        findAll: function () {
			$rootScope.display.mutredenMutReden=true;       //20150801 always display
			$rootScope.display.mutredenOmschrijving=true;
			$rootScope.display.mutredenSoortMut=true;
			$rootScope.display.mutredenStopFactureren=true;
           var defer = $q.defer();
            userService.get().then(function(res){
                myMutReden.fromObject({Bedrijf : res.Bedrijf
		                     , SoortMut : ''
		                     , MutReden : ''
				     , Omschrijving : ''
				     , StopFactureren : false
				 });
                Service.SvcMutReden("R", res.Username, myMutReden, function(result) {
                    defer.resolve(result.toObject());
//          alert(JSON.stringify(myMutReden));
//          alert(JSON.stringify(result.toObject()));
                });
            });
             return defer.promise;
        },
        getMutReden: function (mutredenId) {
            var defer = $q.defer();
             userService.get().then(function(res){
             myMutReden.fromObject({Bedrijf : res.Bedrijf
	                          , SoortMut : 'INS'
				  , MutReden : mutredenId
				  , Omschrijving : ''
				  });
             //myMutReden.fromObject({Bedrijf : res.Bedrijf,MutReden : '', Omschrijving : ''});
             Service.SvcMutReden("R", res.Username, myMutReden, function(result) {
                var data = _.find(result.toObject(), {'MutReden':mutredenId});
                defer.resolve(data);
             });
            });
            return defer.promise;
        },
        addMutReden: function (mutredenData) {
           userService.get().then(function(res){
                myMutReden.fromObject({Bedrijf : res.Bedrijf
		                     , SoortMut : mutredenData.SoortMut
		                     , MutReden : mutredenData.MutReden
		                     , Omschrijving : mutredenData.Omschrijving
 				     , StopFactureren : mutredenData.StopFactureren
				     });
                Service.SvcMutReden("C", res.Username, myMutReden);
            });

        },
        updateMutReden:function(mutredenData){
           userService.get().then(function(res){
                myMutReden.fromObject({Bedrijf : res.Bedrijf
		                     , SoortMut : mutredenData.SoortMut
		                     , MutReden : mutredenData.MutReden
				     , Omschrijving : mutredenData.Omschrijving
 				     , StopFactureren : mutredenData.StopFactureren
				     });
                Service.SvcMutReden("U", res.Username, myMutReden);
            });
        },

        delMutReden: function(MutReden,Omschrijving){

            var delMutRedenPromise = $q.defer();

            userService.get().then(function(res){
                myMutReden.fromObject({Bedrijf : res.Bedrijf
		                     , SoortMut : SoortMut
		                     , MutReden : MutReden
				     , Omschrijving : Omschrijving
 				     , StopFactureren : false
				     });
                Service.SvcMutReden("D", res.Username, myMutReden, function(result){
                    console.log(result);

                    delMutRedenPromise.resolve(result)
                });
            });

            return delMutRedenPromise.promise;



          // _.remove($rootScope.mutreden,function(mutredens){
          //   return mutredens.mutreden===mutredenId;
          // });
        },
        nextMutReden:function(mutredenId, cb){
          var index=_.findIndex($rootScope.mutreden, function(mutredens){
            return mutredens.MutReden===mutredenId;
          });
          if(index===-1 || index+1 >= $rootScope.mutreden.length){
           // return cb();
           return cb($rootScope.mutreden[0]);
          }
          return cb($rootScope.mutreden[index+1]);
        },
        preMutReden:function(mutredenId, cb){
          var index=_.findIndex($rootScope.mutreden, function(mutredens){
            return mutredens.MutReden===mutredenId;
          });
          if(index===-1 || index===0){
           // return cb();
           return cb($rootScope.mutreden[0]);
          }
          return cb($rootScope.mutreden[index-1]);
        }
      };
    }]);
