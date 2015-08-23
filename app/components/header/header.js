var pHeaderCtrl = function($element) {
  var ctrl = this;

};

angular.module('components.header', [])
  .controller('pHeaderCtrl', pHeaderCtrl)
  .directive('pHeader', function(){
      return {
          templateUrl: 'app/components/header/header.html',
          scope: {
              user: '='
          }, //isolate or not
          restrict : 'AE', //A = attribute, C = class, E = Element
          controller: 'pHeaderCtrl as ctrl',
          bindToController: true //true or false
      }
  })
;
