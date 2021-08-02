import React from 'react';
import SelectColor from './tools/select_color';

interface Props {
    index: number,
    item: BaseShapes.Rectangle,
}

const FloatToolBar: React.FC<Props> = (props: Props) => {
  const { index, item } = props;
  const tools = [SelectColor];
  // fix the float tool bar, not rotating with the shape
  return (
    <>
      <div style={{
        position: 'absolute', left: item.x + 200, top: item.y - 100, zIndex: 5, height: 'auto', width: 'auto',
      }}
      >
        {tools.map((Tool) => <Tool index={index} item={item} />)}
      </div>
    </>
  );
};

export default FloatToolBar;
