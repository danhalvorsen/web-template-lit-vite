import { BuilderOperation } from './builder/operations/BuilderOperation';
import { GraphBuilder } from './GraphBuilder';


export class AddCircleOperation implements BuilderOperation {
    private radius: number;
    private segments: number;

    constructor(radius: number, segments: number) {
        this.radius = radius;
        this.segments = segments;
    }

    execute(builder: GraphBuilder): void {
        const angleStep = (Math.PI * 2) / this.segments;
        builder.addVertex();
        for (let i = 1; i <= this.segments; i++) {
            const x = Math.cos(i * angleStep) * this.radius;
            const y = Math.sin(i * angleStep) * this.radius;
            builder.withDirection(x, y, 0).addVertex();
        }
    }
}
