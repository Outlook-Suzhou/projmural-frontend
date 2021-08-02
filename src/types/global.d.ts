/* eslint-disable no-unused-vars */
declare namespace BaseShapes {
  interface Position {
    x: number,
    y: number,
  }
  interface Rectangle extends Position {
    width: number,
    height: number,
    type: 'RECTANGLE',
    rotation: number,
    fill: string
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
  interface Image extends Position {
    width: number,
    height: number,
    type: 'IMAGE',
    url: string,
    rotation: number,
  }
  interface Text extends Position {
    type: 'TEXT',
    text: string,
    fontSize: number
  }
}
