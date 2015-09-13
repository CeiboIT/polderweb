/**
 * Created by mmasuyama on 9/7/2015.
 */
var elementDeletionCtrl = function($scope, $element, $attrs, $modal) {
    var ctrl = this;
    var modalInstance;
    var compareByKey = ctrl.options.compareBy || 'id'; //use id by default

    $element.bind('click', function() {
            submitDeletion(ctrl.collection, ctrl.ngModel);
        }
    );



    if(!ctrl.onSuccess) {
        ctrl.onSuccces = function(result){
            console.log(result);
            if(ctrl.options.liveUpdate) {
                liveDeletion()
            }
            return result
        }
    }

    if(!ctrl.onError) {
        ctrl.onError = function(result){
            console.log(result);
            return result
        }
    }

    function liveDeletion () {
        var index = 0;

        ctrl.collection.some(function(elem, elemIndex){
            index = elemIndex;
            if(typeof ctrl.ngModel != 'object') {
                return elem[compareByKey] == ctrl.ngModel;
            }

            return elem[compareByKey] == ctrl.ngModel[compareByKey];
        });

        ctrl.collection.splice(index, 1);
    }

    function executeDeletion () {

        if (Array.isArray(ctrl.ngModel)) {

            var promisesArray = [];

            ctrl.ngModel.forEach(function(modelElement){
                var modelElementPromise = $q.defer();
                promisesArray.push(modelElementPromise.promise);
                ctrl.deletionService(modelElement).then(ctrl.onSuccces, ctrl.onError)
            });

            promisesArray.all(function(results){
                console.log(results)
            })


        } else {
            if(ctrl.options.usePromise) {
                ctrl.deletionService(ctrl.ngModel)
                    .then(ctrl.onSuccces, ctrl.onError);
            } else {
                ctrl.deletionService(ctrl.ngModel, ctrl.onSuccess)
            }
        }

    }

    function submitDeletion(item) {
        if(ctrl.deletionService) {

            if(ctrl.options.askBeforeDelete) {

                modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'app/components/commons/element_deletor/modal.html',
                    controller : function (items, $modalInstance) {
                        var ctrl = this;
                        ctrl.isArray = Array.isArray(ctrl.items);
                        ctrl.items = items;

                        ctrl.ok = function() {
                            $modalInstance.close();
                        };

                        ctrl.cancel = function() {
                            $modalInstance.dismiss();
                        };

                    },
                    controllerAs : 'ctrl',
                    resolve:  {
                        items : function() {
                            return  ctrl.ngModel;
                        }
                    }
                });

                 modalInstance.result.then(function(){
                    executeDeletion();
                }, function(){
                    console.log('Dismissed')
                });

            } else {
                executeDeletion();
            }

        }
    }

    angular.extend(ctrl, {
        submitDeletion: submitDeletion
    })
};

angular.module('ceibo.components.commons.elements', ['ui.bootstrap.modal'])
  .controller('elementDeletionCtrl', elementDeletionCtrl)
  .directive('elementDeletion', function(){
      return {
          require: "ngModel",
        scope: {
            collection: '=',
            ngModel: '=',
            deletionService: '=', //service for delete element if there is an interaction with any api
            options: '=', // liveUpdate : boolean
            modalOptions: '='
        }, //isolate or not
        restrict : 'AC', //A = attribute, C = class, E = Element
        controller: 'elementDeletionCtrl as ctrl',
        bindToController: true //true or false
      }
  })
;
