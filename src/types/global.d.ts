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
  interface Tag {
    text: string,
    x: number,
  }
  interface Color{
    fill: string,
    opacity: number,
  }
  interface Proj {
    text: string,
    x: number,
    y: number,
    width: number,
    height: number,
    visible: boolean,
    color: string,
    status: string,
    tags: Array<Tag>,
  }
  interface Rectangle extends Position, Size, Lock, Color {
    type: 'RECTANGLE',
    rotation: number,
  }
  interface PointedRect extends Position, Size, Lock, Color{
    type: 'POINTEDRECT',
    rotation: number,
    text: string,
    fontSize: number,
  }
  interface Circle extends Position, Lock, Color {
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
  interface Diamond extends Position, Lock, Color {
    radius: Position,
    type: 'DIAMOND',
    rotation: number,
  }
  interface Triangle extends Position, Lock, Color {
    radius: Position,
    type: 'TRIANGLE',
    rotation: number,
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
    shift: any,
  }
  interface TextRect extends Position, Size, Lock, Color {
    type: 'TEXTRECT',
    rotation: number,
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
  interface CurveLine extends Position, Lock {
    fill: string,
    points: Array,
    type: 'CURVELINE',
    size: number,
  }
  interface Arrow extends BaseLine {
    arrowSize: number,
    type: 'ARROW',
  }
  interface Kanban extends Position, Lock {
    teamNum: number,
    dateNum: number,
    days: Array<string>,
    unit: string,
    type: 'KANBAN',
    teams: Array<any>,
    shift: any,
    projs: Array<Proj>
    selectProj: number,
  }
  interface User extends Position{
    name: string,
    microsoftId: string,
    mail: string
  }
  interface Star extends Position, Lock, Color{
    type: 'STAR',
    innerRadius: number,
    outerRadius: number,
    rotation: number,
  }
  interface Message extends Position, Size, Lock {
    fill: string;
    type: 'MESSAGE',
    rotation: number,
    text: string,
    fontSize: number,
  }
  type Shape = Rectangle | PointedRect | Circle | Triangle | Image | Ellipse | Diamond | Text | Line | Arrow | CurveLine | TextRect | Star | Message | Kanban;
}
