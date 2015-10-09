angular.module('polderweb')
  .factory('Groep',
  ['GLOBALS', '$http', '$rootScope','$q','userService',
    function (GLOBALS, $http, $rootScope,$q,userService)
     {
      var currentUser = userService.get(); //20150801
      var lastId="";
      var myGroep = new TGroep();
      return {
        findAll: function () {
//			$rootScope.display.groepGroep=true;       //20150801 always display
//			$rootScope.display.groepOmschrijving=true;
			var defer = $q.defer();
            userService.get().then(function(res){
                myGroep.fromObject({Bedrijf : res.Bedrijf,Groep : '', Omschrijving : '', Periode : 0});
                Service.SvcGroep("R", res.Username, myGroep, function(result) {
                    defer.resolve(result.toObject());
//          alert(JSON.stringify(myGroep));
//          alert(JSON.stringify(result.toObject()));
                });
            });
             return defer.promise;
        },

        getGroep: function (groepId) {
            var defer = $q.defer();
             userService.get().then(function(res){
             myGroep.fromObject({Bedrijf : res.Bedrijf
			                   , Groep : groepId
							   , Omschrijving : ''
							   , Periode : 0});
             //myGroep.fromObject({Bedrijf : res.Bedrijf,Groep : '', Omschrijving : ''});
             Service.SvcGroep("R", res.Username, myGroep, function(result) {
                var data = _.find(result.toObject(), {'Groep':groepId});
                defer.resolve(data);
             });
            });
            return defer.promise;
        },

        addGroep: function (groepData) {
           userService.get().then(function(res){
                myGroep.fromObject({Bedrijf : res.Bedrijf
				                  , Groep : groepData.Groep
								  , Omschrijving : groepData.Omschrijving
				                  , Periode : groepData.Periode
								  });
                Service.SvcGroep("C", res.Username, myGroep);
            });
        },

        updateGroep:function(groepData){
           userService.get().then(function(res){
                myGroep.fromObject({Bedrijf : res.Bedrijf
				                  , Groep : groepData.Groep
								  , Omschrijving : groepData.Omschrijving
				                  , Periode : groepData.Periode
								  });
                Service.SvcGroep("U", res.Username, myGroep);
            });
        },

        delGroep: function(Groep,Omschrijving){
            var delGroepPromise = $q.defer();
            userService.get().then(function(res){
                myGroep.fromObject({Bedrijf : res.Bedrijf
				                  , Groep : Groep
								  , Omschrijving : Omschrijving
								  , Periode : 0});
                Service.SvcGroep("D", res.Username, myGroep, function(result){
                    console.log(result);
                    delGroepPromise.resolve(result)
                });
            });
            return delGroepPromise.promise;

          // _.remove($rootScope.groep,function(groeps){
          //   return groeps.groep===groepId;
          // });
        },
        nextGroep:function(groepId, cb){
          var index=_.findIndex($rootScope.groep, function(groeps){
            return groeps.Groep===groepId;
          });
          if(index===-1 || index+1 >= $rootScope.groep.length){
           // return cb();
           return cb($rootScope.groep[0]);
          }
          return cb($rootScope.groep[index+1]);
        },
        preGroep:function(groepId, cb){
          var index=_.findIndex($rootScope.groep, function(groeps){
            return groeps.Groep===groepId;
          });
          if(index===-1 || index===0){
           // return cb();
           return cb($rootScope.groep[0]);
          }
          return cb($rootScope.groep[index-1]);
        }
      };
    }]);
