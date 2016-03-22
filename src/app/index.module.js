/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

import { MainController } from './main/main.ctrl';
import { MainMemoController } from './main/memo/memo.ctrl';

import { PlainTextFilter } from '../app/components/plain-text.filter';
import { DateTimeFilter } from '../app/components/date-time.filter';

import { LabelHandlerDirective } from '../app/components/label-handler.directive';
import { ContenteditableDirective } from '../app/components/contenteditable.directive';

import { MemoResource } from '../app/components/memo.factory';
import { LabelResource } from '../app/components/label.factory';

angular.module('ngMemo', [
  'ngAnimate',
  'ngCookies',
  'ngTouch',
  'ngMessages',
  'ngAria',
  'ngResource',
  'ui.router',
  'toastr',
  'duScroll'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .filter('plainText', PlainTextFilter)
  .filter('dateTime', DateTimeFilter)
  .controller('MainController', MainController)
  .controller('MainMemoController', MainMemoController)
  .factory('Memo', MemoResource)
  .factory('Label', LabelResource)
  .directive('labelHandler', LabelHandlerDirective)
  .directive('contenteditable', ContenteditableDirective);
