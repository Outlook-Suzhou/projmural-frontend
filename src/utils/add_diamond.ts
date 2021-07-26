import doc from '../client/client';

function addDiamond(diamond: any) {
  console.log(doc);
  doc.submitOp([{ p: ['shapes', doc.data.shapes.length], li: diamond }]);
}

export default addDiamond;
