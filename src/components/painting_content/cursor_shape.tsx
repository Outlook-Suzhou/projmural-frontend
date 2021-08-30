import React from 'react';
import {
  Circle, Rect, Line, Ellipse, Star,
} from 'react-konva';

interface Props {
  selectShape: string
  x: number,
  y: number,
}
const CursorShape = (props: Props) => {
  const {
    selectShape, x, y,
  } = props;
  switch (selectShape) {
    case 'RECTANGLE':
      return <Rect x={x} y={y} width={50} height={50} stroke="black" dash={[10, 10]} />;
    case 'TEXTRECT':
      return <Rect x={x} y={y} width={100} height={100} stroke="black" dash={[10, 10]} />;
    case 'CIRCLE':
      return <Circle x={x} y={y} radius={30} stroke="black" dash={[10, 10]} />;
    case 'LINE':
      return <Line points={[x, y, x + 100, y + 100]} stroke="black" dash={[10, 10]} />;
    case 'TRIANGLE':
      return <Line x={x} y={y} points={[30, 0, 0, 30, -30, 0]} stroke="black" dash={[10, 10]} closed />;
    case 'ELLIPSE':
      return <Ellipse x={x} y={y} radiusX={30} radiusY={20} stroke="black" dash={[10, 10]} />;
    case 'DIAMOND':
      return <Line x={x} y={y} points={[0, 20, 30, 0, 0, -20, -30, 0]} stroke="black" dash={[10, 10]} closed />;
    case 'ARROW':
      return <Line points={[x, y, x + 100, y + 100]} stroke="black" dash={[10, 10]} />;
    case 'TEXT':
      return <Rect x={x} y={y} width={200} height={50} stroke="black" dash={[10, 10]} />;
    case 'STAR':
      return <Star x={x} y={y} numPoints={5} innerRadius={20} outerRadius={50} stroke="black" dash={[10, 10]} />;
    case 'MESSAGE':
      return <Rect x={x} y={y} width={100} height={50} stroke="black" dash={[10, 10]} />;
    default:
      break;
  }
  return <></>;
};

export default CursorShape;
