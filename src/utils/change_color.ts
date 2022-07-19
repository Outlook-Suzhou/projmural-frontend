function changeColor(index: number, item: BaseShapes.Rectangle, doc: any) {
  console.log('changing color...');
  doc.value.submitOp([{ p: ['shapes', index], ld: doc.value.data.shapes[index], li: item }]);
}

export default changeColor;
