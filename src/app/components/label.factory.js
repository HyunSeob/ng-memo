export function LabelResource($resource) {
  'ngInject';
  return $resource('http://localhost:7777/labels');
}
