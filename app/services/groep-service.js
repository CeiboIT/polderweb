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
			$rootScope.display.groepGroep=true;       //20150801
			$rootScope.display.groepOmschrijving=true;
			$rootScope.display.groepPeriode=true;     //20150803
			var defer = $q.defer();
            userService.get().$promise.then(function(res){
                myGroep.fromObject({Bedrijf : res.bedrijf, Groep : '', Omschrijving : '', Periode : 0});
//          alert(JSON.stringify(myGroep));
                Service.SvcGroep("R", currentUser.username, myGroep, function(result) { 
                    defer.resolve(result.toObject());
                }); //20150801
            });
             return defer.promise;
        },
        getGroep: function (groepId) {
            var defer = $q.defer();
             userService.get().$promise.then(function(res){
             myGroep.fromObject({Bedrijf : res.bedrijf, Groep : '', Omschrijving : '', Periode : 0});
             Service.SvcGroep("R", currentUser.username, myGroep, function(result) {
			 var data = _.find(result.toObject(), {'Groep':groepId});
                defer.resolve(data);
             });
            });
            return defer.promise;
        },
        addGroep: function (Groep,Omschrijving) {
           userService.get().$promise.then(function(res){
                myGroep.fromObject({Bedrijf : res.bedrijf
                             , Groep : Groep 
                             , Omschrijving : Omschrijving 
                             , Periode : Periode 
							   });
                Service.SvcGroep("C", currentUser.username, myGroep);
            });

        },
        updateGroep:function(Groep,Omschrijving){
           userService.get().$promise.then(function(res){
                myGroep.fromObject({Bedrijf : res.bedrijf
                             , Groep : Groep 
                             , Omschrijving : Omschrijving 
                             , Periode : Periode 
							   });
                Service.SvcGroep("U", currentUser.username, myGroep);
            });
        },
        delGroep:function(Groep,Omschrijving){
         userService.get().$promise.then(function(res){
                myGroep.fromObject({Bedrijf : res.bedrijf
                             , Groep : Groep 
                             , Omschrijving : Omschrijving 
                             , Periode : Periode 
							   });
				Service.SvcGroep("D", currentUser.username, myGroep);
         });
        },
//                             , AantalMaanden : 0 //{dataType : "Integer", value : null};
//                             , Actief : false //{dataType : "Boolean", value : null};
//                             , Brief : '' 
//                             , BTWCode : '' 
//                             , Categorie : '' 
                             //, DatumGebNa : null //{dataType : "DateTime", value : null};
                             //, DatumGebTotMet : null //{dataType : "DateTime", value : null};
                             //, DatumGebVoor : null //{dataType : "DateTime", value : null};
//                             , Duur : '' 
//                             , ExternNr : '' 
//							 , GroepsVolgorde : 0 //{dataType : "Integer", value : null};
//                             , IndBundelen : false //{dataType : "Boolean", value : null};
//                             , IndProlongeren : false //{dataType : "Boolean", value : null};
//                             , JaarBedrag : 0 //{dataType : "Currency", value : null};
//                             , KostenVerzend : 0 //{dataType : "Currency", value : null};
//                             , NieuweGroep : '' 
//                             , NieuwePeriode : 0 //{dataType : "Integer", value : null};
//                             , Opmerking : '' //{dataType : "WideString", value : null};
//                             , RelNr : 0 //{dataType : "Integer", value : null};
//                             , Sortering : 0 //{dataType : "Integer", value : null};

          // _.remove($rootScope.groep,function(groeps){
          //   return groeps.groep===groepId;
          // });
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
