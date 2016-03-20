export class MainController {
  constructor($state, toastr, Memo, $scope) {
    'ngInject';
    this.$state = $state;
    this.Memo = Memo;
    this.toastr = toastr;
    this.$scope = $scope;
    this.loadMemos();
  }

  loadMemos() {
    let main = this;
    this.Memo.query()
    .$promise.then(function(memos) {
      main.memos = memos;
      main.$scope.$broadcast('memosLoaded', memos);
    }).catch(function() {
      main.toastr.error('메모 목록을 불러오는데 실패했습니다.');
    });
  }

  addMemo() {
    let main = this;
    this.Memo
    .save({ memo: { title: '', body: '' } })
    .$promise.then(function(memo) {
      main.memos.push(memo);
      main.$state.go('main.memo', { id: memo.id });
    }).catch(function() {
      main.toastr.error('문제가 발생했습니다. 다시 시도해주세요.');
    });
  }

  removeMemo() {
    let main = this;
    if (this.activeMemo) {
      this.Memo
      .remove({ id: this.activeMemo.id })
      .$promise.then(function() {
        main.toastr.success('메모가 삭제되었습니다.');
        main.memos.splice(main.getActiveMemoIndex(), 1);
        main.$state.go('main.index');
      }).catch(function() {
        main.toastr.error('문제가 발생했습니다. 다시 시도해주세요.');
      });
    }
  }

  saveMemo() {
    if (this.activeMemo) {
      this.Memo
      .update({ id: this.activeMemo.id }, this.activeMemo)
      .$promise.then(() => this.toastr.success('메모가 저장되었습니다.'))
      .catch(() => this.toastr.error('메모가 저장되지 않았습니다. 다시 시도해주세요.'));
    }
  }

  getActiveMemoIndex() {
    let activeMemoIndex = -1;
    this.memos.forEach(function(memo, idx) {
      if (memo.id === this.activeMemo.id) {
        activeMemoIndex = idx;
      }
    }.bind(this));
    return activeMemoIndex;
  }
}

MainController.$inject = ['$state', 'toastr', 'Memo', '$scope'];
export default MainController;
