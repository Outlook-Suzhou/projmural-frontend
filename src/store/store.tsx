import React, {
  createContext, useContext, useReducer,
} from 'react';

interface line{
  fill: string,
  points: Array<number>,
  type: 'CURVELINE',
}
interface Point {
  x: number,
  y: number,
}

interface Operation{
  op: string,
  shape: any,
  index: number,
  before: any,
}
interface globalState {
  currentItem: any,
  currentIndex: number
  stagePos: any
  stageScale: number
  selectShape: string
  lastLine: line
  isPainting: boolean
  adsorptionPointsList: Array<Point>
  OpList: Array<Operation>
}
interface actionType {
  type: string,
  payload: any,
}

const initialState: globalState = {
  currentItem: {},
  currentIndex: -1,
  stagePos: { x: 0, y: 0 },
  stageScale: 2,
  selectShape: 'FREE',
  lastLine: {
    fill: '#000000',
    points: [0],
    type: 'CURVELINE',
  },
  isPainting: false,
  adsorptionPointsList: [],
  OpList: [],
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
    case 'setLastLine':
      return { ...state, lastLine: action.payload };
    case 'setIsPainting':
      return { ...state, isPainting: action.payload };
    case 'setAdsorptionPointsList':
      return { ...state, adsorptionPointsList: action.payload };
    case 'reset':
      return { ...initialState };
    case 'setOpList':
      return { ...state, OpList: action.payload };
    case 'addOpItem':
      state.OpList.push(action.payload);
      return { ...state };
    default:
      throw new Error();
  }
}

const StateContext = createContext<globalState>({
  currentItem: {},
  currentIndex: -1,
  stagePos: { x: 0, y: 0 },
  stageScale: 2,
  selectShape: 'FREE',
  lastLine: {
    fill: '#000000',
    points: [0],
    type: 'CURVELINE',
  },
  isPainting: false,
  adsorptionPointsList: [],
  OpList: [],
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
