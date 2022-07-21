import { useEffect } from 'react';
import { useStateStore, useDispatchStore } from '../store/store';
import { deleteCurrentItem } from '../utils/delete_function';

function useDeleteKey() {
  const [state, dispatch] = [useStateStore(), useDispatchStore()];
  useEffect(() => {
    const deleteListener = (e: any) => {
      if (e.keyCode === 46) {
        console.log('delete!');
        deleteCurrentItem(state, dispatch);
      }
    };
    document.addEventListener('keydown', deleteListener);
    return () => {
      document.removeEventListener('keydown', deleteListener);
    };
  }, [state, dispatch]);
}

export default useDeleteKey;
