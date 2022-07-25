import React, { useCallback, useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import renamePainting from '../../utils/renamePainting';
import { useStateStore, useDispatchStore } from '../../store/store';
import { getCurrentDocId } from '../../client/client';

interface Props {
  className: string
  doc: any
}
const Text: React.FC<Props> = ({ doc, className }: Props) => {
  const state = useStateStore();
  const dispatch = useDispatchStore();
  const [canvasId] = useState(() => (doc?.value?.id || getCurrentDocId()));
  const [text, setText] = useState(doc?.value?.data?.canvaName || '');
  const handleSubmit = useCallback(() => {
    renamePainting(state.userInfo.microsoftId, text, canvasId as string);
    try {
      doc.value.submitOp([{ p: ['canvaName'], od: doc?.value?.data?.canvaName || '', oi: text }]);
    } catch (e) {
      console.log(e);
    }

    const newCanvasArray = [...state.userInfo.canvas];
    const foundIndex = state.userInfo.canvas.findIndex((canvas) => canvas.id === canvasId);
    if (foundIndex !== -1) {
      newCanvasArray[foundIndex] = {
        ...state.userInfo.canvas[foundIndex],
        name: text,
      };
      dispatch({
        type: 'setUserInfo',
        payload: { ...state.userInfo, canvas: newCanvasArray },
      });
    } else {
      console.log(canvasId);
      console.log('Canvas Id doesnt exist in userInfo.canvas!');
    }
  }, [state.userInfo.microsoftId, text, canvasId, doc?.value?.data?.canvaName]);
  useEffect(() => {
    if (doc && doc.value) {
      console.log(doc.value.data.canvaName);
      setText(doc.value.data.canvaName);
      doc.value.subscribe(() => {
        if (doc?.value?.data?.canvaName) {
          setText(doc?.value?.data?.canvaName);
        }
      });
      doc.value.on('op', () => {
        if (doc?.value?.data?.canvaName) {
          setText(doc?.value?.data?.canvaName);
        }
      });
    } else {
      console.log('doc not exist');
    }
  }, [doc]);
  return (
    <Input
      className={className}
      bordered={false}
      value={text}
      onChange={(e) => {
        setText(e.target.value);
      }}
      onBlur={handleSubmit}
    />
  );
};

export default Text;
