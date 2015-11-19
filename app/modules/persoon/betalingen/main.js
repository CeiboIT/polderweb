angular.module('polderweb.betalingen', [])
    .constant('betalingenParentStata','admin')

    .config(function($stateProvider, betalingenParentStata) {
        $stateProvider

            .state('betalingen', {
                url: '/betalingen',
                parent: betalingenParentStata,
                abstract: true,
                template: '<div ui-view=""></div>'
            })

            .state('betalingen.list', {
                url:'/list/:lidnr',
                templateUrl:'app/modules/persoon/betalingen/betalingen.html',
                controller:'BetalingenController as list',
                resolve: {
                    betalingen: function (Betalingen, $stateParams) {
                        return Betalingen.findAll($stateParams.lidnr);
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
            .state('betalingen.create',
            {
                url:'/create/:lidnr',
                templateUrl:'app/modules/persoon/betalingen/create-betalingen/create-betalingen.html',
                controller:'createBetalingenCtrl',
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

            .state('betalingen.view',
            {
                url:'/:betalingenId',
                templateUrl:'app/modules/persoon/betalingen/view-betalingen/view-betalingen.html',
                controller:'viewBetalingenCtrl',
                resolve: {
                    betalingen: function (Betalingen, $stateParams) {
                        return Betalingen.getBetalingen($stateParams.betalingenId);
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
