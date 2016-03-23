class MainMemoController {
  constructor($scope, $state, $stateParams, toastr) {
    'ngInject';
    let mainScope = $scope.$parent.$parent.main;
    if(mainScope.memos) {
      mainScope.memos.forEach((memo) => {
        if (memo.id === parseInt($stateParams.id)) {
          this.item = mainScope.activeMemo = memo;
        }
      });
      if (!this.item) $state.go('main.index');
    } else {
      $scope.$on('memosLoaded', () => {
        mainScope.memos.forEach((memo) => {
          if (memo.id === parseInt($stateParams.id)) {
            this.item = mainScope.activeMemo = memo;
          }
        });
        if (!this.item) $state.go('main.index');
      });
    }

    this.$scope = $scope;
    this.toastr = toastr;
  }

  addLabel(newLabel) {
    if (newLabel && this.item.Labels.length >= 10) {
      this.toastr.warning('라벨은 10개를 초과해서 달 수 없습니다.');
    } else if (newLabel) {
      if (this.indexOfLabel(newLabel) > -1) {
        this.toastr.warning('중복된 라벨이름을 사용할 수 없습니다.');
      } else {
        this.item.Labels.push({ name: newLabel });
      }
    }
  }

  indexOfLabel(labelName) {
    let index = -1;
    this.item.Labels.forEach((label, i) => {
      if (label.name === labelName) index = i;
    });
    return index;
  }

  removeLabel(label) {
    let rmIdx = this.indexOfLabel(label.name);
    if (rmIdx !== -1) this.item.Labels.splice(rmIdx, 1);
  }

  removeLastLabel() {
    if (this.item.Labels.length) {
      this.item.Labels.splice(this.item.Labels.length - 1, 1);
    }
  }
}

export { MainMemoController };
