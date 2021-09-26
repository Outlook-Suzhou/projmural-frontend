import { calcZoomX, calcZoomY } from './calc_zoom_position';
// get the top-center of a shape
const getEdge = (pointsList: number[][]) => {
  let top = 10000;
  let left = 10000;
  let right = 0;
  for (let i = 0; i < pointsList.length; i += 1) {
    const point = pointsList[i];
    top = Math.min(top, point[1]);
    left = Math.min(left, point[0]);
    right = Math.max(right, point[0]);
  }
  return [(left + right) / 2, top];
};
// get the top-center of a shape
const calcFloatBarPos = (shape: BaseShapes.Shape, stageScale: number, stagePos: any) => {
  let pointsList: number[][] = [];
  const x = calcZoomX(shape.x, stageScale, stagePos.x);
  const y = calcZoomY(shape.y, stageScale, stagePos.y);
  switch (shape.type) {
    case 'RECTANGLE':
    {
      const x1 = x;
      const y1 = y;
      const x2 = x1 + shape.width * stageScale * Math.cos((shape.rotation * 2 * Math.PI) / 360);
      const y2 = y1 + shape.width * stageScale * Math.sin((shape.rotation * 2 * Math.PI) / 360);
      const x3 = x1 - shape.height * stageScale * Math.sin((shape.rotation * 2 * Math.PI) / 360);
      const y3 = y1 + shape.height * stageScale * Math.cos((shape.rotation * 2 * Math.PI) / 360);
      const x4 = x3 + (x2 - x1);
      const y4 = y3 + (y2 - y1);
      pointsList = [[x1, y1], [x2, y2], [x3, y3], [x4, y4]];
      break;
    }
    case 'IMAGE':
    {
      const x1 = x;
      const y1 = y;
      const x2 = x1 + shape.width * stageScale * Math.cos((shape.rotation * 2 * Math.PI) / 360);
      const y2 = y1 + shape.width * stageScale * Math.sin((shape.rotation * 2 * Math.PI) / 360);
      const x3 = x1 - shape.height * stageScale * Math.sin((shape.rotation * 2 * Math.PI) / 360);
      const y3 = y1 + shape.height * stageScale * Math.cos((shape.rotation * 2 * Math.PI) / 360);
      const x4 = x3 + (x2 - x1);
      const y4 = y3 + (y2 - y1);
      pointsList = [[x1, y1], [x2, y2], [x3, y3], [x4, y4]];
      break;
    }
    case 'TEXTRECT':
    {
      const x1 = x;
      const y1 = y;
      const x2 = x1 + shape.width * stageScale * Math.cos((shape.rotation * 2 * Math.PI) / 360);
      const y2 = y1 + shape.width * stageScale * Math.sin((shape.rotation * 2 * Math.PI) / 360);
      const x3 = x1 - shape.height * stageScale * Math.sin((shape.rotation * 2 * Math.PI) / 360);
      const y3 = y1 + shape.height * stageScale * Math.cos((shape.rotation * 2 * Math.PI) / 360);
      const x4 = x3 + (x2 - x1);
      const y4 = y3 + (y2 - y1);
      pointsList = [[x1, y1], [x2, y2], [x3, y3], [x4, y4]];
      break;
    }
    case 'CIRCLE':
    {
      const x1 = x;
      const y1 = y - shape.radius * stageScale * Math.sqrt(2);
      pointsList = [[x1, y1]];
      break;
    }
    case 'STAR':
    {
      const x1 = x;
      const y1 = y - shape.outerRadius * stageScale * Math.sqrt(2);
      pointsList = [[x1, y1]];
      break;
    }
    case 'ELLIPSE':
    {
      const x1 = x + shape.radius.y * stageScale * Math.sin((shape.rotation * 2 * Math.PI) / 360);
      const y1 = y - shape.radius.y * stageScale * Math.cos((shape.rotation * 2 * Math.PI) / 360);
      const x2 = x + (x - x1);
      const y2 = y + (y - y1);
      const x3 = x + shape.radius.x * stageScale * Math.cos((shape.rotation * 2 * Math.PI) / 360);
      const y3 = y + shape.radius.x * stageScale * Math.sin((shape.rotation * 2 * Math.PI) / 360);
      const x4 = x + (x - x3);
      const y4 = y + (y - y3);
      // use the outside transform rect as the edge, rather than ellipse inside
      pointsList = [[x1 + (x3 - x), y1 + (y3 - y)], [x1 + (x4 - x), y1 + (y4 - y)], [x2 + (x3 - x), y2 + (y3 - y)], [x2 + (x4 - x), y2 + (y4 - y)]];
      break;
    }
    case 'DIAMOND':
    {
      const x1 = x + shape.radius.y * stageScale * Math.sin((shape.rotation * 2 * Math.PI) / 360);
      const y1 = y - shape.radius.y * stageScale * Math.cos((shape.rotation * 2 * Math.PI) / 360);
      const x2 = x + (x - x1);
      const y2 = y + (y - y1);
      const x3 = x + shape.radius.x * stageScale * Math.cos((shape.rotation * 2 * Math.PI) / 360);
      const y3 = y + shape.radius.x * stageScale * Math.sin((shape.rotation * 2 * Math.PI) / 360);
      const x4 = x + (x - x3);
      const y4 = y + (y - y3);
      // use the outside transform rect as the edge, rather than ellipse inside
      pointsList = [[x1 + (x3 - x), y1 + (y3 - y)], [x1 + (x4 - x), y1 + (y4 - y)], [x2 + (x3 - x), y2 + (y3 - y)], [x2 + (x4 - x), y2 + (y4 - y)]];
      break;
    }
    case 'TRIANGLE':
    {
      const x1 = x - shape.radius.y * stageScale * Math.sin((shape.rotation * 2 * Math.PI) / 360);
      const y1 = y + shape.radius.y * stageScale * Math.cos((shape.rotation * 2 * Math.PI) / 360);
      const x3 = x + shape.radius.x * stageScale * Math.cos((shape.rotation * 2 * Math.PI) / 360);
      const y3 = y + shape.radius.x * stageScale * Math.sin((shape.rotation * 2 * Math.PI) / 360);
      const x4 = x + (x - x3);
      const y4 = y + (y - y3);
      // use the outside transform rect as the edge, rather than ellipse inside
      pointsList = [[x3 + (x1 - x), y3 + (y1 - y)], [x4 + (x1 - x), y4 + (y1 - y)], [x3, y3], [x4, y4]];
      break;
    }
    case 'TEXT':
    {
      const x1 = x;
      const y1 = y;
      const x2 = x1 + shape.width * stageScale * Math.cos((shape.rotation * 2 * Math.PI) / 360);
      const y2 = y1 + shape.width * stageScale * Math.sin((shape.rotation * 2 * Math.PI) / 360);
      const x3 = x1 - shape.height * stageScale * Math.sin((shape.rotation * 2 * Math.PI) / 360);
      const y3 = y1 + shape.height * stageScale * Math.cos((shape.rotation * 2 * Math.PI) / 360);
      const x4 = x3 + (x2 - x1);
      const y4 = y3 + (y2 - y1);
      pointsList = [[x1 - 40, y1], [x2 - 40, y2], [x3 - 40, y3], [x4 - 40, y4]];
      break;
    }
    case 'MESSAGE':
    {
      const x1 = x;
      const y1 = y;
      const x2 = x1 + shape.width * stageScale * Math.cos((shape.rotation * 2 * Math.PI) / 360);
      const y2 = y1 + shape.width * stageScale * Math.sin((shape.rotation * 2 * Math.PI) / 360);
      const x3 = x1 - shape.height * stageScale * Math.sin((shape.rotation * 2 * Math.PI) / 360);
      const y3 = y1 + shape.height * stageScale * Math.cos((shape.rotation * 2 * Math.PI) / 360);
      const x4 = x3 + (x2 - x1);
      const y4 = y3 + (y2 - y1);
      pointsList = [[x1, y1], [x2, y2], [x3, y3], [x4, y4]];
      break;
    }
    case 'KANBAN':
    {
      if (shape.selectProj !== -1) {
        const x1 = calcZoomX(shape.x + shape.projs[shape.selectProj].x, stageScale, stagePos.x);
        const y1 = calcZoomY(shape.y + shape.projs[shape.selectProj].y * 0.2, stageScale, stagePos.y);
        pointsList = [[x1, y1], [x1 + shape.projs[shape.selectProj].width * stageScale, y1]];
      } else {
        pointsList = [[x + 112, y]];
      }
      break;
    }
    default:
      return [x + 112, y];
  }
  const edge = getEdge(pointsList);
  return edge;
};

export default calcFloatBarPos;
