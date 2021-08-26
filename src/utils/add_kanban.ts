import getCurrentDoc from '../client/client';

const doc = getCurrentDoc();
function addKanBan(kanban: any) {
  for (let i = 0; i < doc.value.data.shapes.length; i += 1) {
    if (doc.value.data.shapes[i].type === 'KANBAN') {
      return;
    }
  }
  const teams = [];
  const { teamNum } = kanban;
  const { dateNum } = kanban;
  const ind = doc.value.data.shapes.length;
  for (let i = 0; i < teamNum; i += 1) {
    teams.push({
      // eslint-disable-next-line max-len
      width: 120, height: 25, x: 20, y: 20 + i * 60, text: `Team${i + 1}`, fontSize: 12, fill: '#ffffff', visible: true,
    });
  }
  doc.value.submitOp([{
    p: ['shapes', ind],
    li: {
      type: 'KANBAN', dateNum, teamNum, x: 10, y: 10, teams, shift: {}, projs: [], draggable: true,
    },
  }]);
}

export default addKanBan;
