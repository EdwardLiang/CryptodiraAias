class BehaviorTreeBuilder{
    addNodesAsChildren(node){
        node.addChild(this.behaviorTree.root);
    } 
}

class DirectMoveBuilder extends BehaviorTreeBuilder{

    constructor(creature, target){
        super();
        let root = new RepeatDecorator();
        let n = new RandomSelectionNode();
        let mY2 = new DirectDirectionMoveBehavior(creature, target);
        n.addChild(mY2);
        root.addChild(n); 
        this.behaviorTree = new BehaviorTree(root);
    }
}

class RandomMoveBuilder extends BehaviorTreeBuilder{

    constructor(creature){
        super();
        let root = new RepeatDecorator();
        let n = new RandomSelectionNode();
        let mX = new MoveBehavior(new Distance(1, 0, 0), creature);
        let mX2 = new MoveBehavior(new Distance(-1, 0, 0), creature);
        let mY = new MoveBehavior(new Distance(0, 1, 0), creature);
        let mY2 = new MoveBehavior(new Distance(0, -1, 0), creature);

        let mX3 = new MoveBehavior(new Distance(1, 1, 0), creature);
        let mX4 = new MoveBehavior(new Distance(-1, -1, 0), creature);
        let mY3 = new MoveBehavior(new Distance(1, -1, 0), creature);
        let mY4 = new MoveBehavior(new Distance(-1, 1, 0), creature);
        n.addChild(mX);
        n.addChild(mX2);
        n.addChild(mX3);
        n.addChild(mX4);
        n.addChild(mY);
        n.addChild(mY2);
        n.addChild(mY3);
        n.addChild(mY4);
        root.addChild(n); 
        this.behaviorTree = new BehaviorTree(root);
    }
}



class RandomMoveUntilFailBuilder extends BehaviorTreeBuilder{

    constructor(creature){
        super();
        let root = new RepeatDecorator();
        let r2 = new RepeatUntilFailDecorator();
        let n = new RandomSelectionNode();
        let mX = new MoveBehavior(new Distance(1, 0, 0), creature);
        let mX2 = new MoveBehavior(new Distance(-1, 0, 0), creature);
        let mY = new MoveBehavior(new Distance(0, 1, 0), creature);
        let mY2 = new MoveBehavior(new Distance(0, -1, 0), creature);
        n.addChild(mX);
        n.addChild(mX2);
        n.addChild(mY);
        n.addChild(mY2);
        n.addChild(new PredicateNode());
        r2.addChild(n); 
        root.addChild(r2);
        this.behaviorTree = new BehaviorTree(root);
    }
}

class RandomMoveCancelBuilder extends BehaviorTreeBuilder{

    constructor(creature){
        super();
        let root = new RepeatDecorator();
        let r2 = new RepeatUntilFailDecorator();
        let n = new RandomSelectionNode();
        let mX = new MoveBehavior(new Distance(1, 0, 0), creature);
        let mX2 = new MoveBehavior(new Distance(-1, 0, 0), creature);
        let mY = new MoveBehavior(new Distance(0, 1, 0), creature);
        let mY2 = new MoveBehavior(new Distance(0, -1, 0), creature);
        n.addChild(mX);
        n.addChild(mX2);
        n.addChild(mY);
        n.addChild(mY2);
        n.addChild(new CancelNode());
        r2.addChild(n); 
        root.addChild(r2);
        this.behaviorTree = new BehaviorTree(root);
    }
}


class MoveStraightBuilder extends BehaviorTreeBuilder{

    constructor(creature, distance){
        super();
        //let root = new RepeatDecorator();
        let n = new SequenceBehaviorNode();
        let mX = new MoveBehavior(distance, creature);
        let mX2 = new MoveBehavior(distance, creature);
        let mY = new MoveBehavior(distance, creature);
        let mY2 = new MoveBehavior(distance, creature);
        n.addChild(mX);
        n.addChild(mX2);
        n.addChild(mY);
        n.addChild(mY2);
        //root.addChild(n); 
        this.behaviorTree = new BehaviorTree(n);
    }
}

class MoveBoxBuilder extends BehaviorTreeBuilder{

    constructor(creature){
        super();
        let root = new RepeatDecorator();
        let n = new SequenceBehaviorNode();

        let act1 = new MoveStraightBuilder(creature, new Distance(1,0,0)); 
        let act2 = new MoveStraightBuilder(creature, new Distance(0,1,0)); 
        let act3 = new MoveStraightBuilder(creature, new Distance(-1,0,0)); 
        let act4 = new MoveStraightBuilder(creature, new Distance(0,-1,0)); 
        act1.addNodesAsChildren(n);
        act2.addNodesAsChildren(n);
        act3.addNodesAsChildren(n);
        act4.addNodesAsChildren(n);
        root.addChild(n); 
        this.behaviorTree = new BehaviorTree(root);
    }
}

class MoveBoxPredicateBuilder extends BehaviorTreeBuilder{

    constructor(creature){
        super();
        let root = new RepeatDecorator();
        let n = new SequenceBehaviorNode();

        let act1 = new MoveStraightBuilder(creature, new Distance(1,0,0)); 
        let act2 = new MoveStraightBuilder(creature, new Distance(0,1,0)); 
        let act3 = new MoveStraightBuilder(creature, new Distance(-1,0,0)); 
        let act4 = new MoveStraightBuilder(creature, new Distance(0,-1,0)); 
        let p = new PredicateNode();
        act1.addNodesAsChildren(n);
        act2.addNodesAsChildren(n);
        n.addChild(p);
        act3.addNodesAsChildren(n);
        act4.addNodesAsChildren(n);
        root.addChild(n); 
        this.behaviorTree = new BehaviorTree(root);
    }
}

class MoveBoxPredicateInverseBuilder extends BehaviorTreeBuilder{

    constructor(creature){
        super();
        let root = new RepeatDecorator();
        let i = new InvertDecorator();
        let n = new SequenceBehaviorNode();

        let act1 = new MoveStraightBuilder(creature, new Distance(1,0,0)); 
        let act2 = new MoveStraightBuilder(creature, new Distance(0,1,0)); 
        let act3 = new MoveStraightBuilder(creature, new Distance(-1,0,0)); 
        let act4 = new MoveStraightBuilder(creature, new Distance(0,-1,0)); 
        let p = new PredicateNode();
        act1.addNodesAsChildren(n);
        act2.addNodesAsChildren(n);
        i.addChild(p);
        n.addChild(i);
        act3.addNodesAsChildren(n);
        act4.addNodesAsChildren(n);
        root.addChild(n); 
        this.behaviorTree = new BehaviorTree(root);
    }
}

class MoveBoxPredicateSucceedBuilder extends BehaviorTreeBuilder{

    constructor(creature){
        super();
        let root = new RepeatDecorator();
        let i = new SucceedDecorator();
        let n = new SequenceBehaviorNode();

        let act1 = new MoveStraightBuilder(creature, new Distance(1,0,0)); 
        let act2 = new MoveStraightBuilder(creature, new Distance(0,1,0)); 
        let act3 = new MoveStraightBuilder(creature, new Distance(-1,0,0)); 
        let act4 = new MoveStraightBuilder(creature, new Distance(0,-1,0)); 
        let p = new PredicateNode();
        act1.addNodesAsChildren(n);
        act2.addNodesAsChildren(n);
        i.addChild(p);
        n.addChild(i);
        act3.addNodesAsChildren(n);
        act4.addNodesAsChildren(n);
        root.addChild(n); 
        this.behaviorTree = new BehaviorTree(root);
    }
}

