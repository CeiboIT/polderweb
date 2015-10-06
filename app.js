angular.module('polderweb', [
    'ui.utils',
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
    'ngCookies',
    'ngSanitize',
    'ngMessages',
    'ngResource',
    'smart-table',
    'ui.checkbox',
    'angular-loading-bar',

    //our components
    'ceibo.components.table.export',
    'ceibo.components.commons.elements',
    'pldr.components.header',
    'ceibo.components.sideBar',

    //our modules
    'polderweb.auth',
    'polderweb.admin',
    'polderweb.financieel',
    'polderweb.dashboard',

]);
angular.module('polderweb').config(function ($urlRouterProvider, loginUrl) {

  /* Add New States Above */
  $urlRouterProvider.otherwise(loginUrl);

})
  .run(function ($rootScope, Person,SoortLid,Regio) {
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

    .constant('loginState', 'auth.login')
    .constant('loginUrl', '/access/login')
    .constant('homeState', 'home.init')
    .constant('appParentState', 'home')
    .constant('GLOBALS', {
        personUrl: 'data/persons.json',
        regioUrl: 'data/regio.json',
        soortlidUrl: 'data/soortlid.json'
    });
