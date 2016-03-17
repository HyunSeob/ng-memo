class MainMemoController {
  constructor($scope, $stateParams) {
    'ngInject';
    $scope.$parent.$parent.main.activeMemoId = $stateParams.id;
    this.item = this.getSampleMemo($scope, $stateParams.id);
  }

  getSampleMemo($scope, id) {
    // 서버 짜기 이전의 임시 메소드
    return $scope.$parent.$parent.main.memos.find(function(memo) {
      return memo.id === id;
    });
  }
}

MainMemoController.$inject = ['$scope', '$stateParams'];
export default MainMemoController;
