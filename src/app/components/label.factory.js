export function LabelResource($resource) {
  'ngInject';
  return $resource('http://localhost:7777/labels/:name', {
    name: '@name'
  }, {
    query: {
      method: 'GET',
      url: 'http://localhost:7777/labels',
      isArray: true
    }, update: {
      method: 'PUT'
    }
  });
}
