class Player extends Creature{

    constructor(x, y, z){
        super(x, y, z, "&#50883;", "#ff0");
    }

    move(diff){
        return () => {
            let player = this;
            let level = Game.level;
            let display = Game.display;
            let newX = player.x + diff.x;
            let newY = player.y + diff.y;
            let newZ = player.z + diff.z;
            if(!level.checkMovable(newX, newY, newZ)) {return;}

            
            let newZTemp = newZ;
            let newYTemp = newY;
            let newXTemp = newX;
            let tX = player.x;
            let tY = player.y;
            let tZ = player.z;

            level.map[player.x][player.y][player.z].creature = null;

            player.x = newX;
            player.y = newY;
            player.z = newZ;

            level.map[player.x][player.y][player.z].creature = player;

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

            if (newZTemp > tZ){
                display.setLevelOpacity(newZ, "1");
            }

            if (newZTemp < tZ){
                display.setLevelOpacity(tZ, "0.1");
            }
        }

    }
}
