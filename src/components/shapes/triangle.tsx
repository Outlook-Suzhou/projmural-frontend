import React from 'react';
import { Line } from 'react-konva';
import doc from '../../client/client';
import shapeConfig from './shape_config';

interface Props {
  item: BaseShapes.Triangle,
  index: number,
  click: any
}

const Triangle: React.FC<Props> = (props: Props) => {
  const { item, index, click } = props;
  return (
    <Line
    // eslint-disable-next-line react/jsx-props-no-spreading
      {...item}
    // eslint-disable-next-line react/jsx-props-no-spreading
      {...shapeConfig}
      key={index}
      stroke="black"
      tension={0}
      closed
      draggable
      onClick={click}
      onDragMove={(e) => {
        const afterE: BaseShapes.Triangle = {
          x: e.target.x(),
          y: e.target.y(),
          points: item.points,
          type: 'TRIANGLE',
        };
        doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: afterE }]);
      }}
    />
  );
};

export default Triangle;
