import { useEffect, useState } from 'react';
import { useStateStore } from '../store/store';

interface Point {
  x: number,
  y: number,
}

function useAuxiliaryPointList(): [Array<Point>, Function] {
  const [AuxiliaryPointList, setAuxiliaryPointList] = useState([]);
  const state = useStateStore();
  useEffect(() => { setAuxiliaryPointList([]); }, [state.currentIndex]);
  return [AuxiliaryPointList, setAuxiliaryPointList];
}

export default useAuxiliaryPointList;
