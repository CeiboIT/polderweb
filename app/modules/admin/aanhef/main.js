angular.module('polderweb.aanhef', [])
    .constant('aanhefParentStata','admin')
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

    .config(function($stateProvider, aanhefParentStata) {
        $stateProvider

            .state('aanhef', {
                url: '/aanhef',
                parent: aanhefParentStata,
                abstract: true,
                template: '<div ui-view=""></div>'
            })

            .state('aanhef.list', {
                url:'/list',
                templateUrl:'app/modules/admin/aanhef/aanhef.html',
                controller:'AanhefController as ctrl',
                resolve: { aanhefs: function (Aanhef) {
                    return Aanhef.findAll();
                    }
                }
            })
            .state('aanhef.create',
            {
                url:'/create',
                templateUrl:'app/modules/admin/aanhef/create-aanhef/create-aanhef.html',
                controller:'createAanhefCtrl'
            })

            .state('aanhef.view',
            {
                url:'/:aanhefId',
                templateUrl:'app/modules/admin/aanhef/view-aanhef/view-aanhef.html',
                controller:'viewAanhefCtrl'
            });

    });
