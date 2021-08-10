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
        radius: { x: 30, y: 20 }, x, y, type: 'TRIANGLE', draggable: true, rotation: 0, fill: 'yellow',
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
    default:
      break;
  }
};

export default handleLayerClick;
