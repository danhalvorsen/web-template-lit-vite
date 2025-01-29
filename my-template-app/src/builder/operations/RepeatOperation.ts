import { BuilderOperation } from './BuilderOperation';
import { GraphBuilder } from './GraphBuilder';
  
 
export class RepeatOperation implements BuilderOperation {
    private count: number;
    private step: number;

    constructor(count: number, step: number) {
        this.count = count;
        this.step = step;
    }

    execute(builder: GraphBuilder): void {
        for (let i = 0; i < this.count; i++) {
            builder.withStep(this.step).addVertex();
        }
    }
}
