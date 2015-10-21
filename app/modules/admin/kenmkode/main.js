angular.module('polderweb.kenmkode', [])
    .constant('kenmkodeParentStata','admin')

    .config(function($stateProvider, kenmkodeParentStata) {
        $stateProvider

            .state('kenmkode', {
                url: '/kenmkode',
                parent: kenmkodeParentStata,
                abstract: true,
                template: '<div ui-view=""></div>'
            })

/*
            .state('kenmkode.list', {
                url:'/list',
                templateUrl:'app/modules/admin/kenmkode/kenmkode.html',
                controller:'KenmKodeController as ctrl',
                resolve: {
                   kenmkodes: function (KenmKode) {
                        return KenmKode.findAll();
                    },
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   },
                   username: function($cookieStore) {
                       return $cookieStore.get('user').Username;
                   }
                }
            })
*/
            .state('kenmkode.list[kenmerk]', {
                url:'/list/:kenmerk/:omschrijving',
                templateUrl:'app/modules/admin/kenmkode/kenmkode.html',
                controller:'KenmKodeController2 as ctrl',
                resolve: {
                   kenmkodes: function (KenmKode) {
//20151021                        return KenmKode.findAll();
//alert (JSON.stringify($stateProvider.kenmerkId));
//alert (JSON.stringify($scope.params[0]));
                        return KenmKode.findAll($stateProvider.kenmerkId);
                    },
                   params: function($stateParams) {
                      return [$stateParams.kenmerk, $stateParams.omschrijving];
                   },
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   },
                   username: function($cookieStore) {
                       return $cookieStore.get('user').Username;
                   }
                }
            })

            .state('kenmkode.create',
            {
                url:'/create',
                templateUrl:'app/modules/admin/kenmkode/create-kenmkode/create-kenmkode.html',
                controller:'createKenmKodeCtrl',
                resolve: {
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   },
                   username: function($cookieStore) {
                       return $cookieStore.get('user').Username;
                   }
                }
            })

            .state('kenmkode.view',
            {
                url:'/:kenmkodeId',
                templateUrl:'app/modules/admin/kenmkode/view-kenmkode/view-kenmkode.html',
                controller:'viewKenmKodeCtrl',
                resolve: {
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   },
                   username: function($cookieStore) {
                       return $cookieStore.get('user').Username;
                   },
                    kenmerks: function (Kenmerk) {
                        return Kenmerk.findAll();
                    }
                }
            });

    });
