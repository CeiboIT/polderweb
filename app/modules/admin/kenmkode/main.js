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

/* HowTo : this one isn't used ..?
  Answer: THIS IS NOT USED NOW. IT WAS REPLACED BY THE FOLLOWING STATE 'kenmkode.list[kenmerk]'
          WHERE FILTER BY THE KENMERK ID

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
                   kenmkodes: function (KenmKode, $stateParams) {
                        return KenmKode.findAll($stateParams.kenmerk);
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
                url:'/create/:kenmerk/:omschrijving',
                templateUrl:'app/modules/admin/kenmkode/create-kenmkode/create-kenmkode.html',
                controller:'createKenmKodeCtrl',
                resolve: {
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   },
                   username: function($cookieStore) {
                       return $cookieStore.get('user').Username;
                   },
                   params: function($stateParams) {
                      return [$stateParams.kenmerk, $stateParams.omschrijving];
                   }
                }
            })

            .state('kenmkode.view',
            {
                url:'/:kenmerk/:kode/:kenmerkomschrijving',
                templateUrl:'app/modules/admin/kenmkode/view-kenmkode/view-kenmkode.html',
                controller:'viewKenmKodeCtrl',
                resolve: {
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   },
                   username: function($cookieStore) {
                       return $cookieStore.get('user').Username;
                   },
                   params: function ($stateParams) {
                       return [$stateParams.kenmerk, $stateParams.kode, $stateParams.kenmerkomschrijving];
                   }
                }
            });
    });
