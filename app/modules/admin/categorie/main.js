angular.module('polderweb.categorie', [])
    .constant('categorieParentStata','admin')

    .config(function($stateProvider, categorieParentStata) {
        $stateProvider

            .state('categorie', {
                url: '/categorie',
                parent: categorieParentStata,
                abstract: true,
                template: '<div ui-view=""></div>'
            })

            .state('categorie.list', {
                url:'/list',
                templateUrl:'app/modules/admin/categorie/categorie.html',
                controller:'CategorieController as ctrl',
                resolve: {
                    categories: function (Categorie) {
                        return Categorie.findAll();
                    },
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   }
                }
            })
            .state('categorie.create',
            {
                url:'/create',
                templateUrl:'app/modules/admin/categorie/create-categorie/create-categorie.html',
                controller:'createCategorieCtrl',
                resolve: {
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   }
                }
            })

            .state('categorie.view',
            {
                url:'/:categorieId',
                templateUrl:'app/modules/admin/categorie/view-categorie/view-categorie.html',
                controller:'viewCategorieCtrl',
                resolve: {
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   }
                }
            });

    });
