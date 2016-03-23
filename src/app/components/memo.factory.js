export function MemoResource($resource) {
  'ngInject';

  return $resource(
    'http://localhost:7777/memos/:id', {
      id: '@id'
    }, {
      query: {
        method: 'GET',
        url: 'http://localhost:7777/memos',
        isArray: true
      }, save: {
        method: 'POST',
        url: 'http://localhost:7777/memos'
      }, update: {
        method: 'PUT'
      }, addLabel: {
        method: 'PUT',
        url: 'http://localhost:7777/memos',
        isArray: true
      }, removeMemos: {
        method: 'DELETE',
        url: 'http://localhost:7777/memos'
      }
    });
}
