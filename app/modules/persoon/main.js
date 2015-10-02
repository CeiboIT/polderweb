angular.module('polderweb.persoon', [])
    .constant('persoonParentStata','admin')
    .constant('geslachtOptions', [
        {'value': 'M', 'label': 'Man'},
        {'value' : 'V', 'label': 'Vrouw'},
        {'value': 'O', 'label': 'Onbekend'}
    ])

    .filter('geslachtFilter', function(geslachtOptions){

        return function(input) {
            if(input) {
                var ind;
                geslachtOptions.some(function(option, index){
                    ind = index;
                    return option.value == input
                });

                return geslachtOptions[ind].label;
            }
        }

    })

    .config(function($stateProvider, persoonParentStata) {
        $stateProvider

            .state('persoon', {
                url: '/persoon',
                parent: persoonParentStata,
                abstract: true,
                template: '<div ui-view=""></div>'
            })

            .state('persoon.list', {
                url:'/list',
                templateUrl:'app/modules/persoon/persoon.html',
                controller:'PersoonController as ctrl',
                resolve: {
                    persoon: function (Persoon) { return Persoon.findAll(); },
                    regio: function (Regio) { return Regio.findAll(); },
                    soortlid: function (SoortLid) { return SoortLid.findAll(); }
                }
            })
            .state('persoon.create',
            {
                url:'/create',
                templateUrl:'app/modules/persoon/create-persoon/create-persoon.html',
                controller:'createPersoonCtrl'
            })

            .state('persoon.view',
            {
                url:'/:persoonId',
                templateUrl:'app/modules/persoon/view-persoon/view-persoon.html',
                controller:'viewPersoonCtrl'
            });

    });

/*
 .state('adminPersoon' ,{ url:'/admin/persoon', templateUrl:'app/modules/admin/persoon/persoon.html', controller:'PersoonController'
     , resolve: { persoon: function (Persoon) { return Persoon.findAll(); },
                  regio: function (Regio) {return Regio.findAll(); },
                  soortlid: function (Soortlid) {return Soortlid.findAll();}}})
 .state('createPersoon',{ url:'/admin/persoon/create', templateUrl:'app/modules/admin/persoon/create-persoon/create-persoon.html', controller:'createPersoonCtrl'})
 .state('viewPersoon' , { url:'/admin/persoon/:persoonId', templateUrl:'app/modules/admin/persoon/view-persoon/view-persoon.html', controller:'viewPersoonCtrl'})
*/
