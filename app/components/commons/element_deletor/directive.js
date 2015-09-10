/**
 * Created by mmasuyama on 9/7/2015.
 */
var elementDeletionCtrl = function($scope, $element, $attrs) {
    var ctrl = this;

    var comparaByKey = ctrl.options.compareBy || 'id'; //use id by default

    $element.bind('click', function() {
            submitDeletion(ctrl.collection, ctrl.item);
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
           // if(typeof ctrl.item != 'object') {
                return elem[comparaByKey] == ctrl.item;
           // }

            //return elem[comparaByKey] == ctrl.item[comparaByKey];
        });

        ctrl.collection.splice(index, 1);
    }

    function submitDeletion(item) {
        if(ctrl.deletionService) {
            if(ctrl.deletionService().then) {
                ctrl.deletionService(item)
                    .then(ctrl.onSuccces, ctrl.onError);
            } else {
                ctrl.deletionService(item, ctrl.onSuccess)
            }
            console.log(ctrl.deletionService);

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
        scope: {
            collection: '=',
            item: '=',
            deletionService: '=', //service for delete element if there is an interaction with any api
            options: '=', // liveUpdate : boolean
            params: '=' //params must be in order
        }, //isolate or not
        restrict : 'AC', //A = attribute, C = class, E = Element
        controller: 'elementDeletionCtrl as ctrl',
        bindToController: true, //true or false
      }
  })
;
