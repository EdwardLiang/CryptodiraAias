DIRS = {};
DIRS[72] = new Distance(-1, 0, 0);
DIRS[74] = new Distance(0, 1, 0);
DIRS[75] = new Distance(0, -1, 0);
DIRS[76] = new Distance(1, 0, 0);
DIRS[188] = new Distance(0, 0, 1);
DIRS[190] = new Distance(0, 0, -1);

let PlayerEventListener = {

    player: null,
    level: null,
    engine: null,
    display: null,

    handleEvent(e){
        let code = e.keyCode;

        if(!(code in DIRS)){return;}

        let diff = DIRS[code];

        if((code == 188 || code == 190) && !e.shiftKey){
            return;
        }
        if(code == 188 && e.shiftKey){
            if(!this.level.canGoUp(this.player.x, this.player.y, this.player.z)){
                return;
            }
        }
        if(code == 190 && e.shiftKey){
            if(!this.level.canGoDown(this.player.x, this.player.y, this.player.z)){
                return;
            }
        }
        let playerMove = function(){
            let player = PlayerEventListener.player;
            let level = PlayerEventListener.level;
            let display = PlayerEventListener.display;
            let newX = player.x + diff.x;
            let newY = player.y + diff.y;
            let newZ = player.z + diff.z;
            if(!level.checkMovable(newX, newY, newZ)) {return;}

            display.clear(player.x, player.y, player.z);

            level.map[player.x][player.y][player.z].clear();
            display.clearBlock(player.x, player.y, player.z);
            display.setBlock(player.x, player.y, player.z, level.map[player.x][player.y][player.z]);

            display.draw(player.x, player.y, player.z);

           
            /*
            if(newZ + 1 < level.levels){
                if (level.map[newX][newY][newZ + 1] instanceof SolidBlock){
                    display.setLevelOpacity(newZ + 1, "0.5");
                }
            }
            */
            
            let solidAbove = true;
            for(let i = newZ + 1; i < level.levels; i++){
                if(!(level.map[newX][newY][i] instanceof SolidBlock)){
                    solidAbove = false; 
                }
            }

            if(solidAbove){
                for(let i = newZ + 1; i < level.levels; i++){
                    display.setLevelOpacity(i, "0.5");
                }
            }
            else{
                for(let i = newZ + 1; i < level.levels; i++){
                    display.setLevelOpacity(i, "0.1");
                }
            }

            if (newZ > player.z){
                display.setLevelOpacity(newZ, "1");
            }

            if (newZ < player.z){
                display.setLevelOpacity(player.z, "0.1");
            }


            /*
               if (level.map[newX][newY][newZ + 1] instanceof SolidBlock &&
               newZ + 2 < level.levels
               && level.map[newX][newY][newZ + 2] instanceof SolidBlock){
               display.setLevelOpacity(newZ + 2, "0.5");
               }

               if (newZ + 1 < level.levels && !(level.map[newX][newY][newZ + 1] instanceof SolidBlock)){
               display.setLevelOpacity(newZ + 1, "0.1");
               }
               if(newZ + 2 < level.levels){
               if (!(level.map[newX][newY][newZ + 1] instanceof SolidBlock) 
               || !(level.map[newX][newY][newZ + 2] instanceof SolidBlock)){
               display.setLevelOpacity(newZ + 2, "0.1");
               }
               }
               */

            player.x = newX;
            player.y = newY;
            player.z = newZ;

            display.clear(player.x, player.y, player.z);
            level.map[player.x][player.y][player.z].setIcon("@", "yellow");
            display.setBlock(player.x, player.y, player.z, level.map[player.x][player.y][player.z]);
            display.draw(player.x, player.y, player.z);
        }

        this.engine.addEvent(playerMove);
        this.engine.timeStep();

        //Game.display.draw(this._x, this._y, Game.map[this._x+","+this._y]);
        //Game._drawSquare(this._x, this._y);
    }
}
