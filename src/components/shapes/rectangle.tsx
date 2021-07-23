import { Rect } from 'react-konva';
import doc from '../../client/client';

// @ts-ignore
// eslint-disable-next-line react/prop-types
const Rectangle = ({ item, index, click }) => (
  // eslint-disable-next-line react/react-in-jsx-scope
  <Rect
       // eslint-disable-next-line react/jsx-props-no-spreading
    {...item}
    key={index}
    fill="blue"
    draggable
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
