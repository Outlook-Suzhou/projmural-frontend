import { Line } from 'react-konva';
import doc from '../../client/client';
import shapeConfig from './shape_config';

// @ts-ignore
// eslint-disable-next-line react/prop-types
const Diamond = ({ item, index, click }) => (
  // eslint-disable-next-line react/react-in-jsx-scope
  <Line
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...item}
    /* eslint-disable-next-line react/prop-types */
    points={[0, item.radius.y, item.radius.x, 0, 0, -item.radius.y, -item.radius.x, 0]}
    closed
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...shapeConfig}
    key={index}
    fill="pink"
    draggable
    onClick={click}
    onDragMove={(e) => {
      const afterE = {
        radius: e.target.attrs.radius,
        x: e.target.x(),
        y: e.target.y(),
        type: 'DIAMOND',
      };
      doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: afterE }]);
    }}
  />
);

export default Diamond;
