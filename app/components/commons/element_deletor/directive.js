/**
 * Created by mmasuyama on 9/7/2015.
 */
var elementDeletionCtrl = function($scope, $element, $attrs) {
    var ctrl = this;

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

    function submitDeletion(item) {
        if(ctrl.deletionService) {

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
                if(ctrl.deletionService().then) {
                 ctrl.deletionService(item)
                    .then(ctrl.onSuccces, ctrl.onError);
                 } else {
                    ctrl.deletionService(item, ctrl.onSuccess)
                 }

                liveDeletion();
             }

        }
    }

    angular.extend(ctrl, {
        submitDeletion: submitDeletion
    })
};

angular.module('ceibo.components.commons.elements', [])
  .controller('elementDeletionCtrl', elementDeletionCtrl)
  .directive('elementDeletion', function(){
      return {
          require: "ngModel",
        scope: {
            collection: '=',
            ngModel: '=',
            deletionService: '=', //service for delete element if there is an interaction with any api
            options: '=' // liveUpdate : boolean
        }, //isolate or not
        restrict : 'AC', //A = attribute, C = class, E = Element
        controller: 'elementDeletionCtrl as ctrl',
        bindToController: true //true or false
      }
  })
;
