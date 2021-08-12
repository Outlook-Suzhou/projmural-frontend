import { useEffect } from 'react';
import { calcX, calcY } from '../utils/calc_zoom_position';
import { useDispatchStore, useStateStore } from '../store/store';
import doc from '../client/client';

function useDrawing() {
  const state = useStateStore();
  const dispatch = useDispatchStore();
  const startDraw = (e: any) => {
    if (state.selectShape === 'ERASER' || state.selectShape === 'PEN') {
      dispatch({
        type: 'setLastLine',
        payload: {
          fill: '#df4b26',
          points: [calcX(e.x, state.stageScale, state.stagePos.x), calcY(e.y, state.stageScale, state.stagePos.y)],
          type: 'CURVELINE',
        },
      });
      dispatch({ type: 'setIsPainting', payload: true });
    }
  };
  const onMouseUp = () => {
    if (state.isPainting) {
      dispatch({ type: 'setIsPainting', payload: false });
      if (state.selectShape === 'PEN') {
        doc.submitOp([{ p: ['shapes', doc.data.shapes.length], li: state.lastLine }]);
        dispatch({
          type: 'setLastLine',
          payload: {
            fill: '#df4b26',
            // @ts-ignore
            points: [0, 0],
            type: 'CURVELINE',
          },
        });
      }
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', startDraw);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousedown', startDraw);
    };
  });
}

export default useDrawing;
