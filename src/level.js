class Level {
    constructor(width, height, levels){
        this.map = [];
        this.creatures = [];
        this.width = width;
        this.height = height;
        this.levels = levels;
        this.backgroundColor = undefined;
        //this is some bad naming here.
        this.map = new Array(width);
        for (let i = 0; i < this.map.length; i++){
            this.map[i] = new Array(height);

            for(let j = 0; j < this.map[i].length; j++){
                this.map[i][j] = new Array(levels);

                for(let z = 0; z < this.map[i][j].length; z++){
                    this.map[i][j][z] = new MapBlock(i, j, z);
                }
            }
        }
    }
    setZLevelColor(level, color){
        this.backgroundColor = color;
    }

    //also checks for water types to only go onto other water blocks.
    checkMovable(x, y, z, c){
        //c for creature to check internal segments
        if( x > this.map.length - 1 || x < 0 || y > this.map[0].length - 1 || y < 0 ||
                z > this.map[0][0].length || z < 0){
            return false;
        }
        if(!this.checkWater(x, y, z) && c instanceof WaterCreature){
            return false;
        }
        if (this.map[x][y][z].checkMovable(c)){
            return true;
        }
        return false;
    }
    checkAttackable(x, y, z){
        if( x > this.map.length - 1 || x < 0 || y > this.map[0].length - 1 || y < 0 ||
                z > this.map[0][0].length || z < 0){
            return false;
        }
        if (this.map[x][y][z].checkAttackable()){
            return this.map[x][y][z].checkAttackable();
        }
        return false;
    }
    checkWater(x, y, z){
        if(this.map[x][y][z] instanceof WaterBlock){
            return true;
        }
        return false;
    }

    addCreature(creature){
        if(!this.map[creature.x][creature.y][creature.z].creature){
            if(!(creature === Game.player)){
                this.creatures.push(creature);
            }
            for(let x = 0; x < creature.width; x++){
                for(let y = 0; y < creature.height; y++){
                    for(let z = 0; z < creature.zLevels; z++){
                        this.map[creature.x + x][creature.y + y][creature.z + z].creature =
                            creature;
                        if(x == 0 && y == 0 && creature.scale == 1){
                            this.map[creature.x + x][creature.y + y][creature.z + z].creatureSegment = false;
                        }
                        else if(x == creature.width - 1 && y == 0 && creature.scale == -1){
                            this.map[creature.x + x][creature.y + y][creature.z + z].creatureSegment = false;
                        }

                        else{
                            this.map[creature.x + x][creature.y + y][creature.z + z].creatureSegment = true;
                        }
                    }
                }
            }

        }
        else{
            console.log("Warning! Creature overwritten!");
        }
    }

    canGoUp(x, y, z){
        if (this.map[x][y][z] instanceof StaircaseUpBlock){
            return true;
        }
        return false;
    }

    canGoDown(x, y, z){
        if (this.map[x][y][z] instanceof StaircaseDownBlock){
            return true;
        }
        return false;
    }

    creaturesAct(){
        for(let i = 0; i < this.creatures.length; i++){
            let dir = Math.floor(Math.random() * 8);
            let cDir = CDIRS[dir];
            Game.engine.addEvent(this.creatures[i].move(cDir));
        }
    }

    clearVisible(){
        let display = Game.display;
        for(let i = 0; i < display.squares.length; i++){
            for(let j = 0; j < display.squares[i].length; j++){
                for(let z = 0; z < display.squares[i][j].length; z++){
                    Game.level.map[i + display.view.xOffset][j + display.view.yOffset][z].clear();
                }
            }
        }
    }
}



