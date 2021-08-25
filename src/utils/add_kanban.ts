import doc from '../client/client';

const moment = require('moment');

moment().format();

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
  const days = [];
  const a = moment(start);
  const b = moment(end);
  switch (unit) {
    case 'month':
      while (!a.isSame(b)) {
        days.push(a.format('YYYY-M'));
        a.add(1, 'month');
      }
      days.push(b.format('YYYY-M'));
      break;
    case 'week':
      while (!a.isSame(b)) {
        if (a.isAfter(b)) {
          break;
        }
        days.push(a.format('YYYY-wo'));
        a.add(1, 'week');
        console.log(a, b);
      }
      days.push(b.format('YYYY-wo'));
      break;
    case 'day':
      while (!a.isSame(b)) {
        days.push(a.format('YYYY-M-D'));
        a.add(1, 'day');
      }
      days.push(b.format('YYYY-M-D'));
      break;
    default:
      break;
  }
  for (let i = 0; i < teamNum; i += 1) {
    teams.push({
      // eslint-disable-next-line max-len
      width: 120, height: 25, x: 20, y: 20 + i * 60, text: `Team${i + 1}`, fontSize: 12, fill: '#ffffff', visible: true,
    });
  }
  doc.submitOp([{
    p: ['shapes', doc.data.shapes.length],
    li: {
      type: 'KANBAN', days, teamNum, x: 10, y: 10, teams, shift: {}, projs: [], draggable: true, unit,
    },
  }]);
}

export default addKanBan;
