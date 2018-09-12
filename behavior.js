//TODO: More thoroughly test this.
class BehaviorTree {

    constructor(r){
	//this.root = r || new RandomSelectionNode();
        let r2 = new RepeatDecorator();
        let n = new RandomSelectionNode();
        r2.addChild(n); 
	this.root = r || r2;
	this.stack = []; 
	this.stack.push(null);
	this.currNode = this.root;
	this.lastNode = null;
        this.lastSuccess = true;
    }

    next(){
        if(this.lastNode instanceof ExecuteBehaviorNode){
            var a = this.stack.pop();
            this.lastSuccess = a.success;
            this.currNode = this.stack.pop();
        }
        while(this.currNode instanceof BehaviorNodeWithChildren || this.currNode instanceof Decorator){
            if(this.lastNode){
                this.lastSuccess = this.lastNode.success;
            }
            else{
                this.lastSuccess = true;
            }
            if(this.currNode instanceof Decorator){
                if(this.currNode instanceof InvertDecorator){
                    if(this.lastSuccess){
                        this.lastSuccess = false;
                    }
                    else{
                        this.lastSuccess = true;
                    }
                    this.lastNode = this.currNode;
                    this.lastNode.success = this.lastSuccess;
                    this.currNode = this.stack.pop();
                }

                if(this.currNode instanceof SucceedDecorator){
                    this.lastSuccess = true;
                    this.lastNode = this.currNode;
                    this.lastNode.success = this.lastSuccess;
                    this.currNode = this.stack.pop();
                }

                if(this.currNode instanceof RepeatUntilFailDecorator){
                    //this.lastNode = this.currNode;
                    if(this.lastSuccess){
                        this.stack.push(this.currNode);
                        this.currNode = this.currNode.child;  
                        this.stack.push(this.currNode);
                        return this.goDownTree();
                    }
                    else{
                        this.lastNode = this.currNode;
                        this.currNode = this.stack.pop();
                        //console.log(this.lastNode);
                        //console.log(this.currNode);
                    }
                }

                if(this.currNode instanceof RepeatDecorator){
                    this.stack.push(this.currNode);
                    //this.lastNode = this.currNode;
                    this.currNode = this.currNode.child;
                    this.stack.push(this.currNode);
                    return this.goDownTree();
                }
            }
            else if(this.currNode instanceof SequenceBehaviorNode){
                if(this.lastSuccess == false || this.currNode.selectNode(this.lastNode) === null){
                    this.lastNode = this.currNode;
                    this.currNode = this.stack.pop();
                    if(this.currNode instanceof RandomSequenceNode){
                        this.currNode.reset = true;
                    }
                    //this.lastNode = null;
                }
                else{
                    //this.stack.push(this.currNode);
                    //this.currNode = this.currNode.selectNode(this.lastNode);
                    if(this.currNode){
                        this.stack.push(this.currNode);
                    }
                    return this.goDownTree();
                }
            }
            else if(this.currNode instanceof SelectionBehaviorNode){
                if(this.lastSuccess == true || this.currNode.selectNode(this.lastNode) === null){
                    this.lastNode = this.currNode;
                    this.currNode = this.stack.pop();
                }
                else{
                    //this.currNode = this.currNode.selectNode(this.lastNode);
                    if(this.currNode){
                        stack.push(this.currNode);
                    }
                    return this.goDownTree();
                }
            }
        }

    }

    goDownTree(){
        while(this.currNode instanceof BehaviorNodeWithChildren || this.currNode instanceof Decorator){
            if(this.currNode instanceof BehaviorNodeWithChildren){
                if(this.currNode instanceof RandomSequenceNode || this.currNode instanceof RandomSelectionNode){
                    this.currNode.randomize();
                }
                this.currNode = this.currNode.selectNode(this.lastNode);      
                this.stack.push(this.currNode);
            }
            else{
                this.currNode = this.currNode.child;
                this.stack.push(this.currNode);
            }
        }
        if(this.currNode instanceof FinishNode || this.currNode instanceof CancelNode){
            //differentiate between the two? 
            this.stack = [];
            this.stack.push(null);
            this.stack.push(this.root);
            this.currNode = this.root;
            this.lastNode = null;
        }
        if(this.currNode instanceof PredicateNode){
            this.currNode.evaluatePredicate();
            let x = this.currNode;
            //var lastSuccess = this.stack.pop().success;
            this.lastNode = this.stack.pop();
            this.currNode = this.stack.pop();
            if(this.currNode instanceof BehaviorNodeWithChildren && !x.success){
                //lastNode has to be set for decorators but not BehaviorNodesWithChildren
                this.lastNode = null;
            }
            return this.next();
        }

        if(!(this.currNode instanceof ExecuteBehaviorNode)){
            //console.log(this.currNode);
            throw "Behavior selected is not executable!";
        }
        else{
            this.lastNode = this.currNode;
            return this.currNode.execute();
        }
    }
}


