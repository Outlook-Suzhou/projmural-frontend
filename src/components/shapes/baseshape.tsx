/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import Triangle from './triangle';
import Text from './text';
import Ellipse from './ellipse';
import Rectangle1 from './transform_rect';
import Diamond from './diamond';
import Circle from './circle';
import Line from './line';
import Arrow from './arrow';
import Img from './image';
import CurveLine from './curveline';
import { useStateStore } from '../../store/store';

interface Shape {
  item: any;
  index: number;
  click: Function;
  currentIndex?: any;
  setCurrentItem?: Function;
  setCurrentIndex?: Function;
  del: Function;
}

const BaseShape: React.FC<Shape> = (props: Shape) => {
  const {
    item, index, click, del,
  } = props;
  let ShapeComponent: any;
  const state = useStateStore();
  // const dispatch = useDispatchStore();
  // console.log(dispatch);
  switch (item.type) {
    case 'RECTANGLE':
      ShapeComponent = <Rectangle1 item={item} index={index} isSelected={index === state.currentIndex} onSelect={click} />;
      break;
    case 'CIRCLE':
      ShapeComponent = <Circle item={item} index={index} isSelected={index === state.currentIndex} onSelect={click} />;
      break;
    case 'ELLIPSE':
      ShapeComponent = <Ellipse item={item} index={index} isSelected={index === state.currentIndex} onSelect={click} />;
      break;
    case 'DIAMOND':
      ShapeComponent = <Diamond item={item} index={index} isSelected={index === state.currentIndex} onSelect={click} />;
      break;
    case 'IMAGE':
      ShapeComponent = <Img item={item} index={index} isSelected={index === state.currentIndex} onSelect={click} />;
      break;
    case 'TRIANGLE':
      ShapeComponent = <Triangle item={item} index={index} isSelected={index === state.currentIndex} onSelect={click} />;
      break;
    case 'LINE':
      ShapeComponent = <Line item={item} index={index} click={click} isSelected={index === state.currentIndex} />;
      break;
    case 'ARROW':
      ShapeComponent = <Arrow item={item} index={index} click={click} isSelected={index === state.currentIndex} />;
      break;
    case 'TEXT':
      ShapeComponent = <Text item={item} index={index} click={click} isSelected={index === state.currentIndex} />;
      break;
    case 'CURVELINE':
      ShapeComponent = <CurveLine item={item} index={index} onSelect={click} onMouseOver={del} />;
      break;
    default:
      return ShapeComponent;
  }
  return ShapeComponent;
};

BaseShape.defaultProps = {
  // currentItem: {},
  currentIndex: -1,
  // setCurrentItem: () => {},
  // setCurrentIndex: () => {},
};
export default BaseShape;
