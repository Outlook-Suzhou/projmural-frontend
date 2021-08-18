/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line no-unused-vars
import { Icon } from '@fluentui/react/lib/Icon';
import { useDispatchStore, useStateStore } from '../../../store/store';
import doc from '../../../client/client';

function getIndex(shape: any) {
  let i = 0;
  while (i < doc.data.shapes.length) {
    // eslint-disable-next-line eqeqeq
    if (doc.data.shapes[i] === shape) {
      return i;
    }
    i += 1;
  }
  console.log(shape);
  return -1;
}

const Cancel: React.FC<{}> = () => {
  const dispatch = useDispatchStore();
  const state = useStateStore();
  return (
    // eslint-disable-next-line object-curly-newline
    <div className="tool_icon">
      <Icon
        iconName="ReturnToSession"
        onClick={() => {
          const ops = state.OpList;
          if (ops.length !== 0) {
            const last = ops.pop();
            // @ts-ignore
            const ind = getIndex(last.shape);
            dispatch({ type: 'setOpList', payload: ops });
            // @ts-ignore
            switch (last.op) {
              case 'drag':
                // @ts-ignore
                doc.submitOp([{ p: ['shapes', ind], ld: last.shape, li: last.before }]);
                break;
              case 'add':
                doc.submitOp([{ p: ['shapes', ind], ld: doc.data.shapes[ind] }]);
                break;
              case 'del':
                // @ts-ignore
                doc.submitOp([{ p: ['shapes', doc.data.shapes.length], li: last.shape }]);
                break;
              default:
                break;
            }
          }
        }}
      />
    </div>

  );
};
export default Cancel;
