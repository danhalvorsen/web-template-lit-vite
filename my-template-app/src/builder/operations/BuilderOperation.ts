import { GraphBuilder } from './GraphBuilder';

// BuilderOperation.ts
export interface BuilderOperation {
    execute(builder: GraphBuilder): void;
}
