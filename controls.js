DIRS = {};
DIRS[72] = new Distance(-1, 0, 0);
DIRS[74] = new Distance(0, 1, 0);
DIRS[75] = new Distance(0, -1, 0);
DIRS[76] = new Distance(1, 0, 0);
DIRS[188] = new Distance(0, 0, 1);
DIRS[190] = new Distance(0, 0, -1);

var PlayerEventListener = {

    player: null,
    level: null,
    engine: null,
    display: null,

    handleEvent: function(e){
        var code = e.keyCode;

        if(!(code in DIRS)){return;}

        var diff = DIRS[code];

        if((code == 188 || code == 190) && !e.shiftKey){
            return;
        }
        if(code == 188 && e.shiftKey){
            if(!this.level.canGoUp(this.player.getX(), this.player.getY(), this.player.getZ())){
                return;
            }
        }
        if(code == 190 && e.shiftKey){
            if(!this.level.canGoDown(this.player.getX(), this.player.getY(), this.player.getZ())){
                return;
            }
        }
        var playerMove = function(){
            var player = PlayerEventListener.player;
            var level = PlayerEventListener.level;
            var display = PlayerEventListener.display;
            var newX = player.getX() + diff.getX();
            var newY = player.getY() + diff.getY();
            var newZ = player.getZ() + diff.getZ();
            if(!level.checkMovable(newX, newY, newZ)) {return;}

            display.clear(player.getX(), player.getY(), player.getZ());
            level.map[player.getX()][player.getY()][player.getZ()].clear();
            display.clearBlock(player.getX(), player.getY(), player.getZ());
            display.setBlock(player.getX(), player.getY(), player.getZ(), level.map[player.getX()][player.getY()][player.getZ()]);

            display.draw(player.getX(), player.getY(), player.getZ());

            if (newZ > player.getZ()){
                display.setLevelOpacity(newZ, "1");
            }

            if (newZ < player.getZ()){
                display.setLevelOpacity(player.getZ(), "0.1");
            }

            if(newZ + 1 < level.getLevels()){
                if (level.map[newX][newY][newZ + 1] instanceof SolidBlock){
                    display.setLevelOpacity(newZ + 1, "0.5");
                }
            }
            if (level.map[newX][newY][newZ + 1] instanceof SolidBlock &&
                    newZ + 2 < level.getLevels()
                    && level.map[newX][newY][newZ + 2] instanceof SolidBlock){
                display.setLevelOpacity(newZ + 2, "0.5");
            }

            if (newZ + 1 < level.getLevels() && !(level.map[newX][newY][newZ + 1] instanceof SolidBlock)){
                display.setLevelOpacity(newZ + 1, "0.1");
            }
            if(newZ + 2 < level.getLevels()){
                if (!(level.map[newX][newY][newZ + 1] instanceof SolidBlock) 
                        || !(level.map[newX][newY][newZ + 2] instanceof SolidBlock)){
                    display.setLevelOpacity(newZ + 2, "0.1");
                }
            }

            player.setX(newX);
            player.setY(newY);
            player.setZ(newZ);

            display.clear(player.getX(), player.getY(), player.getZ());
            level.map[player.getX()][player.getY()][player.getZ()].setIcon("@", "yellow");
            display.setBlock(player.getX(), player.getY(), player.getZ(), level.map[player.getX()][player.getY()][player.getZ()]);
            display.draw(player.getX(), player.getY(), player.getZ());
        }

        this.engine.addEvent(playerMove);
        this.engine.timeStep();

        //Game.display.draw(this._x, this._y, Game.map[this._x+","+this._y]);
        //Game._drawSquare(this._x, this._y);
    }
}
