import moment from 'moment';
import doc from '../client/client';

function addKanBan(kanban: any) {
  for (let i = 0; i < doc.data.shapes.length; i += 1) {
    if (doc.data.shapes[i].type === 'KANBAN') {
      return;
    }
  }
  const teams = [];
  const {
    teamNum, start, end, unit,
  } = kanban;
  const dateNum = 10;
  switch (unit) {
    case 'month':
      // eslint-disable-next-line no-case-declarations
      const duration = moment.duration(moment(start, 'YYYY-MM').diff(moment(end, 'YYYY-MM')));
      console.log(duration);
      break;
    default:
      break;
  }
  const ind = doc.data.shapes.length;
  for (let i = 0; i < teamNum; i += 1) {
    teams.push({
      // eslint-disable-next-line max-len
      width: 120, height: 25, x: 20, y: 20 + i * 60, text: `Team${i + 1}`, fontSize: 12, fill: '#ffffff', visible: true,
    });
  }
  doc.submitOp([{
    p: ['shapes', ind],
    li: {
      type: 'KANBAN', dateNum, teamNum, x: 100, y: 100, teams, shift: {}, projs: [], draggable: true, start, end, unit,
    },
  }]);
}

export default addKanBan;
