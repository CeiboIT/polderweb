angular.module('polderweb')
//20151005  .controller('PersoonController',
  .controller('DashBoardController',
    function ($rootScope, $scope, $state, DashBoard, dashboards, bedrijf, authService) {

       var model = {
           selection : [],
//20151005
           dashboards: dashboards
       };

       $scope.bedrijf = bedrijf;

      angular.extend(this,{
          model: model,
          dashboardService: DashBoard
      })

    });
