import { useState } from 'react';
import { useStateStore } from '../store/store';
import addShape from '../utils/add_function';

const throttle = (fn:Function, rateTime:number) => {
  let prev = Date.now() - rateTime;
  return (...args:any[]) => {
    if (Date.now() - prev >= rateTime) {
      fn.apply(this, args);
      prev = Date.now();
    }
  };
};

function useCopyer() {
  const store = useStateStore();
  const [item, setItem] = useState<any>(null);
  document.addEventListener('keydown', throttle((e: any) => {
    if (e.ctrlKey && e.keyCode === 67) {
      console.log('ctrl+c!');
      if (store.currentIndex !== -1) setItem(store.currentItem);
    }
  }, 100));
  document.addEventListener('keydown', throttle((e: any) => {
    if (e.ctrlKey && e.keyCode === 86) {
      if (item != null) {
        const newItem = Object.assign(item, {
          x: item.x - 10,
          y: item.y - 10,
        });
        addShape(newItem);
      }
    }
  }, 100));
  document.addEventListener('keydown', throttle((e: any) => {
    if (e.ctrlKey && e.keyCode === 68) {
      if (store.currentIndex !== -1) {
        const newItem = Object.assign(store.currentItem, {
          x: store.currentItem.x - 10,
          y: store.currentItem.y - 10,
        });
        addShape(newItem);
      }
    }
  }, 100));
}

export default useCopyer;
