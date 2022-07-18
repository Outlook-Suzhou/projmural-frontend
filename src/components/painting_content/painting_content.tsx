/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo, useState } from 'react';
import {
  Stage, Layer, Rect, Line, Circle, Label, Tag, Text,
} from 'react-konva';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import getCurrentDoc, { getCurrentDocId } from '../../client/client';
import AddShape from '../tool_bar/tools/add_shape';
import ToolBar from '../tool_bar/tool_bar';
import AddImage from '../tool_bar/tools/add_images';
import AddText from '../tool_bar/tools/add_text';
import DeleteAll from '../tool_bar/tools/delete_all';
import BaseShape from '../shapes/baseshape';
import SelectColor from '../tool_bar/tools/select_color';
import AddTip from '../tool_bar/tools/add_tip';
import Lock from '../tool_bar/tools/lock';
import {
  useStateStore, useDispatchStore, StateContext, DispatchContext,
} from '../../store/store';
import DelEle from '../tool_bar/tools/del_ele';
import ZIndex from '../tool_bar/tools/zIndex';
import FontSize from '../tool_bar/tools/font_size';
import useCopyer from '../../hook/copyer';
import FreeDrawing, { useDrawing } from '../tool_bar/tools/free_drawing';
import Point from '../tool_bar/tools/point';
import handleLayerClick from './handle_layer_click';
import { calcX, calcY } from '../../utils/calc_zoom_position';
import CursorShape from './cursor_shape';
import './painting_content.scss';
import globalConfig from '../shapes/global_config';
import Cancel, { useCancel } from '../tool_bar/tools/cancel';
import AddKanBan from '../tool_bar/tools/add_kanban';
import AddItem from '../tool_bar/tools/add_kanbanItem';
import addKanBan from '../../utils/add_kanban';
import Pointer from '../shapes/pointer';
import useUserList from '../../hook/userList';
// import UserBar from '../user_bar/user_bar';
import useKanBan from '../../hook/kanban_event';
import AvatarArea from '../avatar/avatar_self';
import AvatarUser from '../avatar/avatar_user';
import CanvasName from './canvas_name';
import ItemStatus from '../tool_bar/tools/item_status';
import axios from '../../utils/axios';

