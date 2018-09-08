class Player extends Creature{
    constructor(x, y, z){
        super(x, y, z, "@", "#ff0");
    }
   /* 
    act(){
        Game.engine.lock();
        window.addEventListener("keydown", eventListener);
    }*/


    move(diff){
        return () => {
            let player = this;
            let level = Game.level;
            let display = Game.display;
            let newX = player.x + diff.x;
            let newY = player.y + diff.y;
            let newZ = player.z + diff.z;
            if(!level.checkMovable(newX, newY, newZ)) {return;}

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
            let tX = player.x;
            let tY = player.y;
            let tZ = player.z;

            level.map[player.x][player.y][player.z].player = false;;

            player.x = newX;
            player.y = newY;
            player.z = newZ;

            level.map[player.x][player.y][player.z].player = true;

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

            //display.redraw();
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
        }

    }
}

/*
move(diff){
    return () => {
        let player = this;
        let level = Game.level;
        let display = Game.display;
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
        let tX = player.x;
        let tY = player.y;
        let tZ = player.z;

        player.x = newX;
        player.y = newY;
        player.z = newZ;

        display.clear(tX - display.view.xOffset, tY - display.view.yOffset, tZ, player);
        level.map[player.x][player.y][player.z].setIcon(this.icon, this.iconColor);

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

        display.redraw();

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
    }

}

};

*/

