export interface DiagramElement {
  id: number;
  type: 'square' | 'circle' | 'image' |'diamond' |'star' |'triangle';
  x: number;
  y: number;
}
