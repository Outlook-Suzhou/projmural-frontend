import { useEffect, useState } from 'react';
import useMousePos from './mouse_pos';
import getCurrentDoc from '../client/client';
import { useStateStore } from '../store/store';
import { editUser } from '../utils/user_function';

const doc = getCurrentDoc();
function useUserList(list: BaseShapes.User[]) {
  const [userList, setUserList] = useState<BaseShapes.User[]>(list || []);
  const state = useStateStore();
  const mousePos = useMousePos();
  useEffect(() => {
    doc.subscribe(() => {
      if (doc?.data?.users) {
        setUserList([...doc.data.users]);
      }
    });
    doc.on('op', () => {
      if (doc?.data?.users) {
        setUserList([...doc.data.users]);
      }
    });
  }, []);
  useEffect(() => {
    if (doc.data) {
      doc.data.users.forEach((item: BaseShapes.User, index: number) => {
        if (item.microsoftId === state.userInfo.microsoftId) {
          editUser({
            ...item,
            ...mousePos,
          }, index);
        }
      });
    }
  }, [mousePos.x, mousePos.y]);
  return [userList];
}

export default useUserList;
