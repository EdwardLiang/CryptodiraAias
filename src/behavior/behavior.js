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
        //return () => {
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


        for(let x = 0; x < this.creature.width; x++){
            for(let y = 0; y < this.creature.height; y++){
                for(let z = 0; z < this.creature.zLevels; z++){
                    level.map[this.creature.x + x][this.creature.y + y][this.creature.z + z]
                        .removeCreature(this.creature);
                    level.map[this.creature.x + x][this.creature.y + y][this.creature.z + z].creatureSegment = false;
                }
            }
        }

        //level.map[this.creature.x][this.creature.y][this.creature.z].removeCreature(this.creature);
        this.creature.x = newX;
        this.creature.y = newY;
        this.creature.z = newZ;
        for(let x = 0; x < this.creature.width; x++){
            for(let y = 0; y < this.creature.height; y++){
                for(let z = 0; z < this.creature.zLevels; z++){
                    level.map[this.creature.x + x][this.creature.y + y][this.creature.z + z].creature =
                        this.creature;
                    if(x == 0 && y == 0 && this.creature.scale == 1){
                        level.map[this.creature.x + x][this.creature.y + y][this.creature.z + z].creatureSegment = false;
                    }
                    else if(x == this.creature.width - 1 && y == 0 && this.creature.scale == -1){
                        level.map[this.creature.x + x][this.creature.y + y][this.creature.z + z].creatureSegment = false;
                    }
                    else{
                        level.map[this.creature.x + x][this.creature.y + y][this.creature.z + z].creatureSegment = true;
                    }
                }
            }
        }
        /*for(let x = 0; x < this.creature.width; x++){
          for(let y = 0; y < this.creature.height; y++){
          for(let z = 0; z < this.creature.zLevels; z++){
          console.log(level.map[this.creature.x + x][this.creature.y + y][this.creature.z + z].creatureSegment);
          }
          }
          }*/


        //level.map[this.creature.x][this.creature.y][this.creature.z].creature = this.creature;
        //}
    }
}

class DirectDirectionMoveBehavior extends ExecuteBehaviorNode{

    constructor(creature, target){
        super();
        this.creature = creature;
        this.target = target;
    }

    execute(){
        //return () => {
        //
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


        for(let x = 0; x < this.creature.width; x++){
            for(let y = 0; y < this.creature.height; y++){
                for(let z = 0; z < this.creature.zLevels; z++){
                    level.map[this.creature.x + x][this.creature.y + y][this.creature.z + z]
                        .removeCreature(this.creature);
                    level.map[this.creature.x + x][this.creature.y + y][this.creature.z + z].creatureSegment = false;
                }
            }
        }

        //level.map[this.creature.x][this.creature.y][this.creature.z].removeCreature(this.creature);
        this.creature.x = newX;
        this.creature.y = newY;
        this.creature.z = newZ;
        for(let x = 0; x < this.creature.width; x++){
            for(let y = 0; y < this.creature.height; y++){
                for(let z = 0; z < this.creature.zLevels; z++){
                    level.map[this.creature.x + x][this.creature.y + y][this.creature.z + z].creature =
                        this.creature;
                    if(x == 0 && y == 0 && this.creature.scale == 1){
                        level.map[this.creature.x + x][this.creature.y + y][this.creature.z + z].creatureSegment = false;
                    }
                    else if(x == this.creature.width - 1 && y == 0 && this.creature.scale == -1){
                        level.map[this.creature.x + x][this.creature.y + y][this.creature.z + z].creatureSegment = false;
                    }
                    else{
                        level.map[this.creature.x + x][this.creature.y + y][this.creature.z + z].creatureSegment = true;
                    }
                }
            }
        }        
        return ["The bird is seeking you"];
        //}
    }
}



