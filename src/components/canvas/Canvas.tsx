import { CanvasProps } from 'react-three-fiber';

export let Canvas = (props: CanvasProps) => null;

if (typeof window !== 'undefined') {
  Canvas = require('react-three-fiber').Canvas;
}
