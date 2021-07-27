import { Ellipse as KonvaEllipse } from 'react-konva';
import doc from '../../client/client';
import shapeConfig from './shape_config';

// @ts-ignore
// eslint-disable-next-line react/prop-types
const Ellipse = ({ item, index, click }) => (
  // eslint-disable-next-line react/react-in-jsx-scope
  <KonvaEllipse
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...item}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...shapeConfig}
    key={index}
    fill="yellow"
    draggable
    onClick={click}
    onDragMove={(e) => {
      const afterE = {
        radius: {
          x: e.target.attrs.radiusX,
          y: e.target.attrs.radiusY,
        },
        x: e.target.x(),
        y: e.target.y(),
        type: 'ELLIPSE',
      };
      doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: afterE }]);
    }}
  />
);

export default Ellipse;
