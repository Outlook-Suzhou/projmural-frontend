import { Line } from 'react-konva';
import React from 'react';

interface Props {
  item: BaseShapes.CurveLine,
  onSelect: any,
  index: number,
  onMouseOver: any,
}
const CurveLine: React.FC<Props> = (props: Props) => {
  const {
    item, onSelect, index, onMouseOver,
  } = props;
  return (
    <>
      <Line
        name={`line${index}`}
        globalCompositeOperation="source-over"
        stroke={item.fill}
        strokeWidth={item.size}
        onClick={onMouseOver}
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
          state.currentDoc.value.submitOp([{ p: ['shapes', index], ld: state.currentDoc.value.data.shapes[index], li: afterE }]);
        }}
        onMouseOver={onMouseOver}
        onMouseDown={onMouseOver}
        lineCap="round"
        tension={0.5}
      />
    </>
  );
};

export default CurveLine;
