angular.module('polderweb')
  .controller('LoginCtrl',
  function ($scope, authService,$state) {
    if(authService.getToken()!=null){
       $state.go('home');
     }else{
      $scope.auth = {};
      $scope.login = function () {
        authService.login($scope.auth, function(err){
          if(err){
            $scope.error=err.message;
          }else{
            $state.go('home');
          }
        });
      };
     }
    });
