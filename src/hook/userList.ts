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
    (doc.value).subscribe(() => {
      if (doc?.value?.data?.users) {
        setUserList([...doc.value.data.users]);
      }
    });
    doc.value.on('op', () => {
      if (doc?.value?.data?.users) {
        setUserList([...doc.value.data.users]);
      }
    });
  }, []);
  useEffect(() => {
    if (doc?.value?.data) {
      doc?.value?.data.users.forEach((item: BaseShapes.User, index: number) => {
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
