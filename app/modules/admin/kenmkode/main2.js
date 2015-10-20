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

            .state('kenmkode.list', {
                url:'/list',
                templateUrl:'app/modules/admin/kenmkode/kenmkode.html',
                controller:'KenmKodeController as ctrl',
                resolve: {
                    kenmkodes: function (KenmKode) {
//"kenmkode.list({kenmerkId: kenmkode.Kenmerk})"
//					return KenmKode.findAll();
					return KenmKode.findAll(KenmKode.kenmerk);
//					return KenmKode.findAll(kenmKode);
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
                   }
                }
            });

    });
