  // GraphBuilder.ts
    
  // AddRectangleOperation.ts
  import { BuilderOperation } from './builder/operations/BuilderOperation';
  import { GraphBuilder } from './GraphBuilder';
  
  // AddCircleOperation.ts
  import { BuilderOperation } from './builder/operations/BuilderOperation';
  import { GraphBuilder } from './GraphBuilder';
  
  // Usage
  import { GraphBuilder } from './GraphBuilder';
  import { AddRectangleOperation } from './AddRectangleOperation';
  import { AddCircleOperation } from './AddCircleOperation';
  import { RepeatOperation } from './RepeatOperation';
  
  const builder = new GraphBuilder(0xff0000);
  
  builder
    .setStartPosition(0, 0, 0)
    .addOperation(new AddRectangleOperation(5, 3))
    .addOperation(new AddCircleOperation(3, 16))
    .addOperation(new RepeatOperation(10, 2))
    .executeOperations();
  
  const lines = builder.build();
  lines.forEach(line => scene.add(line));
  