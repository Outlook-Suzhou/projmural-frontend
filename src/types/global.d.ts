/* eslint-disable no-unused-vars */
namespace BaseShapes {
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
    rotation: number,
    text: string,
    fontSize: number,
    scaleX: number,
  }
  interface BaseLine extends Position, Lock {
    start: Position,
    end: Position,
    weight: number,
  }
  interface Line extends BaseLine {
    type: 'LINE',
  }
  interface CurveLine extends Position, Lock {
    fill: string,
    points: any,
    type: 'CURVELINE',
    composite: undefined,
  }
  interface Arrow extends BaseLine {
    arrowSize: number,
    type: 'ARROW',
  }
  type Shape = Rectangle | Circle | Triangle | Image | Ellipse | Diamond | Text | Line | Arrow | CurveLine;
}
