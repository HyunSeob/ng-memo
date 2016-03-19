export function LabelHandlerDirective() {
  'ngInject';

  let directive = {
    restrict: 'A',
    scope: {
      labels: '=',
      labelString: '=ngModel',
      enterKey: '&',
      deleteKey: '&'
    },
    link: function (scope, element) {
      element.on('keydown', function(event) {
        console.log(event.keyCode);
        if (event.keyCode === 9
        || event.keyCode === 13) {
          event.preventDefault();
          scope.$apply(function() {
            scope.enterKey({ newLabel: scope.labelString.replace(/[^\wㄱ-ㅎㅏ-ㅣ가-힣]/gi, '') });
            scope.labelString = '';
          });
        } else if (event.keyCode === 8) {
          if (!scope.labelString) {
            event.preventDefault();
            scope.$apply(() => scope.deleteKey());
          }
        }
      });
    }
  };

  return directive;
}
