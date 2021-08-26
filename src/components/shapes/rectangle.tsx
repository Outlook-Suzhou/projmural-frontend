import { Rect } from 'react-konva';
import getCurrentDoc from '../../client/client';
import shapeConfig from './shape_config';

const doc = getCurrentDoc();
// @ts-ignore
// eslint-disable-next-line react/prop-types
const Rectangle = ({ item, index, click }) => (
  // eslint-disable-next-line react/react-in-jsx-scope
  <Rect
        // eslint-disable-next-line react/jsx-props-no-spreading
    {...item}
        // eslint-disable-next-line react/jsx-props-no-spreading
    {...shapeConfig}
    key={index}
    fill="blue"
    onClick={click}
    onDragMove={(e) => {
      const afterE = {
        width: e.target.width(),
        height: e.target.height(),
        x: e.target.x(),
        y: e.target.y(),
        type: 'RECTANGLE',
      };
      doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: afterE }]);
    }}
  />
);

export default Rectangle;
