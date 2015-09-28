angular.module('polderweb.admin', [
    //submodules of admin modules
    'polderweb.user',
    'polderweb.aanhef',
    'polderweb.functie',
    'polderweb.regio',
    'polderweb.titel',
    'polderweb.mutreden',
    'polderweb.categorie',
    'polderweb.soortlid',
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

 // ---------------------------------------------------------------------------------
 .state('adminSoortBetaling', { url:'/admin/soortbetaling',                  templateUrl:'app/modules/admin/soortbetaling/soortbetaling.html',                             controller:'SoortBetalingController', resolve: { soortbetaling: function (SoortBetaling) { return SoortBetaling.findAll(); } } })
 .state('createSoortBetaling',{ url:'/admin/soortbetaling/create',           templateUrl:'app/modules/admin/soortbetaling/create-soortbetaling/create-soortbetaling.html', controller:'createSoortBetalingCtrl' })
 .state('viewSoortBetaling',  { url:'/admin/soortbetaling/:soortbetalingId', templateUrl:'app/modules/admin/soortbetaling/view-soortbetaling/view-soortbetaling.html',     controller:'viewSoortBetalingCtrl' })
 // ---------------------------------------------------------------------------------
 .state('adminKenmerk', { url:'/admin/kenmerk',                              templateUrl:'app/modules/admin/kenmerk/kenmerk.html',                                         controller:'KenmerkController', resolve: { kenmerk: function (Kenmerk) { return Kenmerk.findAll(); } } })
 .state('createKenmerk',{ url:'/admin/kenmerk/create',                       templateUrl:'app/modules/admin/kenmerk/create-kenmerk/create-kenmerk.html',                   controller:'createKenmerkCtrl' })
 .state('viewKenmerk',  { url:'/admin/kenmerk/:kenmerkId',                   templateUrl:'app/modules/admin/kenmerk/view-kenmerk/view-kenmerk.html',                       controller:'viewKenmerkCtrl' })
 // ---------------------------------------------------------------------------------
 .state('adminKenmKode', { url:'/admin/kenmkode',                            templateUrl:'app/modules/admin/kenmkode/kenmkode.html',                                       controller:'KenmKodeController', resolve: { kenmkode: function (KenmKode) { return KenmKode.findAll(); } } })
 .state('createKenmKode',{ url:'/admin/kenmkode/create',                     templateUrl:'app/modules/admin/kenmkode/create-kenmkode/create-kenmkode.html',                controller:'createKenmKodeCtrl' })
 .state('viewKenmKode',  { url:'/admin/kenmkode/:kenmkodeId',                templateUrl:'app/modules/admin/kenmkode/view-kenmkode/view-kenmkode.html',                    controller:'viewKenmKodeCtrl' })
 // ---------------------------------------------------------------------------------
 .state('adminGroep', { url:'/admin/groep',                                  templateUrl:'app/modules/admin/groep/groep.html',                                             controller:'GroepController', resolve: { groep: function (Groep) { return Groep.findAll(); } } })
 .state('createGroep',{ url:'/admin/groep/create',                           templateUrl:'app/modules/admin/groep/create-groep/create-groep.html',                         controller:'createGroepCtrl' })
 .state('viewGroep',  { url:'/admin/groep/:groepId',                         templateUrl:'app/modules/admin/groep/view-groep/view-groep.html',                             controller:'viewGroepCtrl' })
 // ---------------------------------------------------------------------------------
// .state('adminLidsoorten', { url: '/admin/lidsoorten', templateUrl: 'app/modules/admin/lidsoorten/lidsoorten.html', controller: 'LidsoortenController', resolve: { soortlid: function (SoortLid) { return SoortLid.findAll(); } } })
// .state('createSoortLid',  { url:'/admin/lidsoorten/create', templateUrl:'app/modules/admin/lidsoorten/create-lidsoorten/create-lidsoorten.html', controller: 'createSoortLidCtrl' })
// .state('viewSoortLid',    { url:'/admin/lidsoorten/:soortlid', templateUrl:'app/modules/admin/lidsoorten/view-lidsoorten/view-lidsoorten.html', controller: 'viewSoortLidCtrl' })
 // ---------------------------------------------------------------------------------
 ;
 });
