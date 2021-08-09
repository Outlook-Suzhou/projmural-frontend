import React, {
  createContext, useContext, useReducer,
} from 'react';

interface globalState {
  currentItem: any,
  currentIndex: number
  drawing: number // 0为非自由画板模式，1为画笔，2为橡皮
}
interface actionType {
  type: string,
  payload: any,
}

const initialState: globalState = {
  currentItem: {},
  currentIndex: -1,
  drawing: 0,
};

function reducer(state: globalState = initialState, action: actionType): globalState {
  switch (action.type) {
    case 'setCurrentItem':
      return { ...state, currentItem: action.payload };
    case 'setCurrentIndex':
      return { ...state, currentIndex: action.payload };
    case 'setDrawing':
      return { ...state, drawing: action.payload };
    case 'reset':
      return { ...initialState };
    default:
      throw new Error();
  }
}

const StateContext = createContext<globalState>({
  currentItem: {},
  currentIndex: -1,
  drawing: 0,
});
const DispatchContext = createContext<Function>(() => {});

function useStateStore() {
  return useContext(StateContext);
}

function useDispatchStore() {
  return useContext(DispatchContext);
}
function StoreProvider({ children }: { children: any}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        { children }
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export {
  useStateStore, useDispatchStore, StoreProvider, StateContext, DispatchContext,
};
