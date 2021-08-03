import { Circle as KonvaCircle } from 'react-konva';
import doc from '../../client/client';
import shapeConfig from './shape_config';

// @ts-ignore
// eslint-disable-next-line react/prop-types
const Circle = ({ item, index, click }) => (
  // eslint-disable-next-line react/react-in-jsx-scope
  <KonvaCircle
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...item}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...shapeConfig}
    key={index}
    fill="green"
    onClick={click}
    onDragMove={(e) => {
      const afterE = {
        radius: e.target.attrs.radius,
        x: e.target.x(),
        y: e.target.y(),
        type: 'CIRCLE',
      };
      doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: afterE }]);
    }}
  />
);

export default Circle;
