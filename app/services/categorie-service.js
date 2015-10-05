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
//			$rootScope.display.categorieCategorie=true;       //20150801 always display
//			$rootScope.display.categorieOmschrijving=true;
			var defer = $q.defer();
            userService.get().then(function(res){
                myCategorie.fromObject({Bedrijf : res.Bedrijf,Categorie : '', Omschrijving : ''});
                Service.SvcCategorie("R", currentUser.username, myCategorie, function(result) {
                    defer.resolve(result.toObject());
//          alert(JSON.stringify(myCategorie));
//          alert(JSON.stringify(result.toObject()));
                });
            });
             return defer.promise;
        },
        getCategorie: function (categorieId) {
            var defer = $q.defer();
             userService.get().then(function(res){
             myCategorie.fromObject({Bedrijf : res.Bedrijf,Categorie : categorieId, Omschrijving : ''});
             //myCategorie.fromObject({Bedrijf : res.Bedrijf,Categorie : '', Omschrijving : ''});
             Service.SvcCategorie("R", currentUser.username, myCategorie, function(result) {
                var data = _.find(result.toObject(), {'Categorie':categorieId});
                defer.resolve(data);
             });
            });
            return defer.promise;
        },
        addCategorie: function (categorieData) {
           userService.get().then(function(res){
                myCategorie.fromObject({Bedrijf : res.Bedrijf,Categorie : categorieData.Categorie, Omschrijving : categorieData.Omschrijving});
                Service.SvcCategorie("C", currentUser.username, myCategorie);
            });

        },
        updateCategorie:function(categorieData){
           userService.get().then(function(res){
                myCategorie.fromObject({Bedrijf : res.Bedrijf,Categorie : categorieData.Categorie, Omschrijving : categorieData.Omschrijving});
                Service.SvcCategorie("U", currentUser.username, myCategorie);
            });
        },

        delCategorie: function(Categorie,Omschrijving){

            var delCategoriePromise = $q.defer();

            userService.get().then(function(res){
                myCategorie.fromObject({Bedrijf : res.Bedrijf,Categorie : Categorie, Omschrijving : Omschrijving});
                Service.SvcCategorie("D", currentUser.username, myCategorie, function(result){
                    console.log(result);

                    delCategoriePromise.resolve(result)
                });
            });

            return delCategoriePromise.promise;



          // _.remove($rootScope.categorie,function(categories){
          //   return categories.categorie===categorieId;
          // });
        },
        nextCategorie:function(categorieId, cb){
          var index=_.findIndex($rootScope.categorie, function(categories){
            return categories.Categorie===categorieId;
          });
          if(index===-1 || index+1 >= $rootScope.categorie.length){
           // return cb();
           return cb($rootScope.categorie[0]);
          }
          return cb($rootScope.categorie[index+1]);
        },
        preCategorie:function(categorieId, cb){
          var index=_.findIndex($rootScope.categorie, function(categories){
            return categories.Categorie===categorieId;
          });
          if(index===-1 || index===0){
           // return cb();
           return cb($rootScope.categorie[0]);
          }
          return cb($rootScope.categorie[index-1]);
        }
      };
    }]);
