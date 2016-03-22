export function MemoResource($resource) {
  'ngInject';

  return $resource(
    'http://192.168.35.140:7777/memos/:id', {
      id: '@id'
    }, {
      query: {
        method: 'GET',
        url: 'http://192.168.35.140:7777/memos',
        isArray: true
      }, save: {
        method: 'POST',
        url: 'http://192.168.35.140:7777/memos'
      }, update: {
        method: 'PUT'
      }, label: {
        method: 'POST'
      }
    });
}
