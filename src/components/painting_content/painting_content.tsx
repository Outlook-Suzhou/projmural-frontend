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
import useCopyer from '../../hook/copyer';
import FreeDrawing from '../tool_bar/tools/free_drawing';
import Point from '../tool_bar/tools/point';
import handleLayerClick from './handle_layer_click';
import { calcX, calcY } from '../../utils/calc_zoom_position';
import CursorShape from './cursor_shape';
import './painting_content.scss';
import useDrawing from '../../hook/freeDrawing';

const PaintingContent: React.FC<{}> = () => {
  const [list, setList] = useState(doc?.data?.shapes || []);
  const state = useStateStore();
  const dispatch = useDispatchStore();
  const [, setCopySelectItem] = useCopyer();
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  useDrawing();
  const checkDeselect = (e: any) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      dispatch({ type: 'setCurrentIndex', payload: -1 });
    }
  };
  const mouseMove = (e: { target: { getStage: () => any; }; }) => {
    const pos = e.target.getStage().getPointerPosition();
    if (state.isPainting && state.selectShape === 'PEN') {
      const newPoints = state.lastLine.points.concat([calcX(pos.x, state.stageScale, state.stagePos.x), calcY(pos.y, state.stageScale, state.stagePos.y)]);
      dispatch({
        type: 'setLastLine',
        payload: {
          ...state.lastLine,
          points: newPoints,
        },
      });
    }
    setCursorPos({ x: pos.x, y: pos.y });
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
  // const [stageScale, setstageScale] = React.useState(1);

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
    dispatch({ type: 'setStageScale', payload: newScale });
    dispatch({
      type: 'setStagePos',
      payload: {
        x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
        y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
      },
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
  // console.log(state);
  const handleClick = (e: any) => {
    if (state.selectShape !== 'ERASER' && state.selectShape !== 'PEN') {
      handleLayerClick(state.selectShape, calcX(e.evt.offsetX, state.stageScale, state.stagePos.x), calcY(e.evt.offsetY, state.stageScale, state.stagePos.y));
      dispatch({ type: 'setSelectShape', payload: 'FREE' });
    }
  };

  return (
    <>
      {state.currentIndex === -1 ? null : <ToolBar width={300} height={80} list={getFloatBar()} isFloatBar />}
      <ToolBar width={80} height={400} list={[Point, AddShape, AddImage, AddText, DeleteAll, FreeDrawing]} isFloatBar={false} />
      <div id="stage">
        <Stage
          className={state.selectShape}
          x={state.stagePos.x}
          y={state.stagePos.y}
          width={window.innerWidth}
          height={window.innerHeight}
          onWheel={handleWheel}
          scaleX={state.stageScale}
          scaleY={state.stageScale}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          draggable={!state.isPainting}
          onDragEnd={(e) => {
            dispatch({ type: 'setStagePos', payload: e.currentTarget.position() });
          }}
          onMouseMove={mouseMove}
        >
          <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
              <Layer onClick={handleClick}>
                {gridComponents}
                {
                  list.map((item: any, index: number) => (
                    <BaseShape
                      item={item}
                      index={index}
                      click={() => {
                        if (state.selectShape === 'FREE') {
                          if (item.type === 'TEXT') {
                            const afterE = {
                              ...item,
                              shift: { x: state.stagePos.x, y: state.stagePos.y, scale: state.stageScale },
                            };
                            doc.submitOp([{ p: ['shapes', index], ld: item, li: afterE }]);
                          }
                          dispatch({ type: 'setCurrentItem', payload: item });
                          dispatch({ type: 'setCurrentIndex', payload: index });
                          setCopySelectItem(item);
                        }
                      }}
                      del={() => {
                        if (state.selectShape === 'ERASER' && state.isPainting) {
                          doc.submitOp([{ p: ['shapes', index], ld: item }]);
                        }
                      }}
                    />
                  ))
                }
                <Line
                // @ts-ignore
                  globalCompositeOperation={state.lastLine.composite}
                  stroke={state.lastLine.fill}
                  points={state.lastLine.points}
                />
                {state.selectShape !== 'FREE' && <CursorShape selectShape={state.selectShape} x={calcX(cursorPos.x, state.stageScale, state.stagePos.x)} y={calcY(cursorPos.y, state.stageScale, state.stagePos.y)} /> }
              </Layer>
            </DispatchContext.Provider>
          </StateContext.Provider>
        </Stage>
      </div>
    </>
  );
};
export default PaintingContent;
