angular.module('polderweb')
  .controller('PersoonController',
    function ($rootScope, $scope, $state, DashBoard, dashboard, bedrijf, authService) {

       var model = {
           selection : [],
           dashboard: dashboard
       };

       $scope.bedrijf = bedrijf;

      angular.extend(this,{
          model: model,
          dashboardService: DashBoard
      })

    });
