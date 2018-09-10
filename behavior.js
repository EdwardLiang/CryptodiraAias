class BehaviorTree {

    constructor(r){
	this.root = r || new RandomSelectionNode();
	this.stack = []; 
	this.stack.push(null);
	this.currNode = this.root;
	this.lastNode = this.root;
    }

    next(){
	this.currNode = this.lastNode;
	if(this.lastNode !== root){
	    if(this.lastNode instanceof ExecuteBehaviorNode){
		var lastSuccess = this.stack.pop().success;
		this.currNode = this.stack.pop();
	    }
            else if(this.lastNode instanceof PredicateNode){
                this.lastNode.evalutePredicate();
                var lastSuccess = this.stack.pop().success;
                this.currNode = this.stack.pop();
            }
	    while(this.currNode instanceof BehaviorNodeWithChildren){
		if(this.currNode instanceof SequenceBehaviorNode){
		    if(lastSuccess == false){
			this.currNode = this.stack.pop();
		    }
		    else{
			this.currNode = selectNode(this.currNode);
			if(this.currNode){
			    stack.push(this.currNode);
			}
			break;
		    }
		}
		else if(this.currNode instanceof SelectionBehaviorNode){
		    if(lastSuccess == true){
			this.currNode = this.stack.pop();
		    }
		    else{
			this.currNode = selectNode(this.currNode);
			if(this.currNode){
			    stack.push(this.currNode);
			}
			break;
		    }
		}
	    }
	}
	while(this.currNode instanceof BehaviorNodeWithChildren){
	    this.currNode = selectNode(this.lastNode);      
            if(this.currNode instanceof RandomSequenceNode || this.currNode instanceof RandomSelectionNode){
                this.currNode.randomize();
            }
	    stack.push(this.currNode);
	}
	if(this.currNode == null){
	    //Hit the top of the tree and root has been popped
	    stack.push(root);
	    this.currNode = root;
	    this.lastNode = null;
	    next();
	}
        if(this.currNode instanceof FinishNode || this.currNode instanceof CancelNode){
            stack = [];
            stack.push(root);
	    this.currNode = root;
	    this.lastNode = root;
        }
	if(!(this.currNode instanceof ExecuteBehaviorNode)){
	    throw "Behavior selected is not executable!";
	}
	else{
	    this.lastNode = this.currNode;
	    this.currNode.execute();
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
    selectNode(lastNode){
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

    randomize(){
	shuffle(this.children); 
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
