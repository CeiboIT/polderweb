angular.module('polderweb.admin', [
    //submodules of admin modules
    'polderweb.user'

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
 .state('adminRegio', { url:'/admin/regio',                                  templateUrl:'app/modules/admin/regio/regio.html',                                             controller:'RegioController', resolve: { regio: function (Regio) { return Regio.findAll(); } } })
 .state('createRegio',{ url:'/admin/regio/create',                           templateUrl:'app/modules/admin/regio/create-regio/create-regio.html',                         controller:'createRegioCtrl' })
 .state('viewRegio',  { url:'/admin/regio/:regioId',                         templateUrl:'app/modules/admin/regio/view-regio/view-regio.html',                             controller:'viewRegioCtrl' })
 // ---------------------------------------------------------------------------------
 .state('adminSoortBetaling', { url:'/admin/soortbetaling',                  templateUrl:'app/modules/admin/soortbetaling/soortbetaling.html',                             controller:'SoortBetalingController', resolve: { soortbetaling: function (SoortBetaling) { return SoortBetaling.findAll(); } } })
 .state('createSoortBetaling',{ url:'/admin/soortbetaling/create',           templateUrl:'app/modules/admin/soortbetaling/create-soortbetaling/create-soortbetaling.html', controller:'createSoortBetalingCtrl' })
 .state('viewSoortBetaling',  { url:'/admin/soortbetaling/:soortbetalingId', templateUrl:'app/modules/admin/soortbetaling/view-soortbetaling/view-soortbetaling.html',     controller:'viewSoortBetalingCtrl' })
 // ---------------------------------------------------------------------------------
 .state('adminAanhef', { url:'/admin/aanhef',                                templateUrl:'app/modules/admin/aanhef/aanhef.html',                                           controller:'AanhefController as ctrl', resolve: { aanhef: function (Aanhef) { return Aanhef.findAll(); } } })
 .state('createAanhef',{ url:'/admin/aanhef/create',                         templateUrl:'app/modules/admin/aanhef/create-aanhef/create-aanhef.html',                      controller:'createAanhefCtrl' })
 .state('viewAanhef',  { url:'/admin/aanhef/:aanhefId',                      templateUrl:'app/modules/admin/aanhef/view-aanhef/view-aanhef.html',                          controller:'viewAanhefCtrl' })
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
 .state('adminTitel' , { url:'/admin/titel', templateUrl:'app/modules/admin/titel/titel.html', controller:'TitelController',resolve: { titel: function (Titel) { return Titel.findAll(); }}})
 .state('createTitel' ,{ url:'/admin/titel/create', templateUrl:'app/modules/admin/titel/create-titel/create-titel.html', controller:'createTitelCtrl' })
 .state('viewTitel' ,  { url:'/admin/titel/:titelId', templateUrl:'app/modules/admin/titel/view-titel/view-titel.html', controller:'viewTitelCtrl' })
 // ---------------------------------------------------------------------------------
 .state('adminFunctie' ,{ url:'/admin/functie', templateUrl:'app/modules/admin/functie/functie.html', controller:'FunctieController', resolve: { functie: function (Functie) { return Functie.findAll(); }}})
 .state('createFunctie',{ url:'/admin/functie/create', templateUrl:'app/modules/admin/functie/create-functie/create-functie.html', controller:'createFunctieCtrl'})
 .state('viewFunctie' ,{ url:'/admin/functie/:functieId', templateUrl:'app/modules/admin/functie/view-functie/view-functie.html', controller:'viewFunctieCtrl'})
 // ---------------------------------------------------------------------------------
 .state('adminPersoon' ,{ url:'/admin/persoon', templateUrl:'app/modules/admin/persoon/persoon.html', controller:'PersoonController'
	 , resolve: { persoon: function (Persoon) { return Persoon.findAll(); },
                  regio: function (Regio) {return Regio.findAll(); },
                  soortlid: function (Soortlid) {return Soortlid.findAll();}}})
 .state('createPersoon',{ url:'/admin/persoon/create', templateUrl:'app/modules/admin/persoon/create-persoon/create-persoon.html', controller:'createPersoonCtrl'})
 .state('viewPersoon' , { url:'/admin/persoon/:persoonId', templateUrl:'app/modules/admin/persoon/view-persoon/view-persoon.html', controller:'viewPersoonCtrl'})
 // ---------------------------------------------------------------------------------
 .state('adminMutReden' ,{ url: '/admin/mutreden', templateUrl: 'app/modules/admin/mutreden/mutreden.html', controller: 'MutRedenController', resolve: { mutreden: function (MutReden) { return MutReden.findAll(); } } })
 .state('createMutReden',{ url:'/admin/mutreden/create', templateUrl:'app/modules/admin/mutreden/create-mutreden/create-mutreden.html', controller:'createMutRedenCtrl'})
 .state('viewMutReden' , { url:'/admin/mutreden/:mutredenId', templateUrl:'app/modules/admin/mutreden/view-mutreden/view-mutreden.html', controller:'viewMutRedenCtrl'})
 // ---------------------------------------------------------------------------------
 .state('adminCategorie', { url: '/admin/categorie', templateUrl: 'app/modules/admin/categorie/categorie.html', controller: 'CategorieController', resolve: { categorie: function (Categorie) { return Categorie.findAll(); } } })
 .state('createCategorie',{ url:'/admin/categorie/create', templateUrl:'app/modules/admin/categorie/create-categorie/create-categorie.html', controller:'createCategorieCtrl' })
 .state('viewCategorie',  { url:'/admin/categorie/:categorieId', templateUrl:'app/modules/admin/categorie/view-categorie/view-categorie.html', controller:'viewCategorieCtrl' })
 // ---------------------------------------------------------------------------------
 .state('adminLidsoorten', { url: '/admin/lidsoorten', templateUrl: 'app/modules/admin/lidsoorten/lidsoorten.html', controller: 'LidsoortenController', resolve: { soortlid: function (Soortlid) { return Soortlid.findAll(); } } })
 .state('createSoortlid',  { url:'/admin/lidsoorten/create', templateUrl:'app/modules/admin/lidsoorten/create-lidsoorten/create-lidsoorten.html', controller: 'createSoortLidCtrl' })
 .state('viewSoortlid',    { url:'/admin/lidsoorten/:soortlid', templateUrl:'app/modules/admin/lidsoorten/view-lidsoorten/view-lidsoorten.html', controller: 'viewSoortlidCtrl' })
 // ---------------------------------------------------------------------------------
 ;
 });