class BehaviorNode {
    constructor(){
        this.success = false;
    }
}


class BehaviorNodeWithChildren extends BehaviorNode{

    constructor(){
        super();
        this.children = [];
    }
    addChild(c){
        this.children.push(c);
    } 
    selectNode(lastNode){
        if(!this.children.includes(lastNode)){
            return this.children[0];
        }
        if(this.children.length == 0){
            throw "Empty Behavior Node With Children!";
        }
        let indx = 0;
        let node = this.children[indx];
        while(node !== lastNode){
            indx++;
            node = this.children[indx]; 
        }
        if(indx + 1 >= this.children.length){
            this.success = true;
            return null;
        }
        else{
            return this.children[indx + 1];
        }
    }

}

class ExecuteBehaviorNode extends BehaviorNode{

    execute(){
    }
}

class SequenceBehaviorNode extends BehaviorNodeWithChildren{}    

class SelectionBehaviorNode extends BehaviorNodeWithChildren{}

class RandomSequenceNode extends SequenceBehaviorNode{

    constructor(){
        this.reset = true;
    }

    randomize(){
        if(this.reset){
            this.children = shuffle(this.children); 
        }
    }
}

class RandomSelectionNode extends SelectionBehaviorNode{

    randomize(){
        this.children = shuffle(this.children); 
    }
}

class FailNode extends BehaviorNode{
}

class SucceedNode extends BehaviorNode{
    constructor(){
        super();
        this.success = true;
    }
}

class PredicateNode extends BehaviorNode{

    predicate(){
        return false;
    }

    evaluatePredicate(){
        if(this.predicate()){
            this.success = true;
        }
        else{
            this.success = false;
        }
    }
}

class FinishNode extends SucceedNode{}

class CancelNode extends FailNode{}

class Decorator extends BehaviorNode{

    addChild(node){
        this.child = node;
    }
}

class InvertDecorator extends Decorator{}

class SucceedDecorator extends Decorator{}

class RepeatDecorator extends Decorator{}

class RepeatUntilFailDecorator extends Decorator{}

//class SetVariableBehavior extends BehaviorNode{}

//class GetVariableBehavior extends BehaviorNode{}

//class IsNullBehavior extends BehaviorNode{}

//class PushBehavior extends BehaviorNode{}

//class PopBehavior extends BehaviorNode{}

//class IsEmptyBehavior extends BehaviorNode{}
//

