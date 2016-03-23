export class MainController {
  constructor($scope, $state, $q, $timeout, $filter, toastr, ngDialog, Memo, Label) {
    'ngInject';
    this.$scope = $scope;
    this.$state = $state;
    this.$q = $q;
    this.$timeout = $timeout;
    this.$filter = $filter;
    this.toastr = toastr;
    this.ngDialog = ngDialog;
    this.Memo = Memo;
    this.Label = Label;
    this.loadMemos();
    this.loadLabels();
  }

  loadMemos() {
    let deferred = this.$q.defer();
    this.Memo.query()
    .$promise.then((memos) => {
      this.filteredMemos = this.memos = memos;
      this.$scope.$broadcast('memosLoaded', memos);
      deferred.resolve(true);
    })
    .catch((err) => {
       this.toastr.error('메모 목록을 불러오는데 실패했습니다.');
       deferred.reject(err);
    });
    return deferred.promise;
  }

  loadLabels() {
    let deferred = this.$q.defer();
    this.Label.query()
    .$promise.then((labels) => {
      this.labels = labels;
      deferred.resolve(true);
    })
    .catch((err) => {
      this.toastr.error('라벨 목록을 불러오는데 실패했습니다.');
      deferred.reject(err);
    });
    return deferred.promise;
  }

  openAddLabelDialog() {
    let checkedMemos = this.memos.filter((memo) => memo.checked);
    if (checkedMemos.length) {
      this.dialog = this.ngDialog.open({
        template: '/app/templates/add-label/add-label.html',
        scope: this.$scope
      });
    } else {
      this.toastr.warning('하나 이상의 메모를 선택해주세요.');
    }
  }

  openRenameLabelDialog() {
    this.dialog = this.ngDialog.open({
      template: '/app/templates/rename-label/rename-label.html',
      scope: this.$scope
    });
  }

  renameLabel(label) {
    let originName = label.name;
    label.name = this.$filter('label')(label.newName);
    this.Label.update({ name: originName }, label)
    .$promise.then(() => {
      label.name = label.newName;
      label.isEditing = false;
      this.toastr.success('라벨 이름이 변경되었습니다.');
    })
    .catch(() => this.toastr.error('문제가 발생했습니다. 다시 시도해주세요.'));
  }

  checkMemo($event, memo) {
    if (this.multiMode) {
      $event.preventDefault();
      memo.checked = !memo.checked;
    }
  }

  uncheckAll() {
    this.multiMode = false;
    this.memos.forEach((memo) => {
      memo.checked = false;
    });
  }

  addLabelCheckedMemos(labelName) {
    let checkedMemos = this.memos
    .filter((memo) => memo.checked)
    .map((memo) => memo.id);

    this.Memo
    .addLabel({
      memos: checkedMemos,
      label: this.$filter('label')(labelName)
    })
    .$promise.then(() => this.loadMemos())
    .then(() => this.loadLabels())
    .then(() => {
      this.toastr.success('라벨이 추가되었습니다.');
      this.filterByLabel();
      this.uncheckAll();
      this.dialog.close();
      this.$state.go(this.$state.current, { reload: true });
    })
    .catch(() => this.toastr.error('문제가 발생했습니다. 다시 시도해주세요.'));
  }

  removeCheckedMemos() {
    let checkedMemos = this.memos
    .filter((memo) => memo.checked)
    .map((memo) => memo.id);
    let includeActive = checkedMemos.indexOf(this.activeMemo.id) + 1;

    if (checkedMemos.length) {
      this.Memo
      .removeMemos({ memos: checkedMemos.join(',') })
      .$promise.then(() => this.loadMemos())
      .then(() => this.loadLabels())
      .then(() => {
        this.toastr.success('메모가 삭제되었습니다.');
        this.filterByLabel();
        this.uncheckAll();
        if (includeActive) this.$state.go('main.index');
        else this.$state.go(this.$state.current, { reload: true });
      })
      .catch(() => this.toastr.error('문제가 발생했습니다. 다시 시도해주세요.'));
    } else {
      this.toastr.warning('하나 이상의 메모를 선택해주세요.');
    }
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
      .$promise.then(() => this.loadLabels())
      .then(() => {
        this.toastr.success('메모가 삭제되었습니다.');
        this.memos.splice(this.getActiveMemoIndex(), 1);
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

export { MainController };
