export function LabelResource($resource) {
  'ngInject';
  return $resource('http://192.168.35.140:7777/labels');
}
