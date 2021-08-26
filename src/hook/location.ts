import { useEffect } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import { useDispatchStore } from '../store/store';
import axios from '../utils/axios';
import { addUser } from '../utils/user_function';
import { addSubscrible } from '../client/client';

function useCurrentLocation() {
  const location = useLocation();
  const history = useHistory();
  const matchPainting: any = useRouteMatch({
    path: '/painting/:id',
    strict: true,
  });
  const dispatch = useDispatchStore();
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
          payload: user,
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
              addSubscrible(() => addUser({
                x: 0,
                y: 0,
                ...user,
              }));
            }
          }
        });
      }
    });
  }, [location.pathname]);
}

export default useCurrentLocation;
