class MainMemoController {
  constructor($scope, $stateParams, toastr) {
    'ngInject';
    $scope.$parent.$parent.main.activeMemoId = $stateParams.id;
    this.item = this.getSampleMemo($scope, $stateParams.id);
    this.labels = [];
    this.$scope = $scope;
    this.toastr = toastr;
  }

  getSampleMemo($scope, id) {
    // 서버 짜기 이전의 임시 메소드
    return $scope.$parent.$parent.main.memos.find(function(memo) {
      return memo.id === id;
    });
  }

  addLabel(newLabel) {
    if (newLabel && this.labels.length >= 10) {
      this.toastr.warning('라벨은 10개를 초과해서 달 수 없습니다.');
    } else if (newLabel) {
      if (this.labels.indexOf(newLabel) > -1) {
        this.toastr.warning('중복된 라벨이름을 사용할 수 없습니다.');
      } else {
        this.labels.push(newLabel);
      }
    }
  }

  removeLabel(label) {
    let rmIdx = this.labels.indexOf(label);
    this.labels.splice(rmIdx, 1);
  }

  removeLastLabel() {
    if (this.labels.length) this.labels.splice(this.labels.length - 1, 1);
  }
}

MainMemoController.$inject = ['$scope', '$stateParams', 'toastr'];
export default MainMemoController;
