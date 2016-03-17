export class MainController {
  constructor($state) {
    'ngInject';
    this.$state = $state;
    this.generateSamples();
  }

  generateSamples() {
    this.labels = this.getSampleLabels();
    this.memos = this.getSampleMemos();
  }

  getSampleLabels() {
    let sampleLabels = [];
    for(let i = 0; i < 40; i++) {
      sampleLabels.push({
        id: 'id' + i,
        name: '라벨' + i,
        memos: 20
      });
    }
    return sampleLabels;
  }

  getSampleMemos() {
    let sampleMemos = [];
    for(let i = 0; i < 40; i++) {
      sampleMemos.push({
        id: 'id' + i,
        title: '로렘 입섬이다.',
        body: `대통령은 필요하다고 인정할 때에는 외교·국방·통일 기타 국가안위에 관한 중요정책을 국민투표에 붙일 수 있다. 대통령은 법률안의 일부에 대하여 또는 법률안을 수정하여 재의를 요구할 수 없다.
명령·규칙 또는 처분이 헌법이나 법률에 위반되는 여부가 재판의 전제가 된 경우에는 대법원은 이를 최종적으로 심사할 권한을 가진다. 정당의 목적이나 활동이 민주적 기본질서에 위배될 때에는 정부는 헌법재판소에 그 해산을 제소할 수 있고, 정당은 헌법재판소의 심판에 의하여 해산된다.
제3항의 승인을 얻지 못한 때에는 그 처분 또는 명령은 그때부터 효력을 상실한다. 이 경우 그 명령에 의하여 개정 또는 폐지되었던 법률은 그 명령이 승인을 얻지 못한 때부터 당연히 효력을 회복한다.`,
        number: i + 1
      });
    }
    return sampleMemos;
  }

  addMemo() {
    // 임시 메소드
    let lastNumber = this.memos[this.memos.length - 1].number;
    let newMemo = {
      id: `id${lastNumber + 1}`,
      title: '',
      body: '',
      number: lastNumber + 1
    };

    this.memos.push(newMemo);
    this.$state.go('main.memo', { id: newMemo.id });
  }

  removeMemo() {
    let activeMemoIndex = -1;
    this.memos.forEach(function(memo, idx) {
      if (memo.id === this.activeMemoId) {
        activeMemoIndex = idx;
      }
    }.bind(this));
    if (activeMemoIndex !== -1)
      this.memos.splice(activeMemoIndex, 1);
      this.$state.go('main.index');
  }
}

MainController.$inject = ['$state'];
export default MainController;
