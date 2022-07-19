import { Rect } from 'react-konva';
import { useStateStore } from '../../store/store';
import shapeConfig from './shape_config';

// @ts-ignore
// eslint-disable-next-line react/prop-types
const Rectangle = ({ item, index, click }) => {
  const state = useStateStore();
  return (
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
        state.currentDoc.value.submitOp([{ p: ['shapes', index], ld: state.currentDoc.value.data.shapes[index], li: afterE }]);
      }}
    />
  );
};

export default Rectangle;
