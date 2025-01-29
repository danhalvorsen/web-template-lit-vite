import { BuilderOperation } from './builder/operations/BuilderOperation';
import { GraphBuilder } from './GraphBuilder';


export class AddRectangleOperation implements BuilderOperation {
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    execute(builder: GraphBuilder): void {
        builder
            .addVertex()
            .withDirection(1, 0, 0).withStep(this.width).addVertex()
            .withDirection(0, 1, 0).withStep(this.height).addVertex()
            .withDirection(-1, 0, 0).withStep(this.width).addVertex()
            .withDirection(0, -1, 0).withStep(this.height).addVertex();
    }
}
