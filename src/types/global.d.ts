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
  interface Rectangle extends Position, Size {
    type: 'RECTANGLE',
    rotation: number,
    fill: string,
  }
  interface Circle extends Position {
    radius: number,
    type: 'CIRCLE',
  }
  interface Ellipse extends Position {
    radius: Position,
    type: 'ELLIPSE',
  }
  interface Diamond extends Position {
    radius: Position,
    type: 'DIAMOND',
  }
  interface Triangle extends Position {
    points: number[6],
    type: 'TRIANGLE',
  }
  interface Image extends Position, Size {
    type: 'IMAGE',
    url: string,
    rotation: number,
  }
  interface Text extends Position, Size {
    type: 'TEXT',
    text: string,
    fontSize: number,
  }
  interface Line extends Position {
    start: Position,
    end: Position,
    weight: number,
    type: 'LINE',
  }
  type Shape = Rectangle | Circle | Triangle | Image | Ellipse | Diamond | Text | Line;
}
