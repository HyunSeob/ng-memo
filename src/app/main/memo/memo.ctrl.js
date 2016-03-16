class MainMemoController {
  constructor($scope, $stateParams) {
    'ngInject';
    // console.log($stateParams.id);
    $scope.$parent.$parent.main.activeMemoId = $stateParams.id;
    let memo = this.getSampleMemo($scope, $stateParams.id);
    this.id = $stateParams.id;
    this.title = memo.title;
    this.body = memo.body;
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
