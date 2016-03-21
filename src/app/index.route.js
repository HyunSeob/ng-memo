export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main',
      abstract: true
    })
    .state('main.index', {
      url: '',
      templateUrl: 'app/main/index/index.html'
    })
    .state('main.memo', {
      url: ':id',
      templateUrl: 'app/main/memo/memo.html',
      controller: 'MainMemoController',
      controllerAs: 'memo'
    });
  $urlRouterProvider.otherwise('/');
}
