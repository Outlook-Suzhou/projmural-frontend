import { useStateStore } from '../store/store';

export const calcZoomX = (x:number) => {
  const state = useStateStore();
  return x * state.stageScale + state.stagePos.x;
};
export const calcZoomY = (y:number) => {
  const state = useStateStore();
  return y * state.stageScale + state.stagePos.y;
};
