angular.module('polderweb.functie', [])
    .constant('functieParentStata','admin')

    .config(function($stateProvider, functieParentStata) {
        $stateProvider

            .state('functie', {
                url: '/functie',
                parent: functieParentStata,
                abstract: true,
                template: '<div ui-view=""></div>'
            })

            .state('functie.list', {
                url:'/list',
                templateUrl:'app/modules/admin/functie/functie.html',
                controller:'FunctieController as ctrl',
                resolve: {
                    functies: function (Functie) {
                        return Functie.findAll();
                    },
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   }
                }
            })
            .state('functie.create',
            {
                url:'/create',
                templateUrl:'app/modules/admin/functie/create-functie/create-functie.html',
                controller:'createFunctieCtrl',
                resolve: {
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   }
                }
            })

            .state('functie.view',
            {
                url:'/:functieId',
                templateUrl:'app/modules/admin/functie/view-functie/view-functie.html',
                controller:'viewFunctieCtrl',
                resolve: {
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   }
                }
            });

    });
