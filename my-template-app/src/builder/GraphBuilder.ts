import { Vector3, LineBasicMaterial, Line, BufferGeometry } from 'three';
import { BuilderOperation } from './BuilderOperation';


export class GraphBuilder {
    private vertices: Vector3[] = [];
    private edges: [number, number][] = [];
    private material: LineBasicMaterial;
    private currentDirection: Vector3 = new Vector3(1, 0, 0);
    private currentStep: number = 1;
    private currentPosition: Vector3 = new Vector3(0, 0, 0);
    private operations: BuilderOperation[] = [];

    constructor(materialColor: number = 0xffffff) {
        this.material = new LineBasicMaterial({ color: materialColor });
    }

    setStartPosition(x: number, y: number, z: number): this {
        this.currentPosition.set(x, y, z);
        return this;
    }

    withDirection(x: number, y: number, z: number): this {
        this.currentDirection.set(x, y, z).normalize();
        return this;
    }

    withStep(step: number): this {
        this.currentStep = step;
        return this;
    }

    addVertex(): this {
        const nextPosition = this.currentPosition.clone().add(
            this.currentDirection.clone().multiplyScalar(this.currentStep)
        );
        this.vertices.push(this.currentPosition.clone());
        if (this.vertices.length > 1) {
            this.edges.push([this.vertices.length - 2, this.vertices.length - 1]);
        }
        this.currentPosition.copy(nextPosition);
        return this;
    }

    stepAndAddVertex(step: number): this {
        return this.withStep(step).addVertex();
    }

    repeat(n: number): this {
        for (let i = 0; i < n; i++) {
            this.addVertex();
        }
        return this;
    }

    addOperation(operation: BuilderOperation): this {
        this.operations.push(operation);
        return this;
    }

    executeOperations(): this {
        this.operations.forEach(operation => operation.execute(this));
        return this;
    }

    build(): Line[] {
        return this.edges.map(([startIndex, endIndex]) => {
            const geometry = new BufferGeometry().setFromPoints([
                this.vertices[startIndex],
                this.vertices[endIndex],
            ]);
            return new Line(geometry, this.material);
        });
    }
}
