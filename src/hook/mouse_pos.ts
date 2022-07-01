import { useEffect, useState } from 'react';

const useMousePos = () => {
  const [mouse, setMouse] = useState<BaseShapes.Position>({ x: 0, y: 0 });
  useEffect(() => {
    const mouseListener = (e: any) => {
      // console.log(mouse);
      // console.log(doc);
      setMouse({
        x: e.x,
        y: e.y,
      });
    };
    document.addEventListener('click', mouseListener);
    return () => {
      document.removeEventListener('click', mouseListener);
    };
  }, []);
  return mouse;
};

export default useMousePos;
