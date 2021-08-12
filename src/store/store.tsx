import React, {
  createContext, useContext, useReducer,
} from 'react';

interface Point {
  x: number,
  y: number,
}

interface globalState {
  currentItem: any,
  currentIndex: number
  stagePos: any
  stageScale: number
  selectShape: string
  penColor: string
  adsorptionPointsList: Array<Point>
}
interface actionType {
  type: string,
  payload: any,
}

const initialState: globalState = {
  currentItem: {},
  currentIndex: -1,
  stagePos: { x: 0, y: 0 },
  stageScale: 1,
  selectShape: 'FREE',
  penColor: '#df4b26',
  adsorptionPointsList: [],
};

function reducer(state: globalState = initialState, action: actionType): globalState {
  switch (action.type) {
    case 'setCurrentItem':
      return { ...state, currentItem: action.payload };
    case 'setCurrentIndex':
      return { ...state, currentIndex: action.payload };
    case 'setStagePos':
      return { ...state, stagePos: action.payload };
    case 'setStageScale':
      return { ...state, stageScale: action.payload };
    case 'setSelectShape':
      return { ...state, selectShape: action.payload };
    case 'setPenColor':
      return { ...state, penColor: action.payload };
    case 'setAdsorptionPointsList':
      return { ...state, adsorptionPointsList: action.payload };
    case 'reset':
      return { ...initialState };
    default:
      throw new Error();
  }
}

const StateContext = createContext<globalState>({
  currentItem: {},
  currentIndex: -1,
  stagePos: { x: 0, y: 0 },
  stageScale: 1,
  selectShape: 'FREE',
  penColor: '#df4b26',
  adsorptionPointsList: [],
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
