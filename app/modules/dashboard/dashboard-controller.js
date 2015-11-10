angular.module('polderweb')
//20151005  .controller('PersoonController',
  .controller('DashBoardController',
    function ($rootScope, $scope, $state, DashBoard, dashboards, bedrijf, username, authService) {

       var model = {
           selection : [],
           dashboards: dashboards
       };

       $scope.bedrijf = bedrijf;
       $scope.username = username;

      angular.extend(this,{
          model: model,
          dashboardService: DashBoard
      })

    });
