class MainMemoController {
  constructor($scope, $stateParams, toastr, Memo) {
    'ngInject';
    let mainScope = $scope.$parent.$parent.main;
    if(mainScope.memos) {
      mainScope.memos.forEach(function(memo) {
        if (memo.id === parseInt($stateParams.id)) {
          this.item = mainScope.activeMemo = memo;
        }
      }.bind(this));
    } else {
      $scope.$on('memosLoaded', function() {
        mainScope.memos.forEach(function(memo) {
          if (memo.id === parseInt($stateParams.id)) {
            this.item = mainScope.activeMemo = memo;
          }
        }.bind(this));
      }.bind(this));
    }

    this.$scope = $scope;
    this.toastr = toastr;
    // this.Memo = Memo;
  }

  addLabel(newLabel) {
    if (newLabel && this.item.Labels.length >= 10) {
      this.toastr.warning('라벨은 10개를 초과해서 달 수 없습니다.');
    } else if (newLabel) {
      if (this.item.Labels.indexOf(newLabel) > -1) {
        this.toastr.warning('중복된 라벨이름을 사용할 수 없습니다.');
      } else {
        this.item.Labels.push(newLabel);
      }
    }
  }

  removeLabel(label) {
    let rmIdx = this.item.Labels.indexOf(label);
    this.item.Labels.splice(rmIdx, 1);
  }

  removeLastLabel() {
    if (this.item.Labels.length) this.item.Labels.splice(this.item.Labels.length - 1, 1);
  }
}

MainMemoController.$inject = ['$scope', '$stateParams', 'toastr', 'Memo'];
export default MainMemoController;
