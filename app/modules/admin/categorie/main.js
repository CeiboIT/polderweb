/**
 * Created by mmasuyama on 8/29/2015.
 */
angular.module('polderweb.user',
    [])
    //configure the parent state for this module here
    .constant('userParentState',
    'admin')
    //configuration
    .config(function($stateProvider,
                     userParentState){
        $stateProvider

            .state('categorie', {
                url:'/categorie',
                parent: userParentState,
                abstract: true,
                template: '<div ui-view=""></div>'
             })

            .state('categorie.list',
            { url: '/list',
                templateUrl: 'app/modules/admin/categorie/categorie.html',
                controller: 'CategorieController',
                resolve: { categorie: function (Categorie) { return Categorie.findAll(); } }
            })
            .state('categorie.create',
            { url:'/create',
                templateUrl:'app/modules/admin/categorie/create-categorie/create-categorie.html',
                controller:'createCategorieCtrl'
            })
            .state('categorie.view',
            {
                url:'/:categorieId',
                templateUrl:'app/modules/admin/categorie/view-categorie/view-categorie.html',
                controller:'viewCategorieCtrl'
            })

    });


