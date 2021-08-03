import { Icon } from '@fluentui/react/lib/Icon';
import React from 'react';
import doc from '../../../client/client';

interface Props {
  currentIndex: number,
  currentItem: BaseShapes.Shape,
  setCurrentItem: any,
  // eslint-disable-next-line react/no-unused-prop-types
  setCurrentIndex: any,
}
const lockItem: Function = (currentItem: BaseShapes.Shape, currentIndex: number, setCurrentItem: any) => {
  const afterE: BaseShapes.Shape = { ...currentItem, draggable: !currentItem.draggable };
  doc.submitOp([{ p: ['shapes', currentIndex], ld: currentItem, li: afterE }]);
  setCurrentItem(afterE);
};
const Lock: React.FC<Props> = (props: Props) => {
  const { currentItem, currentIndex, setCurrentItem } = props;

  return (
    <div className="tool_icon">
      <Icon
        iconName={currentItem.draggable ? 'Lock' : 'UnLock'}
        style={{ fontSize: '40px', margin: 'auto' }}
        onClick={() => { lockItem(currentItem, currentIndex, setCurrentItem); }}
      />
    </div>
  );
};
export default Lock;
