DIRS = {};
DIRS[72] = new Distance(-1, 0);
DIRS[74] = new Distance(0, 1);
DIRS[75] = new Distance(0, -1);
DIRS[76] = new Distance(1, 0);

var PlayerEventListener = {

    player: null,
    level: null,
    engine: null,
    display: null,

    handleEvent: function(e){
        var code = e.keyCode;

        if(!(code in DIRS)){return;}

        var diff = DIRS[code];

        var playerMove = function(){
            var player = PlayerEventListener.player;
            var level = PlayerEventListener.level;
            var display = PlayerEventListener.display;
            var newX = player.getX() + diff.getX();
            var newY = player.getY() + diff.getY();
            var newKey = newX + "," + newY;
            if(!level.checkMovable(newX, newY, player.getZ())) {return;}

            display.clear(player.getX(), player.getY(), player.getZ());
            level.map[player.getX()][player.getY()][player.getZ()].clear();
            display.clearBlock(player.getX(), player.getY(), player.getZ());
            display.setBlock(player.getX(), player.getY(), player.getZ(), level.map[player.getX()][player.getY()][player.getZ()]);

            display.draw(player.getX(), player.getY(), player.getZ());

            player.setX(newX);
            player.setY(newY);

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
