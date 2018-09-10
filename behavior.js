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
            var lastSuccess = this.stack.pop().success;
            this.currNode = this.stack.pop();
        }
        else if(this.lastNode instanceof PredicateNode){
            this.lastNode.evalutePredicate();
            var lastSuccess = this.stack.pop().success;
            this.currNode = this.stack.pop();
        }
        while(this.currNode instanceof BehaviorNodeWithChildren || this.currNode instanceof Decorator){
            console.log("next");
            if(this.currNode instanceof Decorator){
                if(this.currNode instanceof InvertDecorator){
                    if(lastSuccess){
                        lastSuccess = false;
                    }
                    else{
                        lastSuccess = true;
                    }
                }

                if(this.currNode instanceof SucceedDecorator){
                    lastSuccess = true;
                }

                if(this.currNode instanceof RepeatUntilFailDecorator){
                    if(!lastSuccess){
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
                if(lastSuccess == false){
                    this.currNode = this.stack.pop();
                    if(this.currNode instanceof RandomSequenceNode){
                        this.currNode.reset = true;
                    }
                    this.lastNode = null;
                }
                else{
                    this.currNode = this.currNode.selectNode(this.currNode);
                    if(this.currNode){
                        stack.push(this.currNode);
                    }
                    return this.goDownTree();
                    break;
                }
            }
            else if(this.currNode instanceof SelectionBehaviorNode){
                if(lastSuccess == true){
                    this.currNode = this.stack.pop();
                }
                else{
                    this.currNode = this.currNode.selectNode(this.currNode);
                    if(this.currNode){
                        stack.push(this.currNode);
                    }
                    return this.goDownTree();
                    break;
                }
            }
        }

    }

    goDownTree(){
        while(this.currNode instanceof BehaviorNodeWithChildren || this.currNode instanceof Decorator){
            console.log("go down tree");
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
            console.log("asdf");
            throw "Behavior selected is not executable!";
        }
        else{
            this.lastNode = this.currNode;
            console.log("return executing stuff");
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
        if(!lastNode){
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
        if(indx + 1 > this.children.length){
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
        console.log("shuffle");
        let index = Math.floor(Math.random() * counter);

        counter --;

        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}
