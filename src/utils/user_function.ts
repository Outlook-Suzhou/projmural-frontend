import getCurrentDoc from '../client/client';

const doc = getCurrentDoc();

function addUser(user: BaseShapes.User) {
  doc.value.submitOp([{ p: ['users', doc.value.data.users.length], li: user }]);
}
function editUser(user: BaseShapes.User, index: number) {
  doc.value.submitOp([{ p: ['users', index], ld: doc.value.data.users[index], li: user }]);
}
function removeUser(user: BaseShapes.User) {
  doc.value.data.users.forEach((item: BaseShapes.User, index: number) => {
    if (item.microsoftId === user.microsoftId) {
      doc.value.submitOp([{ p: ['users', index], ld: item }]);
    }
  });
}
export { addUser, removeUser, editUser };