const PaintingContent: React.FC<{}> = () => {
  const doc = getCurrentDoc();
  const [list, setList] = useState(doc?.value?.data?.shapes || []);
  const [userList] = useUserList(doc?.value?.data?.users || []);
  const state = useStateStore();
  const dispatch = useDispatchStore();
  // console.log(doc);
  state.beginTime = doc?.value?.data?.beginTime;
  state.endTime = doc?.value?.data?.endTime;
  // dispatch({ type: 'setBeginTime', payload: doc?.value?.data?.beginTime });
  // dispatch({ type: 'setEndTime', payload: doc?.value?.data?.endTime });
  // console.log(state);
  const [, setCopySelectItem] = useCopyer();
  useEffect(() => {
    dispatch({ type: 'setAdsorptionPointsList', payload: [] });
  }, [state.currentIndex]);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  useDrawing();
  useCancel();
  useKanBan();
  const checkDeselect = (e: any) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      dispatch({ type: 'setCurrentIndex', payload: -1 });
    }
  };
  const history = useHistory();
  const [kanban, setKanBan] = useState(history.location.state);
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
    if (state.selectShape !== 'FREE') {
      setCursorPos({ x: pos.x, y: pos.y });
    }
  };
  const getFloatBar = () => {
    if (doc.value.data.shapes === undefined) {
      return [];
    }
    const { type } = doc.value.data.shapes[state.currentIndex];
    if (type === 'KANBAN' && state.currentItem.selectProj !== undefined && state.currentItem.selectProj !== -1) {
      console.log(state.currentItem.selectProj);
      return [SelectColor, DelEle, ItemStatus];
    }
    const tools = [];
    if (type !== 'IMAGE' && type !== 'ARROW' && type !== 'LINE') {
      tools.push(SelectColor);
    }
    tools.push(ZIndex, Lock, DelEle);
    if (type === 'TEXT' || type === 'TEXTRECT' || type === 'POINTEDRECT') {
      tools.push(FontSize);
    }
    if (type === 'KANBAN') {
      tools.push(AddItem);
    }
    return tools;
  };
  useEffect(() => {
    doc.value.subscribe(() => {
      if (doc?.value?.data?.shapes) {
        setList([...doc.value.data.shapes]);
      }
    });
    doc.value.on('op', () => {
      if (doc?.value?.data?.shapes) {
        setList([...doc.value.data.shapes]);
      }
    });
  }, []);
  useEffect(() => {
    if (kanban !== undefined && doc.value.data !== undefined) {
      // @ts-ignore
      addKanBan(kanban.kanban);
      setKanBan(undefined);
    }
  });
  useEffect(() => {
    axios.post('/api/doc', {
      type: 'add_history',
      data: {
        microsoft_id: state.userInfo.microsoftId,
        canvas_id: getCurrentDocId(),
      },
    }).then((res) => {
      console.log(res);
      dispatch({
        type: 'setUserInfo',
        payload: {
          ...state.userInfo,
          recentCanvas: (res.data.data.new_list || []).map((val: any) => ({
            id: val.id,
            name: val.name,
            recentOpen: val.recent_open,
          })),
        },
      });
    });
  }, []);

  const boundFunc = (pos: any) => {
    const x = Math.min(0, Math.max(pos.x, window.innerWidth * 2 * (1 - state.stageScale)));
    const y = Math.min(0, Math.max(pos.y, window.innerHeight * 2 * (1 - state.stageScale)));
    return { x, y };
  };

  // const [stageScale, setstageScale] = React.useState(1);
  const handleWheel = (e: any) => {
    e.evt.preventDefault();
    const scaleBy = 0.92;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };

    let newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    newScale = Math.max(0.5, newScale);
    newScale = Math.min(4, newScale);

    const x = -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale;
    const y = -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale;
    const pos = boundFunc({ x, y });
    dispatch({ type: 'setStageScale', payload: newScale });
    dispatch({
      type: 'setStagePos',
      payload: pos,
    });
  };
  const handleDragMove = (e: any) => {
    if (state.currentIndex !== -1) {
      // Only if no shape is selected, can stage be dragged, Or else stage would be dragged together with the shape.
      return;
    }
    dispatch({
      type: 'setStagePos',
      payload: { x: e.target.x(), y: e.target.y() },
    });
  };
  const WIDTH = 50;// size for background rect
  const HEIGHT = 50;
  const beginX = WIDTH * 3;// size for background rect
  const beginY = HEIGHT * 3;
  // performance optimize
  const grid = useMemo(() => {
    const gridComponents: any = [];
    gridComponents.push(
      <Rect
        x={0}
        y={0}
        width={window.innerWidth * 2}
        height={window.innerHeight * 2}
        fill="#faf9f8"
      />,
    );
    for (let y = beginY; y < window.innerHeight * 2; y += HEIGHT) {
      gridComponents.push(
        <Rect
          x={beginX}
          y={y}
          width={window.innerWidth * 2}
          height={HEIGHT}
          fill="#faf9f8"
          stroke="lightGray"
          strokeWidth={0.5}
        />,
      );
    }
    return gridComponents;
  }, [window.innerWidth]);

  const timeTag = useMemo(
    () => {
      const components: any = [];
      if (state.beginTime !== '0' && state.beginTime !== undefined) {
        const a = moment(state.beginTime);
        const b = moment(state.endTime);
        b.add(1, 'month');
        for (let y = beginY; y < window.innerHeight * 2 && !a.isSame(b); y += 2 * HEIGHT, a.add(1, 'month')) {
          console.log('123');
          components.push(
            <Label x={WIDTH * 3} y={y} opacity={0.75}>
              <Tag
                fill="#969696"
                stroke="lightGray"
                strokeWidth={1}
                cornerRadius={3}
              />
              <Text
                text={a.format('YYYY-MM')}
                fontFamily="Arial"
                height={HEIGHT * 2}
                width={WIDTH * 2}
                align="center"
                verticalAlign="middle"
                fontSize={18}
                padding={5}
                fill="black"
              />
            </Label>
            ,
          );
        }
      }
      const date = new Date();
      const rate = moment(date.toLocaleDateString()).diff(moment(state.beginTime)) / 24 / 3600 / 1000 / 30;
      components.push(
        <Line points={[beginX + WIDTH * 2, beginY + rate * HEIGHT * 2, window.innerWidth * 2, beginY + rate * HEIGHT * 2]} stroke="#969696" strokeWidth={3} dash={[33, 10]} />,
      );
      return components;
    }, [state.beginTime, state.endTime],
  );

  // console.log(state);
  const handleClick = (e: any) => {
    if (state.selectShape !== 'ERASER' && state.selectShape !== 'PEN' && state.selectShape !== 'FREE') {
      const ops = state.OpList;
      ops.push(JSON.stringify(doc.value.data.shapes));
      dispatch({ type: 'setOpList', payload: ops });
      const x = calcX(e.evt.offsetX, state.stageScale, state.stagePos.x);
      const y = calcY(e.evt.offsetY, state.stageScale, state.stagePos.y);
      handleLayerClick(state.selectShape, WIDTH, HEIGHT, Math.floor(x / WIDTH) * WIDTH, Math.floor(y / HEIGHT) * HEIGHT);
      dispatch({ type: 'setSelectShape', payload: 'FREE' });
    }
  };

  return (
    <>
      {doc.value.data === undefined ? null : <CanvasName doc={doc} />}
      {state.isDragging || state.currentIndex === -1 ? null : <ToolBar list={getFloatBar()} BarType="float" />}
      <ToolBar list={[Point, AddShape, AddTip, AddImage, AddText, DeleteAll, FreeDrawing, Cancel, AddKanBan]} BarType="left" />
      <ToolBar list={[AvatarArea, AvatarUser]} BarType="avatar" />
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
          draggable={state.currentIndex === -1 && !state.isPainting}
          onMouseMove={mouseMove}
          onDragMove={handleDragMove}
          dragBoundFunc={boundFunc}
        >
          <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
              <Layer onClick={() => { dispatch({ type: 'setCurrentIndex', payload: -1 }); }}>
                {grid}
                {timeTag}
              </Layer>
              <Layer onClick={handleClick}>
                {
                  list.map((item: any, index: number) => (
                    <BaseShape
                      item={item}
                      index={index}
                      gridHeight={HEIGHT}
                      gridWidth={WIDTH}
                      click={() => {
                        if (state.selectShape === 'FREE') {
                          if (item.type === 'TEXT' || item.type === 'KANBAN') {
                            const afterE = {
                              ...item,
                              shift: { x: state.stagePos.x, y: state.stagePos.y, scale: state.stageScale },
                            };
                            doc.value.submitOp([{ p: ['shapes', index], ld: item, li: afterE }]);
                          }
                          dispatch({ type: 'setCurrentItem', payload: item });
                          dispatch({ type: 'setCurrentIndex', payload: index });
                          setCopySelectItem(item);
                        }
                      }}
                      del={() => {
                        if (state.selectShape === 'ERASER' && state.isPainting) {
                          doc.value.submitOp([{ p: ['shapes', index], ld: item }]);
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
                  strokeWidth={state.lastLine.size}
                  lineCap="round"
                  tension={0.5}
                />
                {state.selectShape !== 'FREE' && <CursorShape selectShape={state.selectShape} x={calcX(cursorPos.x, state.stageScale, state.stagePos.x)} y={calcY(cursorPos.y, state.stageScale, state.stagePos.y)} />}
                {
                  state.adsorptionPointsList.map((point) => (
                    <Circle
                      x={point.x}
                      y={point.y}
                      radius={globalConfig.auxiliaryPointSize / state.stageScale}
                      fill={globalConfig.auxiliaryPointColor}
                      stroke={(1 / state.stageScale).toString()}
                    />
                  ))
                }
                {
                  userList.map((item: BaseShapes.User) => (
                    item.microsoftId === state.userInfo.microsoftId ? null
                      : (
                        <>
                          <Pointer x={item.x} y={item.y} size={50} microsoftId={item.microsoftId} font={item.name} />
                        </>
                      )
                  ))
                }
              </Layer>

            </DispatchContext.Provider>
          </StateContext.Provider>
        </Stage>
      </div>
    </>
  );
};

export default PaintingContent;
