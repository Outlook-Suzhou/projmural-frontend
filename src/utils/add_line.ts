import doc from '../client/client';

function addLine(line: any) {
  doc.submitOp([{ p: ['shapes', doc.data.shapes.length], li: line }]);
}

export default addLine;
