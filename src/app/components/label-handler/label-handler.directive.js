export function LabelHandlerDirective() {
  'ngInject';

  let directive = {
    restrict: 'A',
    scope: {
      labels: '='
    },
    link: function (scope, element) {
      element.on('keydown', function(event) {
        // console.log(event.keyCode);
        event.preventDefault();
        return false;
      });
    }
  };

  return directive;
}
