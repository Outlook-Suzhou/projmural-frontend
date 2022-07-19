import { useEffect, useState } from 'react';
import useMousePos from './mouse_pos';
import { useStateStore } from '../store/store';
import { editUser } from '../utils/user_function';
import getCurrentDoc from '../client/client';

function useUserList(list: BaseShapes.User[]) {
  const [userList, setUserList] = useState<BaseShapes.User[]>(list || []);
  const state = useStateStore();
  const mousePos = useMousePos();
  const doc = getCurrentDoc() || state?.currentDoc?.value;

  useEffect(() => {
    console.log('global state:', state);
    (doc?.value).subscribe(() => {
      if (doc?.value?.data?.users) {
        setUserList([...doc?.value.data.users]);
      }
    });
    doc?.value.on('op', () => {
      if (doc?.value?.data?.users) {
        setUserList([...doc?.value.data.users]);
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
