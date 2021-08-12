import addShape from '../../utils/add_function';

const handleLayerClick = (shape: string, x: number, y: number) => {
  switch (shape) {
    case 'RECTANGLE':
      addShape({
        width: 50, height: 50, x, y, type: 'RECTANGLE', rotation: 0, fill: 'blue', draggable: true,
      });
      break;
    case 'LINE':
      addShape({
        x: 0, y: 0, start: { x, y }, end: { x: x + 100, y: y + 100 }, weight: 5, type: 'LINE', draggable: true,
      });
      break;
    case 'CIRCLE':
      addShape({
        radius: 30, x, y, type: 'CIRCLE', draggable: true, rotation: 0, fill: 'green',
      });
      break;
    case 'TRIANGLE':
      addShape({
        radius: { x: 30, y: 30 }, x, y, type: 'TRIANGLE', draggable: true, rotation: 0, fill: 'yellow',
      });
      break;
    case 'ELLIPSE':
      addShape({
        radius: { x: 30, y: 20 }, x, y, type: 'ELLIPSE', draggable: true, rotation: 0, fill: 'green',
      });
      break;
    case 'DIAMOND':
      addShape({
        radius: { x: 30, y: 20 }, x, y, type: 'DIAMOND', draggable: true, rotation: 0, fill: 'pink',
      });
      break;
    case 'ARROW':
      addShape({
        x, y, start: { x: 0, y: 0 }, end: { x: 100, y: 100 }, weight: 5, arrowSize: 20, type: 'ARROW', draggable: true,
      });
      break;
    case 'TEXT':
      addShape({
        width: 200, height: 25, x, y, type: 'TEXT', text: '双击编辑文字', fontSize: 25, draggable: true, fill: '#000000', rotation: 0, scaleX: 1, shift: { x: 0, y: 0 },
      });
      break;
    default:
      break;
  }
};

export default handleLayerClick;
