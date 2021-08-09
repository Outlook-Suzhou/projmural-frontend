/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import {
  Stage, Layer, Rect, Line,
} from 'react-konva';
import doc from '../../client/client';
import AddShape from '../tool_bar/tools/add_shape';
import ToolBar from '../tool_bar/tool_bar';
import AddImage from '../tool_bar/tools/add_images';
import AddText from '../tool_bar/tools/add_text';
import DeleteAll from '../tool_bar/tools/delete_all';
import BaseShape from '../shapes/baseshape';
import SelectColor from '../tool_bar/tools/select_color';
import Lock from '../tool_bar/tools/lock';
import {
  useStateStore, useDispatchStore, StateContext, DispatchContext,
} from '../../store/store';
import DelEle from '../tool_bar/tools/del_ele';
import ZIndex from '../tool_bar/tools/zIndex';
import FontSize from '../tool_bar/tools/font_size';
import FreeDrawing from '../tool_bar/tools/free_drawing';

const PaintingContent: React.FC<{}> = () => {
  const [list, setList] = useState(doc?.data?.shapes || []);
  const state = useStateStore();
  const dispatch = useDispatchStore();
  const [lastLine, setLastLine] = useState({
    fill: '#df4b26',
    composite: 'source-over',
    points: [0, 0],
    type: 'CURVELINE',
  });
  const [isPainting, setIsPainting] = useState(false);
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  function startDraw(e: { target: any; }) {
    const pos = e.target.getStage().getPointerPosition();
    setLastLine({
      fill: '#df4b26',
      composite: 'source-over',
      points: [pos.x - stagePos.x, pos.y - stagePos.y],
      type: 'CURVELINE',
    });
    setIsPainting(true);
  }
  // const [selectedId, selectShape] = useState(-1);
  const checkDeselect = (e: any) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      dispatch({ type: 'setCurrentIndex', payload: -1 });
    }
    if (state.drawing !== 0) {
      startDraw(e);
    }
  };
  const mouseMove = (e: { target: { getStage: () => any; }; }) => {
    if (isPainting && state.drawing === 1) {
      const pos = e.target.getStage().getPointerPosition();
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      const newPoints = lastLine.points.concat([(pos.x - stagePos.x) / stageScale, (pos.y - stagePos.y) / stageScale]);
      // @ts-ignore
      setLastLine({
        ...lastLine,
        points: newPoints,
      });
    }
  };
  const getFloatBar = () => {
    const tools = [SelectColor, ZIndex, Lock, DelEle];
    if (state.currentItem.type === 'TEXT') {
      tools.push(FontSize);
    }
    return tools;
  };
  useEffect(() => {
    doc.subscribe(() => {
      if (doc?.data?.shapes) {
        setList([...doc.data.shapes]);
      }
    });
  }, []);
  useEffect(() => {
    doc.on('op', () => {
      if (doc?.data?.shapes) {
        setList([...doc.data.shapes]);
      }
    });
  }, []);

  const WIDTH = 300;// size for background rect
  const HEIGHT = 300;
  const [stageScale, setstageScale] = React.useState(1);

  const gridComponents = [];

  const handleWheel = (e: any) => {
    e.evt.preventDefault();
    const scaleBy = 1.05;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };

    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    setstageScale(newScale);
    setStagePos({
      x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    });
  };

  for (let x = -2000; x < 2000; x += WIDTH) {
    for (let y = -2000; y < 2000; y += HEIGHT) {
      gridComponents.push(
        <Rect
          x={x}
          y={y}
          width={WIDTH}
          height={HEIGHT}
          fill="#F2F2F2"
          stroke="lightGray"
          onClick={() => { dispatch({ type: 'setCurrentIndex', payload: -1 }); }}
        />,
      );
    }
  }
  console.log(state);
  return (
    <>
      {state.currentIndex === -1 ? null : <ToolBar width={300} height={80} list={getFloatBar()} isFloatBar />}
      <ToolBar width={80} height={400} list={[AddShape, AddImage, AddText, DeleteAll, FreeDrawing]} isFloatBar={false} />
      <div id="stage">
        <Stage
          x={stagePos.x}
          y={stagePos.y}
          width={window.innerWidth}
          height={window.innerHeight}
          onWheel={handleWheel}
          scaleX={stageScale}
          scaleY={stageScale}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          draggable={!isPainting}
          onDragEnd={(e) => {
            setStagePos(e.currentTarget.position());
          }}
          onMouseMove={mouseMove}
          onMouseUp={() => {
            if (isPainting) {
              setIsPainting(false);
              if (state.drawing === 1) {
                console.log('add newLine');
                doc.submitOp([{ p: ['shapes', doc.data.shapes.length], li: lastLine }]);
                setLastLine({
                  fill: '#df4b26',
                  composite: 'source-over',
                  points: [0, 0],
                  type: 'CURVELINE',
                });
              }
            }
          }}
        >
          <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
              <Layer>
                {gridComponents}
                {
                  list.map((item: any, index: number) => (
                    <BaseShape
                      item={item}
                      index={index}
                      currentItem={state.currentItem}
                      currentIndex={state.currentIndex}
                      click={(e: any) => {
                        console.log(stagePos);
                        console.log(stageScale);
                        console.log((e.target.getStage().getPointerPosition().x - stagePos.x) / stageScale);
                        if (item.type === 'TEXT') {
                          const afterE = {
                            ...item,
                            shift: { x: stagePos.x, y: stagePos.y, scale: stageScale },
                          };
                          doc.submitOp([{ p: ['shapes', index], ld: item, li: afterE }]);
                        }
                        dispatch({ type: 'setCurrentItem', payload: item });
                        dispatch({ type: 'setCurrentIndex', payload: index });
                      }}
                      del={() => {
                        if (state.drawing === 2 && isPainting) {
                          doc.submitOp([{ p: ['shapes', index], ld: item }]);
                        }
                      }}
                    />
                  ))
                }
                <Line
                // @ts-ignore
                  globalCompositeOperation={lastLine.composite}
                  stroke={lastLine.fill}
                  points={lastLine.points}
                />
              </Layer>
            </DispatchContext.Provider>
          </StateContext.Provider>
        </Stage>
      </div>
    </>
  );
};
export default PaintingContent;
