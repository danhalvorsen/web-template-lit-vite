import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import * as THREE from 'three';

@customElement('canvas-container')
export class CanvasContainer extends LitElement {
  @property({ type: Array }) shapes: {
    name: string;
    points: { x: number; y: number }[];
    transform?: THREE.Matrix4;
  }[] = [
    // Default shape (a simple triangle)
    {
      name: 'Default Triangle',
      points: [
        { x: -1, y: -1 },
        { x: 1, y: -1 },
        { x: 0, y: 1 },
      ],
    },
  ];

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
    }
    canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
  `;

  firstUpdated() {
    const canvas = this.renderRoot.querySelector('canvas') as HTMLCanvasElement;

    // Initialize Three.js scene, camera, and renderer
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.offsetWidth / this.offsetHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.renderer.setSize(this.offsetWidth, this.offsetHeight);

    this.draw();
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('shapes')) {
      this.draw();
    }
  }

  private clearScene() {
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }
  }

  private drawShape(points: { x: number; y: number }[], transform?: THREE.Matrix4) {
    if (points.length < 2) return;

    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    points.forEach(({ x, y }) => vertices.push(x, y, 0));

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
    const mesh = new THREE.LineSegments(edges, material);

    if (transform) {
      const matrix = new THREE.Matrix4();
      matrix.copy(transform);
      mesh.applyMatrix4(matrix);
    }

    this.scene.add(mesh);
  }

  private draw() {
    this.clearScene();

    this.shapes.forEach((shape) => {
      const transform = shape.transform || new THREE.Matrix4();
      this.drawShape(shape.points, transform);
    });

    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return html`<canvas></canvas><div><slot></slot></div>`;
  }
}
