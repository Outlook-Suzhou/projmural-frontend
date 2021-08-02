import { Icon } from '@fluentui/react/lib/Icon';
import React from 'react';
import doc from '../../../client/client';

interface Props {
  index: number,
  item: BaseShapes.Rectangle,
}
const ZIndexUp = (props: Props) => {
  const { index, item } = props;

  return (
    <div className="tool_icon">
      <Icon
        iconName="Up"
        style={{ fontSize: '40px', margin: 'auto' }}
        onClick={() => { doc.submitOp([{ p: ['shapes', index], ld: item }]); doc.submitOp([{ p: ['shapes', doc.data.shapes.length], li: item }]); }}
      />
    </div>
  );
};
export default ZIndexUp;
