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

        let pickUp = function(){
            let player = PlayerEventListener.player;
            let level = PlayerEventListener.level;
            player.items.concat(level.map[player.x][player.y][player.z].items);
            level.map[player.x][player.y][player.z].clearItems();
            console.log(player.items);
        };
        let playerMove = function(){
            let player = PlayerEventListener.player;
            let level = PlayerEventListener.level;
            let display = PlayerEventListener.display;
            let newX = player.x + diff.x;
            let newY = player.y + diff.y;
            let newZ = player.z + diff.z;
            if(!level.checkMovable(newX, newY, newZ)) {return;}

            display.clear(player.x - display.view.xOffset, player.y - display.view.yOffset, player.z, player);
            //console.log(player.x);

            level.map[player.x][player.y][player.z].clear();
            display.clearBlock(player.x - display.view.xOffset, player.y - display.view.yOffset, player.z);
            display.setBlock(player.x - display.view.xOffset, player.y - display.view.yOffset, player.z, level.map[player.x][player.y][player.z]);

            display.draw(player.x - display.view.xOffset, player.y - display.view.yOffset, player.z);


            /*
               if(newZ + 1 < level.levels){
               if (level.map[newX][newY][newZ + 1] instanceof SolidBlock){
               display.setLevelOpacity(newZ + 1, "0.5");
               }
               }
               */

            let solidAbove = true;
            let prevSolidAbove = true;
            for(let i = newZ + 1; i < level.levels; i++){
                if(!(level.map[newX][newY][i] instanceof SolidBlock)){
                    solidAbove = false; 
                }
            }


            let newZTemp = newZ;
            let newYTemp = newY;
            let newXTemp = newX;



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
            let tX = player.x;
            let tY = player.y;
            let tZ = player.z;

            player.x = newX;
            player.y = newY;
            player.z = newZ;

            display.clear(tX - display.view.xOffset, tY - display.view.yOffset, tZ, player);
            level.map[player.x][player.y][player.z].setIcon("@", "yellow");

            let offsetChange = false;


            //viewwindow setting
            display.view.xOffset = player.x - Math.floor(display.width / 2);
            var restWidth = (display.width) - (player.x - display.view.xOffset); 
            if(player.x + restWidth >= level.width){
                display.view.xOffset = level.width - display.width;
            }
            if(display.view.xOffset < 0){
                display.view.xOffset = 0;
            }

            display.view.yOffset = player.y - Math.floor(display.height / 2);
            var restHeight = (display.height) - (player.y - display.view.yOffset); 

            if(player.y + restHeight >= level.height){
                display.view.yOffset = level.height - display.height;
            }

            if(display.view.yOffset < 0){
                display.view.yOffset = 0;
            }

            display.redraw(player);

            if(solidAbove){
                for(let i = newZTemp + 1; i < level.levels; i++){
                    display.setLevelOpacity(i, "0.5");
                }
            }
            else{
                for(let i = newZTemp + 1; i < level.levels; i++){
                    display.setLevelOpacity(i, "0.1");
                }
            }

            if (newZTemp > tZ){
                display.setLevelOpacity(newZ, "1");
            }

            if (newZTemp < tZ){
                display.setLevelOpacity(tZ, "0.1");
            }

            display.setBlock(player.x - display.view.xOffset, player.y - display.view.yOffset, player.z, level.map[player.x][player.y][player.z]);
            display.draw(player.x - display.view.xOffset, player.y - display.view.yOffset, player.z);

        };

        let code = e.keyCode;

        if(!(code in DIRS)){return;}

        let diff = DIRS[code];

        if(code == 190 && !e.shiftKey){
            return;
        }
        if(code == 188 && !e.shiftKey){
            this.engine.addEvent(pickUp);
            this.engine.timeStep();
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


        this.engine.addEvent(playerMove);
        this.engine.timeStep();

        //Game.display.draw(this._x, this._y, Game.map[this._x+","+this._y]);
        //Game._drawSquare(this._x, this._y);
    }
}
