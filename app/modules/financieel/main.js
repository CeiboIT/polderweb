angular.module('polderweb.financieel', [
    //submodules of financieel modules
    'polderweb.openstaand',
])
    //configure the parent state for this module here
    .constant('financieelParentState', 'home')
    //configuration
  .config(function ($stateProvider, financieelParentState) {
    $stateProvider

        .state('financieel', {
            url: '/financieel',
            parent: financieelParentState,
            template: '<div ui-view=""></div>',
            abstract: true
        })
 ;
 });
