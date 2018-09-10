class Creature{

    constructor(x, y, z, icon, iconColor){
        this.x = x;
        this.y = y;
        this.z = z;
        this.items = {};
        this.icon = icon;
        this.iconColor = iconColor;
    }

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

            level.map[this.x][this.y][this.z].creatures =
                level.map[this.x][this.y][this.z].creatures.filter(e => e !== this);
            
            this.x = newX;
            this.y = newY;
            this.z = newZ;
            level.map[this.x][this.y][this.z].creatures.push(this);
        }

    }
}


class Turtle extends Creature{

    constructor(x, y, z){
        super(x, y, z, "t", "green");
        this.behaviorTree = this.generateBT();
    }

    generateBT(){
        let root = new RepeatDecorator();
        let n = new RandomSelectionNode();
        let mX = new MoveBehavior(new Distance(1, 0, 0), this);
        let mX2 = new MoveBehavior(new Distance(-1, 0, 0), this);
        let mY = new MoveBehavior(new Distance(0, 1, 0), this);
        let mY2 = new MoveBehavior(new Distance(0, -1, 0), this);
        n.addChild(mX);
        n.addChild(mX2);
        n.addChild(mY);
        n.addChild(mY2);
        root.addChild(n); 
        return new BehaviorTree(root);
    }

    move(diff){
        return this.behaviorTree.next();
    }

    act(){
        
    }
}

class MoveBehavior extends ExecuteBehaviorNode{

    constructor(direction, creature){
        super();
        this.diff = direction;
        this.creature = creature;
    }

    execute(){
        return () => {
            console.log("executing move...");
            this.success = true;
            let level = Game.level;
            let display = Game.display;
            let diff = this.diff;
            let newX = this.creature.x + diff.x;
            let newY = this.creature.y + diff.y;
            let newZ = this.creature.z + diff.z;
            console.log(this);
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

