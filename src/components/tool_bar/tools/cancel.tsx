/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line no-unused-vars
import { Icon } from '@fluentui/react/lib/Icon';
import { useDispatchStore, useStateStore } from '../../../store/store';
import doc from '../../../client/client';

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
          console.log(ops);
          if (ops.length !== 0) {
            const last = JSON.parse(ops.pop());
            doc.submitOp([{ p: ['shapes'], od: doc.data.shapes, oi: last }]);
            dispatch({ type: 'setOpList', payload: ops });
          }
        }}
      />
    </div>

  );
};
function useCancel() {
  const state = useStateStore();
  const dispatch = useDispatchStore();
  const cancel = (e:any) => {
    if (e.ctrlKey && e.keyCode === 90) {
      const ops = state.OpList;
      console.log(ops);
      if (ops.length !== 0) {
        const last = JSON.parse(ops.pop());
        doc.submitOp([{ p: ['shapes'], od: doc.data.shapes, oi: last }]);
        dispatch({ type: 'setOpList', payload: ops });
      }
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', cancel);
    return () => {
      document.removeEventListener('keydown', cancel);
    };
  });
}
export { useCancel };
export default Cancel;
