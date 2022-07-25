import { useEffect, useState } from 'react';
import useMousePos from './mouse_pos';
import { useStateStore } from '../store/store';
import { editUser } from '../utils/user_function';

function useUserList(list: BaseShapes.User[]) {
  const [userList, setUserList] = useState<BaseShapes.User[]>(list || []);
  const state = useStateStore();
  const mousePos = useMousePos();

  useEffect(() => {
    if (state?.currentDoc?.value) {
      (state?.currentDoc?.value).subscribe(() => {
        if (state?.currentDoc?.value?.data?.users) {
          setUserList([...state?.currentDoc?.value.data.users]);
        }
      });
      state?.currentDoc?.value.on('op', () => {
        if (state?.currentDoc?.value?.data?.users) {
          setUserList([...state?.currentDoc?.value.data.users]);
        }
      });
    }
  }, [state?.currentDoc]);
  useEffect(() => {
    if (state?.currentDoc?.value?.data) {
      state?.currentDoc?.value?.data.users.forEach((item: BaseShapes.User, index: number) => {
        if (item.microsoftId === state?.userInfo.microsoftId) {
          editUser({
            ...item,
            ...mousePos,
          }, index);
        }
      });
    }
  }, [state?.currentDoc, mousePos.x, mousePos.y]);
  return [userList];
}

export default useUserList;
