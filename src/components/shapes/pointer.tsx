import React from 'react';
import { Line, Rect, Text } from 'react-konva';
import Vector from './vector';

interface Props {
  x: number,
  y: number,
  size: number,
  color: string,
  font: string,
}

const getPoints = (size: number): Array<number> => {
  let ret: Array<number> = [];
  let now = { x: 0, y: 0 };

  ret = ret.concat(Vector.toList(now));

  let direction = Vector.rotate({ x: 0, y: 1 }, -Math.PI / 3);
  now = Vector.add(now, Vector.mulN(direction, size));
  ret = ret.concat(Vector.toList(now));

  direction = Vector.rotate(direction, -(Math.PI * 9) / 8);
  now = Vector.add(now, Vector.mulN(direction, (size / 2) / Math.cos(Math.PI / 8)));
  ret = ret.concat(Vector.toList(now));

  direction = Vector.rotate(direction, -Math.PI / 2);
  now = Vector.add(now, Vector.mulN(direction, (size / 2) / Math.cos(Math.PI / 8)));
  ret = ret.concat(Vector.toList(now));

  return ret;
};

const Pointer: React.FC<Props> = (props: Props) => {
  const {
    x, y, size, color, font,
  } = props;
  let realFont = font;
  if (font.length > 14) {
    realFont = realFont.substring(0, 11);
    realFont += '...';
  }
  return (
    <>
      <Line
        x={x}
        y={y}
        points={getPoints(size)}
        closed
        fill={color}
      />
      <Rect
        x={x + Math.cos(Math.PI / 6) * size}
        y={y + (size * 2) / 3}
        height={size / 3}
        width={size * 2.5}
        fill={color}
      />
      <Text
        x={x + Math.cos(Math.PI / 6) * size + 1}
        y={y + (size * 2) / 3}
        fontFamily="Consolas"
        fontSize={size / 3.2}
        text={realFont}
        align="center"
        fill="white"
        lineHeight={1.15}
      />
    </>
  );
};

export default Pointer;
