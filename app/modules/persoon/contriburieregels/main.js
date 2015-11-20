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
                templateUrl:'app/modules/persoon/contriburieregels/contriburieregels.html',
                controller:'ContriburieregelsController as list',
                resolve: {
                    contriburieregels: function (Contriburieregels, $stateParams) {
                        return Contriburieregels.findAll($stateParams.lidnr);
                    },
                    params: function ($stateParams) {
                      return $stateParams.lidnr;
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
                url:'/create/:lidnr',
                templateUrl:'app/modules/persoon/contriburieregels/create-contriburieregels/create-contriburieregels.html',
                controller:'createContriburieregelsCtrl',
                resolve: {
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   },
                   username: function($cookieStore) {
                       return $cookieStore.get('user').Username;
                   },
                    params: function ($stateParams) {
                      return $stateParams.lidnr;
                    }
                }
            })

            .state('contriburieregels.view',
            {
                url:'/view/:lidnr/:groep',
                templateUrl:'app/modules/persoon/contriburieregels/view-contriburieregels/view-contriburieregels.html',
                controller:'viewContriburieregelsCtrl',
                resolve: {
                    contriburieregels: function (Contriburieregels, $stateParams) {
                        return Contriburieregels.getContriburieregels($stateParams.lidnr, $stateParams.groep);
                    },
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   },
                   username: function($cookieStore) {
                       return $cookieStore.get('user').Username;
                   }
                }
            });

    });
