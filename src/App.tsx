import React from 'react';
import Painting from './pages/painting/painting';

const App: React.FC<{}> = () => {
  const a = 1;
  return (
    <div>
      {a}
      <Painting />
    </div>
  );
};

export default App;
