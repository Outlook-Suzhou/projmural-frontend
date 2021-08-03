/* eslint-disable prefer-object-spread */
/* eslint-disable prefer-destructuring */
import React, {
  createContext, useState, useContext, useRef,
} from 'react';

interface globalState {
  currentItem: any,
  currentIndex: number
}
type globalStateContext = [globalState, any];
const Context = createContext<globalStateContext>([{
  currentItem: {},
  currentIndex: -1,
}, () => {}]);

function useStore(): [any, any] {
  return useContext(Context);
}
function StoreProvider({ children }: { children: any}) {
  const [state, setState] = useState<globalState>({
    currentItem: {},
    currentIndex: -1,
  });
  const stateCurrent: any = useRef(state);

  const updateState = (action: string, name: string, payload: any) => {
    switch (action) {
      case 'setValue':
        setState(Object.assign({}, { ...stateCurrent.current }, { [`${name}`]: payload }));
        break;
      default:
        break;
    }
    stateCurrent.current = Object.assign({}, { ...stateCurrent.current }, { [`${name}`]: payload });
  };

  return (
    <Context.Provider value={[state, updateState]}>
      { children }
    </Context.Provider>
  );
}

export { useStore, StoreProvider };
