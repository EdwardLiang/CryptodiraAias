class Creature{

    constructor(x, y, z, icon, iconColor){
        this.x = x;
        this.y = y;
        this.z = z;
        this.items = {};
        this.icon = icon;
        this.iconColor = iconColor;
    }
    
    getStyle(e){}

    addItems(array){
        for(let i = 0; i < array.length; i++){
            if(availableSymbols.length > 0){
                var letter = availableSymbols[0];
                availableSymbols.shift();
            }
            else{
                break;
            }
            this.items[letter] = array[i];
        }
    }

    get key(){
        return this.x + "," + this.y;
    }

    draw(){
        Game.display.draw(this.x, this.y, icon, iconColor);
    }

    move(diff){
        return () => {
            let level = Game.level;
            let display = Game.display;
            let newX = this.x + diff.x;
            let newY = this.y + diff.y;
            let newZ = this.z + diff.z;
            if(!level.checkMovable(newX, newY, newZ)) {return;}

            level.map[this.creature.x][this.creature.y][this.creature.z].removeCreature(this.creature);
            
            this.x = newX;
            this.y = newY;
            this.z = newZ;
            level.map[this.x][this.y][this.z].creature = this;
        }
    }
    set action(a){
        this.act = a; 
        this.behaviorTree = this.act.behaviorTree;
    }
}


class Turtle extends Creature{

    constructor(x, y, z){
        super(x, y, z, "&#x1F422;", "green");
        this.act = new RandomMoveAct(this); 
        this.behaviorTree = this.act.behaviorTree;
    }

    move(diff){
        return this.behaviorTree.next();
    }

}

class Bird extends Creature{

    constructor(x, y, z, target){
        super(x, y, z, "&#x1F426;", "blue");
        this.act = new DirectMoveAct(this, target); 
        this.behaviorTree = this.act.behaviorTree;
    }

    move(diff){
        return this.behaviorTree.next();
    }

}


class Cat extends Creature{

    constructor(x, y, z){
        super(x, y, z, "&#x1F408;", "orange");
        //this.act = new MoveStraightAct(this, new Distance(1,0,0)); 
        this.act = new MoveBoxAct(this);
        this.behaviorTree = this.act.behaviorTree;
    }

    move(diff){
        return this.behaviorTree.next();
    }

}

class Dog extends Creature{

    constructor(x, y, z){
        super(x, y, z, "&#x1F415;", "white");
        //this.act = new MoveStraightAct(this, new Distance(1,0,0)); 
        this.act = new MoveBoxActPredicate(this);
        this.behaviorTree = this.act.behaviorTree;
    }

    move(diff){
        return this.behaviorTree.next();
    }

}

class Robot extends Creature{

    constructor(x, y, z){
        super(x, y, z, "&#x1F916;", "grey");
        //this.act = new MoveStraightAct(this, new Distance(1,0,0)); 
        this.act = new MoveBoxActPredicateInverse(this);
        this.behaviorTree = this.act.behaviorTree;
    }

    move(diff){
        return this.behaviorTree.next();
    }

}

