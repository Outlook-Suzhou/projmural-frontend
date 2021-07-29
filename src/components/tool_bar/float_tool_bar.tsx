import { Card } from 'antd';
import React from 'react';
import SelectColor from './tools/select_color';

interface Props {
    index: number,
    item: BaseShapes.Rectangle,
}

const FloatToolBar: React.FC<Props> = (props: Props) => {
  const { index, item } = props;
  const tools = [SelectColor];
  //   // fix the float tool bar, not rotating with the shape
  // const xConst = useRef<number>(item.x);
  // const yConst = useRef<number>(item.y);
  return (
    <>
      <Card style={{
        position: 'absolute', left: item.x, top: item.y, zIndex: 5, height: '100px', width: '150px',
      }}
      >
        {tools.map((Tool) => <Tool index={index} item={item} />)}
      </Card>
    </>
  );
};

export default FloatToolBar;
