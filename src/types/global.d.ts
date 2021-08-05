/* eslint-disable no-unused-vars */
declare namespace BaseShapes {
  interface Position {
    x: number,
    y: number,
  }
  interface Size {
    width: number,
    height: number,
  }
  interface Lock {
    draggable: boolean
  }
  interface Rectangle extends Position, Size, Lock {
    type: 'RECTANGLE',
    rotation: number,
    fill: string,
  }
  interface Circle extends Position, Lock {
    radius: number,
    type: 'CIRCLE',
    rotation: number,
    fill: string,
  }
  interface Ellipse extends Position, Lock {
    radius: Position,
    type: 'ELLIPSE',
    rotation: number,
    fill: string,
  }
  interface Diamond extends Position, Lock {
    radius: Position,
    type: 'DIAMOND',
    rotation: number,
    fill: string,
  }
  interface Triangle extends Position, Lock {
    radius: Position,
    type: 'TRIANGLE',
    rotation: number,
    fill: string,
  }
  interface Image extends Position, Size, Lock {
    type: 'IMAGE',
    url: string,
    rotation: number,
  }
  interface Text extends Position, Size, Lock {
    fill: string;
    type: 'TEXT',
    text: string,
    fontSize: number,
  }
  interface BaseLine extends Position, Lock {
    start: Position,
    end: Position,
    weight: number,
  }
  interface Line extends BaseLine {
    type: 'LINE',
  }
  interface Arrow extends BaseLine {
    arrowSize: number,
    type: 'ARROW',
  }
  type Shape = Rectangle | Circle | Triangle | Image | Ellipse | Diamond | Text | Line | Arrow;
}

declare namespace Vector{
  interface vector {
    x: number,
    y: number,
  }
  const size = (a: vector): number => (
    Math.sqrt(a.x * a.x + a.y * a.y)
  );
  const add = (a: vector, b: vector): vector => ({
    x: a.x + b.x,
    y: a.x + b.x,
  });
  const sub = (a: vector, b: vector): vector => ({
    x: a.x - b.x,
    y: a.y - b.y,
  });
  const mulV = (a: vector, b: vector): number => (
    a.x * b.x + a.y * b.y
  );
  const mulN = (a: vector, b: number): vector => ({
    x: a.x * b,
    y: a.y * b,
  });
  const init = (a: vector): vector => {
    const len: number = Math.sqrt(a.x * a.x + a.y * a.y);
    return {
      x: a.x / len,
      y: a.y / len,
    };
  };
}
