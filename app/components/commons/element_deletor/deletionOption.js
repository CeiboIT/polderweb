/**
 * Created by mmasuyama on 9/7/2015.
 */


/**
 * Created by mmasuyama on 9/3/2015.
 */
var delOptionCtrl = function($scope, $element, $attrs) {
    var ctrl = this;
    var elementScope = $element.isolateScope().ctrl;

    $element.on('click', function(e){
        console.log($scope);
    })
};

var linkFn = function($scope, $element, $attrs, dirContrl) {
    var elementScope = $element.isolateScope();
    elementScope.ctrl.delElementCtrl = dirContrl;

};

angular.module('ceibo.components.commons.elements')
    .controller('delOptionCtrl', delOptionCtrl)
    .directive('delOption', function(){
        return {

            require: '^elementDeletion',
            scope: {
                elemDelOption: '='
            }, //isolate or not
            restrict : 'AC', //A = attribute, C = class, E = Element
            controller: 'delOptionCtrl  as ctrl',
            link: linkFn,
            bindToController: true //true or false
        }
    })

;
