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
  }
  interface Ellipse extends Position, Lock {
    radius: Position,
    type: 'ELLIPSE',
  }
  interface Diamond extends Position, Lock {
    radius: Position,
    type: 'DIAMOND',
  }
  interface Triangle extends Position, Lock {
    points: number[6],
    type: 'TRIANGLE',
  }
  interface Image extends Position, Size, Lock {
    type: 'IMAGE',
    url: string,
    rotation: number,
  }
  interface Text extends Position, Size, Lock {
    type: 'TEXT',
    text: string,
    fontSize: number,
  }
  interface Line extends Position, Lock {
    start: Position,
    end: Position,
    weight: number,
    type: 'LINE',
  }
  type Shape = Rectangle | Circle | Triangle | Image | Ellipse | Diamond | Text | Line;
}
