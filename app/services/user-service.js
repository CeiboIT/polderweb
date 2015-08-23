angular.module('polderweb')
.factory('userService', function($resource) {
  return $resource('data/user.json', {
    id: '@id'
  },
  {
    get: {
      method: 'GET',
      params: {
        id: 'me'
      }
    }
  });
});
