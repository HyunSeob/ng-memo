function LabelFilter() {
  'ngInject';

  return function(label) {
    return label.replace(/[^\wㄱ-ㅎㅏ-ㅣ가-힣]/gi, '');
  };
}

export { LabelFilter };
