import doc from '../client/client';

function addImg(image: any) {
  doc.submitOp([{ p: ['shapes', doc.data.shapes.length], li: image }]);
}

export default addImg;
