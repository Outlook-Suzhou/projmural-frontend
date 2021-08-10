import { useEffect, useState } from 'react';
import addShape from '../utils/add_function';

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
  const [mouse, setMouse] = useState<BaseShapes.Position>({ x: 0, y: 0 });
  const [item, setItem] = useState<BaseShapes.Shape | null>(null);
  const [selectItem, setSelectItem] = useState<BaseShapes.Shape | null>(null);
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
            ...item, x: mouse.x, y: mouse.y,
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
    const mouseListener = (e: any) => {
      setMouse({
        x: e.x,
        y: e.y,
      });
    };
    document.addEventListener('keydown', copyListener);
    document.addEventListener('mousemove', mouseListener);
    return () => {
      document.removeEventListener('keydown', copyListener);
      document.removeEventListener('mousemove', mouseListener);
    };
  }, [item, selectItem, mouse]);
  return [item, setSelectItem];
}

export default useCopyer;
