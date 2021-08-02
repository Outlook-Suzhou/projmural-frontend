import { Icon } from '@fluentui/react/lib/Icon';
import doc from '../../../client/client';

interface Props {
  index: number,
  item: BaseShapes.Rectangle,
}
const ZIndexDown = (props: Props) => {
  const { index, item } = props;

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <div className="tool_icon">
      {/* eslint-disable-next-line react/react-in-jsx-scope */}
      <Icon
        iconName="Down"
        style={{ fontSize: '40px', margin: 'auto' }}
        onClick={() => { doc.submitOp([{ p: ['shapes', index], ld: item }]); doc.submitOp([{ p: ['shapes', 0], li: item }]); }}
      />
    </div>
  );
};
export default ZIndexDown;
