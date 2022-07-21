function deleteAll(doc: any) {
  doc.value.submitOp([{ p: ['shapes'], od: doc.value.data.shapes, oi: [] }]);
}

export const deleteCurrentItem = (globalState: any, dispatch: Function) => {
  if (globalState.currentIndex === -1) {
    console.log('No shape Selected!');
    return;
  }

  const ops = [...globalState.OpList];
  ops.push(JSON.stringify(globalState.currentDoc.value.data.shapes));
  dispatch({ type: 'setOpList', payload: ops });
  if (globalState.currentDoc.value.data.shapes[globalState.currentIndex].type === 'KANBAN' && globalState.currentItem.selectProj !== -1) {
    const { projs } = globalState.currentItem;
    projs.splice(globalState.currentItem.selectProj, 1);
    globalState.currentDoc.value.submitOp(
      [{
        p: ['shapes', globalState.currentIndex],
        ld: globalState.currentDoc.value.data.shapes[globalState.currentIndex],
        li: { ...globalState.currentItem, projs, selectProj: -1 },
      }],
    );
    dispatch({ type: 'setCurrentIndex', payload: -1 });
    dispatch({ type: 'setCurrentItem', payload: { ...globalState.currentItem, projs, selectProj: -1 } });
  } else {
    dispatch({ type: 'setCurrentIndex', payload: -1 });
    globalState.currentDoc.value.submitOp([{ p: ['shapes', globalState.currentIndex], ld: globalState.currentItem }]);
  }
};
export default deleteAll;
