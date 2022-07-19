import React, {
  createContext, useContext, useReducer,
} from 'react';

interface line {
  fill: string,
  points: Array<number>,
  type: 'CURVELINE',
  size: number,
}
interface Point {
  x: number,
  y: number,
}

interface canvaInfo {
  id: string
  name: string
  recentOpen: string
}

interface UserInfo {
  name: string
  microsoftId: string
  mail: string
  canvas: Array<canvaInfo>
  recentCanvas: Array<canvaInfo>
}

interface globalState {
  currentDoc: any,
  currentItem: any,
  currentIndex: number
  stagePos: any
  stageScale: number
  selectShape: string
  lastLine: line
  isPainting: boolean
  isDragging: boolean // If is dragging or transforming a shape. If it's true, floatBar won't show.
  isVisibleComment: boolean
  adsorptionPointsList: Array<Point>
  OpList: Array<any>
  userInfo: UserInfo
  beginTime: string
  endTime: string
}
interface actionType {
  type: string,
  payload: any,
}

const initialState: globalState = {
  currentDoc: undefined,
  currentItem: {},
  currentIndex: -1,
  stagePos: { x: 0, y: 0 },
  stageScale: 2,
  selectShape: 'FREE',
  lastLine: {
    fill: '#000000',
    points: [0],
    type: 'CURVELINE',
    size: 4,
  },
  isPainting: false,
  adsorptionPointsList: [],
  OpList: [],
  isDragging: false,
  isVisibleComment: true,
  userInfo: {
    name: '',
    microsoftId: '',
    mail: '',
    canvas: [],
    recentCanvas: [],
  },
  beginTime: '0',
  endTime: '0',
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
    case 'setIsDragging':
      return { ...state, isDragging: action.payload };
    case 'setCommentVisible':
      return { ...state, isVisibleComment: action.payload };
    case 'setAdsorptionPointsList':
      return { ...state, adsorptionPointsList: action.payload };
    case 'setUserInfo':
      return { ...state, userInfo: action.payload };
    case 'reset':
      return { ...initialState };
    case 'setOpList':
      return { ...state, OpList: action.payload };
    case 'setBeginTime':
      return { ...state, beginTime: action.payload };
    case 'setEndTime':
      return { ...state, endTime: action.payload };
    case 'setCurrentDoc':
      return { ...state, currentDoc: action.payload };
    default:
      throw new Error();
  }
}

const StateContext = createContext<globalState>({
  ...initialState,
});
const DispatchContext = createContext<Function>(() => { });

function useStateStore() {
  return useContext(StateContext);
}

function useDispatchStore() {
  return useContext(DispatchContext);
}
function StoreProvider({ children }: { children: any }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export {
  useStateStore, useDispatchStore, StoreProvider, StateContext, DispatchContext,
};
