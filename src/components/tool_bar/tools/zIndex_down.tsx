import { Icon } from '@fluentui/react/lib/Icon';
import doc from '../../../client/client';

interface Props {
  currentIndex: number,
  currentItem: BaseShapes.Rectangle,
}
const ZIndexDown = (props: Props) => {
  const { currentItem, currentIndex } = props;

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <div className="tool_icon">
      {/* eslint-disable-next-line react/react-in-jsx-scope */}
      <Icon
        iconName="Down"
        style={{ fontSize: '40px', margin: 'auto' }}
        onClick={() => { doc.submitOp([{ p: ['shapes', currentIndex], ld: currentItem }]); doc.submitOp([{ p: ['shapes', 0], li: currentItem }]); }}
      />
    </div>
  );
};
export default ZIndexDown;
