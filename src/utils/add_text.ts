import doc from '../client/client';

function addText(text: any) {
  console.log(doc);
  doc.submitOp([{ p: ['shapes', doc.data.shapes.length], li: text }]);
}

export default addText;
