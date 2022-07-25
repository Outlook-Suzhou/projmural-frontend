import addShape from '../../utils/add_function';
import { DEFAULT_FONT_SIZE } from '../../config/size';

const handleLayerClick = (shape: string, width: number, height: number, x: number, y: number, doc: any) => {
  switch (shape) {
    case 'RECTANGLE':
      addShape({
        width, height, x, y, type: 'RECTANGLE', rotation: 0, fill: '#FF6900', draggable: true, opacity: 0.9,
      }, doc);
      break;
    case 'POINTEDRECT':
      addShape({
        width, height, x, y, type: 'POINTEDRECT', rotation: 0, fill: '#FF6900', draggable: true, text: '双击添加文字', fontSize: DEFAULT_FONT_SIZE, opacity: 0.9,
      }, doc);
      break;
    case 'TEXTRECT':
      addShape({
        width, height, x, y, type: 'TEXTRECT', rotation: 0, fill: '#FFF9B2', draggable: true, text: '双击添加文字', fontSize: DEFAULT_FONT_SIZE, opacity: 0.9,
      }, doc);
      break;
    case 'LINE':
      addShape({
        x: 0, y: 0, start: { x, y }, end: { x: x + 100, y: y + 100 }, weight: 5, type: 'LINE', draggable: true,
      }, doc);
      break;
    case 'CIRCLE':
      addShape({
        radius: 30, x, y, type: 'CIRCLE', draggable: true, rotation: 0, fill: '#7BDCB5', opacity: 0.9,
      }, doc);
      break;
    case 'TRIANGLE':
      addShape({
        radius: { x: 30, y: 30 }, x, y, type: 'TRIANGLE', draggable: true, rotation: 0, fill: '#9900EF', opacity: 0.9,
      }, doc);
      break;
    case 'ELLIPSE':
      addShape({
        radius: { x: 30, y: 20 }, x, y, type: 'ELLIPSE', draggable: true, rotation: 0, fill: '#8ED1FC',
      }, doc);
      break;
    case 'DIAMOND':
      addShape({
        radius: { x: 30, y: 20 }, x, y, type: 'DIAMOND', draggable: true, rotation: 0, fill: 'pink', opacity: 0.9,
      }, doc);
      break;
    case 'ARROW':
      addShape({
        x, y, start: { x: 0, y: 0 }, end: { x: 100, y: 100 }, weight: 5, arrowSize: 20, type: 'ARROW', draggable: true,
      }, doc);
      break;
    case 'TEXT':
      addShape({
        width: 200, height: 25, x, y, type: 'TEXT', text: '双击编辑文字', fontSize: 25, draggable: true, fill: '#000000', rotation: 0, scaleX: 1, shift: { x: 0, y: 0 },
      }, doc);
      break;
    case 'STAR':
      addShape({
        innerRadius: 20, outerRadius: 50, x, y, type: 'STAR', draggable: true, rotation: 0, fill: '#7BDCB5', opacity: 0.9,
      }, doc);
      break;
    case 'MESSAGE':
      addShape({
        width, height: height * 0.6, x, y, type: 'MESSAGE', rotation: 0, fill: '#F7F7F7', draggable: true, text: 'Comment and @someone', fontSize: DEFAULT_FONT_SIZE,
      }, doc);
      break;
    default:
      break;
  }
};

export default handleLayerClick;
