export function config ($logProvider, $locationProvider, toastrConfig) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);
  $locationProvider.html5Mode(true);
  // Set options third-party lib
  toastrConfig.timeOut = 2000;
  toastrConfig.positionClass = 'toast-top-right';
}
