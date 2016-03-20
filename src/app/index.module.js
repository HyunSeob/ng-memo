/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

import { default as MainController } from './main/main.ctrl';
import { default as MainMemoController } from './main/memo/memo.ctrl';

import { PlainTextFilter } from '../app/components/plain-text/plain-text.filter';
import { LabelHandlerDirective } from '../app/components/label-handler/label-handler.directive';

import { MemoResource } from '../app/components/memo.factory';
import { LabelResource } from '../app/components/label.factory';

angular.module('ngMemo', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'toastr', 'contenteditable'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .filter('plainText', PlainTextFilter)
  .controller('MainController', MainController)
  .controller('MainMemoController', MainMemoController)
  .factory('Memo', MemoResource)
  .factory('Label', LabelResource)
  .directive('labelHandler', LabelHandlerDirective);
