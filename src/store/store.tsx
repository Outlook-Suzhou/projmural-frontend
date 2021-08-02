/* eslint-disable prefer-destructuring */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useContext } from 'react';

const Context = createContext([{}, () => {}]);

function useStore() {
  return useContext(Context);
}

function StoreProvider(props: any) {
  // eslint-disable-next-line prefer-destructuring
  // eslint-disable-next-line react/destructuring-assignment
  const children = props.children;
  const [state, setState] = useState({
    testItem: {},
  });

  return (
    <Context.Provider value={[state, setState]}>
      { children }
    </Context.Provider>
  );
}

export { useStore, StoreProvider };
