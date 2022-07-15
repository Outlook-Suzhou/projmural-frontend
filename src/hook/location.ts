import { useEffect } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import getCurrentDoc from '../client/client';
import { useDispatchStore } from '../store/store';
import axios from '../utils/axios';
import { addUser, removeUser, userExist } from '../utils/user_function';

function useCurrentLocation() {
  const currentLocation = useLocation();
  const history = useHistory();
  const matchPainting: any = useRouteMatch({
    path: '/painting/:id',
    strict: true,
  });
  const dispatch = useDispatchStore();
  console.log(currentLocation);
  useEffect(() => {
    axios.get('/api/currentUser').then((userData) => {
      if (userData.data.retc === -1) {
        history.push('/');
      } else if (userData.data.retc === 0) {
        const user: any = {
          name: userData.data.data.name,
          microsoftId: userData.data.data.microsoft_id,
          mail: userData.data.data.mail,
        };
        dispatch({
          type: 'setUserInfo',
          payload: {
            name: userData.data.data.name,
            microsoftId: userData.data.data.microsoft_id,
            mail: userData.data.data.mail,
            canvas: userData.data.data.canvas.map((val: any) => ({
              id: val.id,
              name: val.name,
              recentOpen: val.recent_open,
            })),
            recentCanvas: (userData.data.data.recent_canvas || []).map((val: any) => ({
              id: val.id,
              name: val.name,
              recentOpen: val.recent_open,
            })),
          },
        });
        return Promise.resolve(user);
      }
      return Promise.resolve(null);
    }).catch((err) => { console.log(err); }).then((user) => {
      if (matchPainting) {
        axios.post('/api/doc', {
          type: 'get',
          data: {
            microsoft_id: 'test',
            canvas_id: matchPainting.params.id,
          },
        }).then((res) => {
          if (res.data.msg === 'ok') {
            if (res.data.data.canvas_exist === false) {
              history.push('/404');
            } else {
              getCurrentDoc(() => {
                if (!userExist(user)) {
                  addUser({
                    x: 0,
                    y: 0,
                    ...user,
                  });
                }
                window.onbeforeunload = () => {
                  removeUser(user);
                };
                // eslint-disable-next-line no-restricted-globals
              });
              // eslint-disable-next-line no-restricted-globals
            }
          }
        });
      }
    });
  }, [currentLocation.pathname]);
}

export default useCurrentLocation;
