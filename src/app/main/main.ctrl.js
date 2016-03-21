export class MainController {
  constructor($scope, $state, $timeout, toastr, Memo, Label) {
    'ngInject';
    this.$scope = $scope;
    this.$state = $state;
    this.$timeout = $timeout;
    this.toastr = toastr;
    this.Memo = Memo;
    this.Label = Label;
    this.loadMemos();
    this.loadLabels();
  }

  loadMemos() {
    this.Memo.query()
    .$promise.then((memos) => {
      this.filteredMemos = this.memos = memos;
      this.$scope.$broadcast('memosLoaded', memos);
    })
    .catch(() => this.toastr.error('메모 목록을 불러오는데 실패했습니다.'));
  }

  loadLabels() {
    this.Label.query()
    .$promise.then((labels) => this.labels = labels)
    .catch(() => this.toastr.error('라벨 목록을 불러오는데 실패했습니다.'));
  }

  addMemo() {
    this.Memo
    .save({ memo: { title: '', body: '' } })
    .$promise.then((memo) => {
      this.memos.push(memo);
      this.labelFilter = '';
      this.filterByLabel();
      this.$state.go('main.memo', { id: memo.id });
      let asideEle = angular.element('aside .mid');
      this.$timeout(() => asideEle.scrollTo(0, asideEle.height() + 1000, 500));
    })
    .catch(() => this.toastr.error('문제가 발생했습니다. 다시 시도해주세요.'));
  }

  removeMemo() {
    if (this.activeMemo) {
      this.Memo
      .remove({ id: this.activeMemo.id })
      .$promise.then(() => {
        this.toastr.success('메모가 삭제되었습니다.');
        this.memos.splice(this.getActiveMemoIndex(), 1);
        this.loadLabels();
        this.filterByLabel();
        this.$state.go('main.index');
      })
      .catch(() => this.toastr.error('문제가 발생했습니다. 다시 시도해주세요.'));
    }
  }

  saveMemo() {
    if (this.activeMemo) {
      this.Memo
      .update({ id: this.activeMemo.id }, this.activeMemo)
      .$promise.then(() => {
        this.toastr.success('메모가 저장되었습니다.');
        this.loadLabels();
      })
      .catch(() => this.toastr.error('메모가 저장되지 않았습니다. 다시 시도해주세요.'));
    }
  }

  filterByLabel() {
    if (this.labelFilter === '') {
      this.filteredMemos = this.memos;
    } else {
      this.filteredMemos = this.memos.filter((memo) => {
        return memo.Labels.map((label) => label.name).indexOf(this.labelFilter) + 1;
      });
    }
  }

  getActiveMemoIndex() {
    let activeMemoIndex = -1;
    this.memos.forEach((memo, idx) => {
      if (memo.id === this.activeMemo.id) activeMemoIndex = idx;
    });
    return activeMemoIndex;
  }
}

MainController.$inject = ['$scope', '$state', '$timeout', 'toastr', 'Memo', 'Label'];
export { MainController };
