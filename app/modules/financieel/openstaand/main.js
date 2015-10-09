angular.module('polderweb.openstaand', [])
    .constant('openstaandParentStata','financieel')

    .config(function($stateProvider, openstaandParentStata) {
        $stateProvider

            .state('openstaand', {
                url: '/openstaand',
                parent: openstaandParentStata,
                abstract: true,
                template: '<div ui-view=""></div>'
            })

            .state('openstaand.list', {
                url:'/list',
                templateUrl:'app/modules/financieel/openstaand/openstaand.html',
                controller:'OpenstaandController as ctrl',
                resolve: {
                    openstaands: function (Openstaand) {
                        return Openstaand.findAll();
                    },
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   },
                   username: function($cookieStore) {
                       return $cookieStore.get('user').Username;
                   }
                }
            })
            .state('openstaand.create',
            {
                url:'/create',
                templateUrl:'app/modules/financieel/openstaand/create-openstaand/create-openstaand.html',
                controller:'createOpenstaandCtrl',
                resolve: {
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   },
                   username: function($cookieStore) {
                       return $cookieStore.get('user').Username;
                   }
                }
            })

            .state('openstaand.view',
            {
                url:'/:openstaandId',
                templateUrl:'app/modules/financieel/openstaand/view-openstaand/view-openstaand.html',
                controller:'viewOpenstaandCtrl',
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
