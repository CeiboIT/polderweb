angular.module('polderweb', [
  'ui.utils',
  'ui.router',
  'ngAnimate',
  'ui.bootstrap',
  'ngCookies',
  'ngSanitize',
  'ngResource',
  'scrollable-table',
  'ui.checkbox'
]);
angular.module('polderweb').config(function ($urlRouterProvider) {

  /* Add New States Above */
  $urlRouterProvider.otherwise('/login');

})
  .run(function ($rootScope, Person,Soortlid,Regio) {
    $rootScope.persons = [];
    $rootScope.soortl=[];
    $rootScope.regio=[];
    Person.getPersons();
    $rootScope.mySort = 'id';
    $rootScope.reverse = false;
    $rootScope.display={id:true, name:true, lastname:true, soortlid:true, regio:true, action: true, description: true,omschrijving:true};
    $rootScope.filter={id:'', name:'', lastname:'', soortlid:'', regio:''};

    $rootScope.safeApply = function (fn) {
      var phase = $rootScope.$$phase;
      if (phase === '$apply' || phase === '$digest') {
        if (fn && (typeof (fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };
  })
  .constant('GLOBALS', {
    personUrl: 'data/persons.json',
    regioUrl: 'data/regio.json',
    soortlidUrl: 'data/soortlid.json'
  });
