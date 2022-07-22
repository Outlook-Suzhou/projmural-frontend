import React from 'react';
import {
  Circle, Rect, Line, Ellipse, Star,
} from 'react-konva';
import { NEW_SHAPE_WIDTH, NEW_SHAPE_HEIGHT } from '../../config/size';

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
      return <Rect x={x} y={y} width={NEW_SHAPE_WIDTH} height={NEW_SHAPE_HEIGHT} stroke="black" dash={[10, 10]} />;
    case 'POINTEDRECT':
      return (
        <Line
          x={x}
          y={y}
          points={[0, 0, NEW_SHAPE_WIDTH, 0, NEW_SHAPE_WIDTH, 0.8 * NEW_SHAPE_HEIGHT, 0.5 * NEW_SHAPE_WIDTH, NEW_SHAPE_HEIGHT, 0, NEW_SHAPE_WIDTH]}
          stroke="black"
          dash={[10, 10]}
          closed
        />
      );
    case 'TEXTRECT':
      return <Rect x={x} y={y} width={NEW_SHAPE_WIDTH} height={NEW_SHAPE_HEIGHT} stroke="black" dash={[10, 10]} />;
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
      return (
        <>
          <Rect x={x} y={y} width={NEW_SHAPE_WIDTH} height={NEW_SHAPE_HEIGHT * 0.6} stroke="black" dash={[10, 10]} />
          <Line
            points={[x + NEW_SHAPE_WIDTH * 0.2, y + NEW_SHAPE_HEIGHT * 0.6 - 1,
              x + NEW_SHAPE_WIDTH * 0.4, y + NEW_SHAPE_HEIGHT * 0.6 - 1,
              x + NEW_SHAPE_WIDTH * 0.2, y + NEW_SHAPE_HEIGHT * 0.6 * 1.2,
            ]}
            closed
            stroke="black"
            dash={[10, 10]}
          />
        </>
      );
    default:
      break;
  }
  return <></>;
};

export default CursorShape;
