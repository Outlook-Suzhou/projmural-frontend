import React, { useCallback, useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import renamePainting from '../../utils/renamePainting';
import { useStateStore, useDispatchStore } from '../../store/store';

interface Props {
  className: string
  doc: any
}
const Text: React.FC<Props> = ({ doc, className }: Props) => {
  const state = useStateStore();
  const dispatch = useDispatchStore();
  const [text, setText] = useState(doc.value.canvaName);
  const handleSubmit = useCallback(() => {
    renamePainting(state.userInfo.microsoftId, text, state.currentCanvas.id);
    try {
      doc.value.submitOp([{ p: ['canvaName'], od: doc.value.canvaName, oi: text }]);
    } catch (e) {
      console.log(e);
    }
    dispatch({
      type: 'setCurrentCanvas',
      payload: { ...state.currentCanvas, name: text },
    });
    const newCanvasArray = [...state.userInfo.canvas];
    const foundIndex = state.userInfo.canvas.findIndex((canvas) => canvas.id === state.currentCanvas.id);
    if (foundIndex !== -1) {
      newCanvasArray[foundIndex] = {
        ...state.userInfo.canvas[foundIndex],
        name: text,
      };
      dispatch({
        type: 'setUserInfo',
        payload: { ...state.userInfo, canvas: newCanvasArray },
      });
      console.log('text', text);
      console.log('index', foundIndex);
      console.log('current', state.currentCanvas);
      console.log('state', state.userInfo.canvas);
    } else {
      console.log('Canvas Id doesnt exist in userInfo.canvas!');
    }
  }, [state.userInfo.microsoftId, text, state.currentCanvas.id]);
  useEffect(() => {
    setText(state.currentCanvas.name);
  }, [state.currentCanvas.name]);
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
