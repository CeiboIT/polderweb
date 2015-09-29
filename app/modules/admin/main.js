angular.module('polderweb.admin', [
    //submodules of admin modules
    'polderweb.user',
    'polderweb.aanhef',
    'polderweb.functie',
    'polderweb.regio',
    'polderweb.titel',
    'polderweb.groep',
    'polderweb.kenmerk',
    'polderweb.kenmkode',
    'polderweb.mutreden',
    'polderweb.categorie',
    'polderweb.soortlid',
    'polderweb.soortbetaling',
    'polderweb.persoon'
])
    //configure the parent state for this module here
    .constant('adminParentState', 'home')
    //configuration
  .config(function ($stateProvider, adminParentState) {
    $stateProvider

        .state('admin', {
            url: '/admin',
            parent: adminParentState,
            template: '<div ui-view=""></div>',
            abstract: true
        })
 ;
 });
