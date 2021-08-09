/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line no-unused-vars
import { Icon } from '@fluentui/react/lib/Icon';
import { mergeStyles, mergeStyleSets } from '@fluentui/react/lib/Styling';

const iconClass = mergeStyles({
  fontSize: 50,
  height: 50,
  width: 50,
  margin: '0 25px',
});
const classNames = mergeStyleSets({
  deepSkyBlue: [{ color: 'deepskyblue' }, iconClass],
});

const Point: React.FC<{}> = () => (
  // eslint-disable-next-line object-curly-newline
  <div className="tool_icon">
    <Icon
      iconName="TouchPointer"
      style={{ fontSize: '40px', margin: 'auto' }}
      color="deepskyblue"
      className={classNames.deepSkyBlue}
    />
  </div>

);
export default Point;
