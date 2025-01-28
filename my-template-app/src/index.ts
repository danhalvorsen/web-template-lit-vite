import * as THREE from 'three';
import { CanvasContainer } from './components/canvas-container';

const shapes = [
  {
    name: 'Triangle',
    points: [
      { x: 0, y: 0 },
      { x: 2, y: 1 },
      { x: 1, y: 3 },
    ],
  },
  {
    name: 'Square',
    points: [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 2 },
      { x: 0, y: 2 },
    ],
    transform: new THREE.Matrix4().makeTranslation(5, 0, 0),
  },
];

const container = document.createElement('canvas-container') as CanvasContainer;
container.shapes = shapes;
document.body.appendChild(container);
