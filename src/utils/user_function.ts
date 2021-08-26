import getCurrentDoc from '../client/client';

const doc = getCurrentDoc();

function addUser(user: BaseShapes.User) {
  console.log(doc);
  doc.submitOp([{ p: ['users', doc.data.users.length], li: user }]);
}
function editUser(user: BaseShapes.User, index: number) {
  doc.submitOp([{ p: ['users', index], ld: doc.data.users[index], li: user }]);
}
function removeUser(user: BaseShapes.User) {
  doc.data.users.forEach((item: BaseShapes.User, index: number) => {
    if (item.microsoftId === user.microsoftId) {
      doc.submitOp([{ p: ['users', index], ld: item }]);
    }
  });
}
export { addUser, removeUser, editUser };
