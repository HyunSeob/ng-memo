export function config ($logProvider, toastrConfig) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);
  // Set options third-party lib
  toastrConfig.timeOut = 2000;
  toastrConfig.positionClass = 'toast-top-right';
}
