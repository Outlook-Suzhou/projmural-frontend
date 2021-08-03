import { Icon } from '@fluentui/react/lib/Icon';
import React from 'react';
import doc from '../../../client/client';

interface Props {
  currentIndex: number,
  currentItem: BaseShapes.Rectangle,
}
const ZIndexUp = (props: Props) => {
  const { currentItem, currentIndex } = props;

  return (
    <div className="tool_icon">
      <Icon
        iconName="Up"
        style={{ fontSize: '40px', margin: 'auto' }}
        onClick={() => { doc.submitOp([{ p: ['shapes', currentIndex], ld: currentItem }]); doc.submitOp([{ p: ['shapes', doc.data.shapes.length], li: currentItem }]); }}
      />
    </div>
  );
};
export default ZIndexUp;
