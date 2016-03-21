export function PlainTextFilter() {
  'ngInject';

  return function (html) {
    return html ? String(html).replace(/<[^>]+>|&[\w]+;/gm, '') : '';
  };
}
