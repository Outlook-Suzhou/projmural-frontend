/* eslint-disable no-unused-vars */
declare namespace BaseShapes {
  interface Position {
    x: number;
    y: number;
  }
  interface Size {
    width: number;
    height: number;
  }
  interface Rectangle extends Position {
    width: number,
    height: number,
    type: 'RECTANGLE'
    rotation: number
  }
  interface Circle extends Position {
    radius: number,
    type: 'CIRCLE'
  }
  interface Ellipse extends Position {
    radius: Position,
    type: 'ELLIPSE'
  }
  interface Diamond extends Position {
    radius: Position,
    type: 'DIAMOND'
  }
  interface Triangle extends Position {
    points: number[6];
    type: 'TRIANGLE';
  }
  interface Image extends Position, Size {
    url: string;
    type: 'IMAGE';
  }
  interface Line extends Position {
    weight: number;
    start: Position;
    end: Position;
    type: 'LINE';
  }
  interface Text extends Position, Size {
    text: string;
    fontSize: number;
    type: 'TEXT';
  }
  type Object = Rectangle | Circle | Ellipse | Diamond | Triangle | Image | Line | Text
}
