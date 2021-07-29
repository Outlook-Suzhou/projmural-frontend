import doc from '../client/client';

function changeColor(index: number, item: BaseShapes.Rectangle) {
  console.log('changing color...');
  doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: item }]);
}

export default changeColor;