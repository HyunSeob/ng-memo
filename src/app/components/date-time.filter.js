function DateTimeFilter($window) {
  'ngInject';

  return function(time) {
    return $window.moment(time).format('YYYY-MM-DD HH:mm');
  };
}

export { DateTimeFilter };
