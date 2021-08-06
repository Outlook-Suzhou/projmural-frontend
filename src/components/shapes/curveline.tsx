import { Line } from 'react-konva';
import React from 'react';
import doc from '../../client/client';

interface Props {
  item: BaseShapes.CurveLine,
  onSelect: any,
  index: number,
}
const CurveLine: React.FC<Props> = (props: Props) => {
  const {
    item, onSelect, index,
  } = props;
  return (
    <>
      <Line
        name={`line${index}`}
        globalCompositeOperation={item.composite}
        stroke={item.fill}
        strokeWidth={5}
        onClick={onSelect}
        onTap={onSelect}
        {...item}
        points={item.points}
        key={index}
        onDragMove={(e) => {
          const afterE: BaseShapes.CurveLine = {
            ...item,
            x: e.target.x(),
            y: e.target.y(),
          };
          doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: afterE }]);
        }}
      />
    </>
  );
};

export default CurveLine;
