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
                controller:'DashBoardController as ctrl',
                resolve: {
                    dashboard: function (DashBoard) {
                        return DashBoard.getDashBoard();
                    },
                    bedrijf: function($cookieStore) {
                        return $cookieStore.get('user').Bedrijf;
                    }
                }
            });

    });
