import getCurrentDoc from '../client/client';

const doc = getCurrentDoc();
function changeColor(index: number, item: BaseShapes.Rectangle) {
  console.log('changing color...');
  doc.value.submitOp([{ p: ['shapes', index], ld: doc.value.data.shapes[index], li: item }]);
}

export default changeColor;
