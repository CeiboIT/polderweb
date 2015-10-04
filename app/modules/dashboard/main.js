angular.module('polderweb.dashboard', [])
    .constant('dashboardParentStata','admin')

    .config(function($stateProvider, dashboardParentStata) {
        $stateProvider

            .state('dashboard', {
                url: '/dashboard',
                parent: dashboardParentStata,
                abstract: true,
                template: '<div ui-view=""></div>'
            })

            .state('dashboard.list', {
                url:'/list',
                templateUrl:'app/modules/dashboard/dashboard.html',
                controller:'DashboardController as ctrl',
                resolve: {
                    dashboard: function (Dashboard) { return Dashboard.findAll(); },
                    bedrijf: function($cookieStore) {
                        return $cookieStore.get('user').Bedrijf;
                    }
                }
            })
            .state('dashboard.create',
            {
                url:'/create',
                templateUrl:'app/modules/dashboard/create-dashboard/create-dashboard.html',
                controller:'createDashboardCtrl',
                resolve: {
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   }
                }
            })

            .state('dashboard.view',
            {
                url:'/:dashboardId',
                templateUrl:'app/modules/dashboard/view-dashboard/view-dashboard.html',
                controller:'viewDashboardCtrl',
                resolve: {
                   bedrijf: function($cookieStore) {
                       return $cookieStore.get('user').Bedrijf;
                   }
                }
            });

    });
