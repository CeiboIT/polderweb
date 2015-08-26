angular.module('polderweb')
  .controller('viewUserCtrl',
    function ($scope, User, $state, $stateParams,authService) {
      if(authService.getToken()==null){
           $state.go('login');
         }else{
      User.getUser($stateParams.userId).then(function(res){
        $scope.user = res;
      });

      $scope.clickSave = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            User.updateUser($scope.user.User,$scope.user.Passwrd);
             $state.go('adminUser');
        }
      };

      $scope.clickDel = function () {
         var msg = confirm("Verwijderen ? J/N");
          if (msg == true) {
            User.delUser($scope.user.User,$scope.user.Passwrd);
            $state.go('adminUser'); // Terug naar homepage
          }
      };

      $scope.clickCancel = function () {
         User.getUser($stateParams.userId).then(function(res){
          $scope.user = res;
         });
      };

      $scope.clickNext = function () {
        User.nextUser($scope.user.User,function (userId) {
          if (userId) {
            $scope.user = userId;
          }
        });
      };

      $scope.clickPre = function () {
        User.preUser($scope.user.User, function (userId) {
          if (userId) {
            $scope.user = userId;
          }
        });
      };
  }
    });