//https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(array){
    let counter = array.length;

    while(counter > 0){
        let index = Math.floor(Math.random() * counter);

        counter --;

        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

class MoveBehavior extends ExecuteBehaviorNode{

    constructor(direction, creature){
        super();
        this.diff = direction;
        this.creature = creature;
    }

    execute(){
        return () => {
            this.success = true;
            let level = Game.level;
            let display = Game.display;
            let diff = this.diff;
            let newX = this.creature.x + diff.x;
            let newY = this.creature.y + diff.y;
            let newZ = this.creature.z + diff.z;

            if(!level.checkMovable(newX, newY, newZ)) {return;}

            level.map[this.creature.x][this.creature.y][this.creature.z].creatures =
                level.map[this.creature.x][this.creature.y][this.creature.z].creatures.filter(e => e !== this.creature);

            this.creature.x = newX;
            this.creature.y = newY;
            this.creature.z = newZ;
            level.map[this.creature.x][this.creature.y][this.creature.z].creatures.push(this.creature);
        }
    }
}

class DirectDirectionMoveBehavior extends ExecuteBehaviorNode{

    constructor(creature, target){
        super();
        this.creature = creature;
        this.target = target;
    }

    execute(){
        return () => {
            this.success = true;
            let level = Game.level;
            let display = Game.display;

            this.diff = directPath(this.creature, this.target);
            let diff = this.diff;
            let newX = this.creature.x + diff.x;
            let newY = this.creature.y + diff.y;
            let newZ = this.creature.z + diff.z;

            if(!level.checkMovable(newX, newY, newZ)) {return;}

            level.map[this.creature.x][this.creature.y][this.creature.z].creatures =
                level.map[this.creature.x][this.creature.y][this.creature.z].creatures.filter(e => e !== this.creature);

            this.creature.x = newX;
            this.creature.y = newY;
            this.creature.z = newZ;
            level.map[this.creature.x][this.creature.y][this.creature.z].creatures.push(this.creature);
        }
    }
}


class CreatureAct{
    addNodesAsChildren(node){
        node.addChild(this.behaviorTree.root);
    } 
}

class DirectMoveAct extends CreatureAct{

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

class RandomMoveAct extends CreatureAct{

    constructor(creature){
        super();
        let root = new RepeatDecorator();
        let n = new RandomSelectionNode();
        let mX = new MoveBehavior(new Distance(1, 0, 0), creature);
        let mX2 = new MoveBehavior(new Distance(-1, 0, 0), creature);
        let mY = new MoveBehavior(new Distance(0, 1, 0), creature);
        let mY2 = new MoveBehavior(new Distance(0, -1, 0), creature);
        n.addChild(mX);
        n.addChild(mX2);
        n.addChild(mY);
        n.addChild(mY2);
        root.addChild(n); 
        this.behaviorTree = new BehaviorTree(root);
    }
}



class RandomMoveUntilFailAct extends CreatureAct{

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

class RandomMoveCancel extends CreatureAct{

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


class MoveStraightAct extends CreatureAct{

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

class MoveBoxAct extends CreatureAct{

    constructor(creature){
        super();
        let root = new RepeatDecorator();
        let n = new SequenceBehaviorNode();

        let act1 = new MoveStraightAct(creature, new Distance(1,0,0)); 
        let act2 = new MoveStraightAct(creature, new Distance(0,1,0)); 
        let act3 = new MoveStraightAct(creature, new Distance(-1,0,0)); 
        let act4 = new MoveStraightAct(creature, new Distance(0,-1,0)); 
        act1.addNodesAsChildren(n);
        act2.addNodesAsChildren(n);
        act3.addNodesAsChildren(n);
        act4.addNodesAsChildren(n);
        root.addChild(n); 
        this.behaviorTree = new BehaviorTree(root);
    }
}

class MoveBoxActPredicate extends CreatureAct{

    constructor(creature){
        super();
        let root = new RepeatDecorator();
        let n = new SequenceBehaviorNode();

        let act1 = new MoveStraightAct(creature, new Distance(1,0,0)); 
        let p = new PredicateNode();
        let act2 = new MoveStraightAct(creature, new Distance(0,1,0)); 
        let act3 = new MoveStraightAct(creature, new Distance(-1,0,0)); 
        let act4 = new MoveStraightAct(creature, new Distance(0,-1,0)); 
        act1.addNodesAsChildren(n);
        act2.addNodesAsChildren(n);
        n.addChild(p);
        act3.addNodesAsChildren(n);
        act4.addNodesAsChildren(n);
        root.addChild(n); 
        this.behaviorTree = new BehaviorTree(root);
    }
}

class MoveBoxActPredicateInverse extends CreatureAct{

    constructor(creature){
        super();
        let root = new RepeatDecorator();
        let i = new InvertDecorator();
        let n = new SequenceBehaviorNode();

        let act1 = new MoveStraightAct(creature, new Distance(1,0,0)); 
        let p = new PredicateNode();
        let act2 = new MoveStraightAct(creature, new Distance(0,1,0)); 
        let act3 = new MoveStraightAct(creature, new Distance(-1,0,0)); 
        let act4 = new MoveStraightAct(creature, new Distance(0,-1,0)); 
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

class MoveBoxActPredicateSucceed extends CreatureAct{

    constructor(creature){
        super();
        let root = new RepeatDecorator();
        let i = new SucceedDecorator();
        let n = new SequenceBehaviorNode();

        let act1 = new MoveStraightAct(creature, new Distance(1,0,0)); 
        let p = new PredicateNode();
        let act2 = new MoveStraightAct(creature, new Distance(0,1,0)); 
        let act3 = new MoveStraightAct(creature, new Distance(-1,0,0)); 
        let act4 = new MoveStraightAct(creature, new Distance(0,-1,0)); 
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

