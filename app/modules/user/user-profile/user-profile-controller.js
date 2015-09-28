angular.module('polderweb.user')
    .controller('ProfileUserCtrl',
        function($scope, $state, User, authService, userData){

        $scope.user = userData;

    });
