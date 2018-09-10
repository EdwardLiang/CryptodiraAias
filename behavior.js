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

            //console.log(this.lastNode);
            var a = this.stack.pop();
            //console.log(a);
            var lastSuccess = a.success;
            //console.log(lastSuccess);
            this.currNode = this.stack.pop();
            //console.log(this.currNode);
        }
        else if(this.lastNode instanceof PredicateNode){
            this.lastNode.evalutePredicate();
            //var lastSuccess = this.stack.pop().success;
            var lastSuccess = this.lastNode.success;
            this.currNode = this.stack.pop();
            return this.next();
        }
        while(this.currNode instanceof BehaviorNodeWithChildren || this.currNode instanceof Decorator){
            if(this.currNode instanceof Decorator){
                if(this.currNode instanceof InvertDecorator){
                    if(lastSuccess){
                        lastSuccess = false;
                    }
                    else{
                        lastSuccess = true;
                    }
                    this.lastNode = this.currNode;
                    this.currNode = this.stack.pop();
                }

                if(this.currNode instanceof SucceedDecorator){
                    lastSuccess = true;
                    this.lastNode = this.currNode;
                    this.currNode = this.stack.pop();
                }

                if(this.currNode instanceof RepeatUntilFailDecorator){
                    //this.lastNode = this.currNode;
                    if(lastSuccess){
                        this.stack.push(this.currNode);
                        this.currNode = this.currNode.child;  
                        this.stack.push(this.currNode);
                        return this.goDownTree();
                    }
                }

                if(this.currNode instanceof RepeatDecorator){
                    this.stack.push(this.currNode);
                    this.currNode = this.currNode.child;
                    this.stack.push(this.currNode);
                    return this.goDownTree();
                }
            }
            else if(this.currNode instanceof SequenceBehaviorNode){
                if(lastSuccess == false || this.currNode.selectNode(this.lastNode) === null){
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
                if(lastSuccess == true || this.currNode.selectNode(this.lastNode) === null){
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
            this.stack = [];
            this.stack.push(root);
            this.currNode = root;
            this.lastNode = null;
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


class BehaviorNodeWithChildren {

    constructor(){
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
        return true;
    }

    evaluatePredicate(){
        if(predicate()){
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

class CreatureAct{
    addNodesAsChildren(node){
        node.addChild(this.behaviorTree.root);
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

class MoveStraightAct extends CreatureAct{
    
    constructor(creature, distance){
        super();
        let root = new RepeatDecorator();
        let n = new SequenceBehaviorNode();
        let mX = new MoveBehavior(distance, creature);
        let mX2 = new MoveBehavior(distance, creature);
        let mY = new MoveBehavior(distance, creature);
        let mY2 = new MoveBehavior(distance, creature);
        n.addChild(mX);
        n.addChild(mX2);
        n.addChild(mY);
        n.addChild(mY2);
        root.addChild(n); 
        this.behaviorTree = new BehaviorTree(root);
    }
}

