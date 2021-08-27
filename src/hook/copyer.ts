import { useEffect, useState } from 'react';
import addShape from '../utils/add_function';
import { calcX, calcY } from '../utils/calc_zoom_position';
import { useStateStore } from '../store/store';
import useMousePos from './mouse_pos';

// const throttle = (fn: Function, rateTime: number) => {
//   let prev = Date.now() - rateTime;
//   return (...args: any[]) => {
//     if (Date.now() - prev >= rateTime) {
//       fn.apply(this, args);
//       prev = Date.now();
//     }
//   };
// };
// throttle;
function useCopyer(): [BaseShapes.Shape | null, Function] {
  const mouse = useMousePos();
  const [item, setItem] = useState<BaseShapes.Shape | null>(null);
  const [selectItem, setSelectItem] = useState<BaseShapes.Shape | null>(null);
  const state = useStateStore();
  useEffect(() => {
    const copyListener = (e: any) => {
      if (e.ctrlKey && e.keyCode === 67) {
        console.log('ctrl+c!');
        setItem(selectItem);
      }
      if (e.ctrlKey && e.keyCode === 86) {
        console.log(item);
        if (item != null) {
          console.log('ctrl+v');
          const newItem = {
            ...item, x: calcX(mouse.x, state.stageScale, state.stagePos.x), y: calcY(mouse.y, state.stageScale, state.stagePos.y),
          };
          addShape(newItem);
        }
      }
      if (e.ctrlKey && e.keyCode === 68) {
        if (item !== null) {
          console.log('ctrl+v');
          console.log(item);
        }
      }
    };
    document.addEventListener('keydown', copyListener);
    return () => {
      document.removeEventListener('keydown', copyListener);
    };
  }, [item, selectItem]);
  return [item, setSelectItem];
}

export default useCopyer;
