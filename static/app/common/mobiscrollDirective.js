'use strict';
//prevent link behavior
angular.module('xiaoyuApp')
  .directive('mobiscroll', function() {
    return {
      restrict: 'A',
      scope: {
        scroller: '=mobiscroll'
      },
      link: function(scope, elm, attrs, ctlr) {
        var options = {
          onClose: function(valueText, btn, inst) {
            if (btn !== 'set') {
              return;
            }
            scope.scroller.valueText = valueText;
            scope.scroller.value = angular.copy(inst.getValue());
            scope.scroller.values = angular.copy(inst.getValues());
            if (!scope.$$phase){
              scope.$apply();
            }
            return true;
          },
          onBeforeShow: function(inst) {
            inst.option(scope.scroller.options);
          }
        };

        angular.extend(options, scope.scroller.options);
        // elm.mobiscroll()[scope.scroller.options.type](options);
        elm.scroller(options);

        elm.on('$destroy', function() {
          elm.mobiscroll('destroy');
        });

        scope.scroller.call = function() {
          elm.mobiscroll.apply(elm, arguments);
        };
      }
    };
  });