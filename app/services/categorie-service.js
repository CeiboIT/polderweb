angular.module('polderweb')
  .factory('Categorie',
  ['GLOBALS', '$http', '$rootScope','$q','userService',
    function (GLOBALS, $http, $rootScope,$q,userService)
     {
      var currentUser = userService.get(); //20150801
      var lastId="";
      var myCategorie = new TCategorie();
      return {
        findAll: function () {
//			$rootScope.display.CategorieCategorie=true;       //20150801 always display
//			$rootScope.display.CategorieOmschrijving=true;
			var defer = $q.defer();
            userService.get().$promise.then(function(res){
                myCategorie.fromObject({Bedrijf : res.bedrijf,Categorie : '', Omschrijving : ''});
                Service.SvcCategorie("R", currentUser.username, myCategorie, function(result) {
                    defer.resolve(result.toObject());
//          alert(JSON.stringify(myCategorie));
//          alert(JSON.stringify(result.toObject()));
                });
            });
             return defer.promise;
        },
        getCategorie: function (CategorieId) {
            var defer = $q.defer();
             userService.get().$promise.then(function(res){
             myCategorie.fromObject({Bedrijf : res.bedrijf,Categorie : CategorieId, Omschrijving : ''});
             //myCategorie.fromObject({Bedrijf : res.bedrijf,Categorie : '', Omschrijving : ''});
             Service.SvcCategorie("R", currentUser.username, myCategorie, function(result) {
                var data = _.find(result.toObject(), {'Categorie':CategorieId});
                defer.resolve(data);
             });
            });
            return defer.promise;
        },
        addCategorie: function (CategorieData) {
           userService.get().$promise.then(function(res){
                myCategorie.fromObject({Bedrijf : res.bedrijf,Categorie : CategorieData.Categorie, Omschrijving : CategorieData.Omschrijving});
                Service.SvcCategorie("C", currentUser.username, myCategorie);
            });

        },
        updateCategorie:function(CategorieData){
           userService.get().$promise.then(function(res){
                myCategorie.fromObject({Bedrijf : res.bedrijf,Categorie : CategorieData.Categorie, Omschrijving : CategorieData.Omschrijving});
                Service.SvcCategorie("U", currentUser.username, myCategorie);
            });
        },

        delCategorie: function(Categorie,Omschrijving){

            var delCategoriePromise = $q.defer();

            userService.get().$promise.then(function(res){
                myCategorie.fromObject({Bedrijf : res.bedrijf,Categorie : Categorie, Omschrijving : Omschrijving});
                Service.SvcCategorie("D", currentUser.username, myCategorie, function(result){
                    console.log(result);

                    delCategoriePromise.resolve(result)
                });
            });

            return delCategoriePromise.promise;



          // _.remove($rootScope.Categorie,function(Categories){
          //   return Categories.Categorie===CategorieId;
          // });
        },
        nextCategorie:function(CategorieId, cb){
          var index=_.findIndex($rootScope.Categorie, function(Categories){
            return Categories.Categorie===CategorieId;
          });
          if(index===-1 || index+1 >= $rootScope.Categorie.length){
           // return cb();
           return cb($rootScope.Categorie[0]);
          }
          return cb($rootScope.Categorie[index+1]);
        },
        preCategorie:function(CategorieId, cb){
          var index=_.findIndex($rootScope.Categorie, function(Categories){
            return Categories.Categorie===CategorieId;
          });
          if(index===-1 || index===0){
           // return cb();
           return cb($rootScope.Categorie[0]);
          }
          return cb($rootScope.Categorie[index-1]);
        }
      };
    }]);
