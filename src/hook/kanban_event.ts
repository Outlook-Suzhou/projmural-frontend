import { useEffect } from 'react';
import { useStateStore } from '../store/store';

function useKanBan() {
  const state = useStateStore();
  const onContextMenu = (e:any) => {
    if (state.currentItem.type === 'KANBAN' && state.currentItem.selectProj !== -1) {
      e.preventDefault();
      const listBox = document.createElement('ul');
      listBox.append('删除');
      listBox.style.display = 'block';
      listBox.style.left = `${e.clientLeft}px`;
      listBox.style.top = `${e.clientTop}px`;
      listBox.addEventListener('click', () => {
        listBox.style.display = 'none';
      });
    }
  };
  useEffect(() => {
    document.addEventListener('contextmenu', onContextMenu);
    return () => {
      document.removeEventListener('contextmenu', onContextMenu);
    };
  });
}
export default useKanBan;
