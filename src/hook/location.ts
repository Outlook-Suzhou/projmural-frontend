import { useEffect } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import { useDispatchStore } from '../store/store';
import axios from '../utils/axios';

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
        dispatch({
          type: 'setUserInfo',
          payload: {
            name: userData.data.data.name,
            microsoftId: userData.data.data.microsoft_id,
            mail: userData.data.data.mail,
          },
        });
      }
    }).catch((err) => { console.log(err); }).then(() => {
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
            }
          }
        });
      }
    });
  }, [location]);
}

export default useCurrentLocation;
