class MoveBehavior extends ExecuteBehaviorNode{

    constructor(direction, creature){
        super();
        this.diff = direction;
        this.creature = creature;
    }

    execute(){

        if(this.creature.defeated){
            return;
        }
        this.success = true;
        let level = Game.level;
        let display = Game.display;
        let diff = this.diff;
        let newX = this.creature.x + diff.x;
        let newY = this.creature.y + diff.y;
        let newZ = this.creature.z + diff.z;

        for(let x = 0; x < this.creature.width; x++){
            for(let y = 0; y < this.creature.height; y++){
                for(let z = 0; z < this.creature.zLevels; z++){
                    if(!level.checkMovable(newX + x, newY + y, newZ + z, this.creature)) {return;}
                }
            }
        }

        if(this.diff.x > 0){
            this.creature.scale = -1;
        }
        else if(this.diff.x < 0){
            this.creature.scale = 1;
        }

        this.creature.removeFromBlock();
        this.creature.moveToBlock(newX, newY, newZ);
    }
}

class DirectDirectionMoveBehavior extends ExecuteBehaviorNode{

    constructor(creature, target){
        super();
        this.creature = creature;
        this.target = target;
    }

    execute(){
        if(this.creature.defeated){
            return;
        }
        this.success = true;
        let level = Game.level;
        let display = Game.display;

        this.diff = directPath(this.creature, this.target);
        let diff = this.diff;
        let newX = this.creature.x + diff.x;
        let newY = this.creature.y + diff.y;
        let newZ = this.creature.z + diff.z;


        for(let x = 0; x < this.creature.width; x++){
            for(let y = 0; y < this.creature.height; y++){
                for(let z = 0; z < this.creature.zLevels; z++){
                    if(!level.checkMovable(newX + x, newY + y, newZ + z, this.creature)) {return;}
                }
            }
        }

        if(this.diff.x > 0){
            this.creature.scale = -1;
        }
        else if(this.diff.x < 0){
            this.creature.scale = 1;
        }

        this.creature.removeFromBlock();
        this.creature.moveToBlock(newX, newY, newZ);
        return ["The bird is seeking you"];
        //}
}
}



