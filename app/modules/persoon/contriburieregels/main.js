angular.module('polderweb.contriburieregels', [])
    .constant('contriburieregelsParentStata','admin')

    .config(function($stateProvider, contriburieregelsParentStata) {
        $stateProvider

            .state('contriburieregels', {
                url: '/contriburieregels',
                parent: contriburieregelsParentStata,
                abstract: true,
                template: '<div ui-view=""></div>'
            })

            .state('contriburieregels.list', {
                url:'/list/:lidnr',
                templateUrl:'app/modules/admin/contriburieregels/contriburieregels.html',
                controller:'ContriburieregelsController as ctrl',
                resolve: {
                    contriburieregels: function (Contriburieregels, $stateParams) {
                        return Contriburieregels.findAll($stateParams.lidnr);
                    },
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   },
                   username: function($cookieStore) {
                       return $cookieStore.get('user').Username;
                   }
                }
            })
            .state('contriburieregels.create',
            {
                url:'/create',
                templateUrl:'app/modules/admin/contriburieregels/create-contriburieregels/create-contriburieregels.html',
                controller:'createContriburieregelsCtrl',
                resolve: {
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   },
                   username: function($cookieStore) {
                       return $cookieStore.get('user').Username;
                   }
                }
            })

            .state('contriburieregels.view',
            {
                url:'/:contriburieregelsId',
                templateUrl:'app/modules/admin/contriburieregels/view-contriburieregels/view-contriburieregels.html',
                controller:'viewContriburieregelsCtrl',
                resolve: {
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   },
                   username: function($cookieStore) {
                       return $cookieStore.get('user').Username;
                   }
                }
            });

    });
